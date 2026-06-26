jest.mock("../../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

import {
  loginUser,
  signupUser,
  logoutUser,
  fetchCurrentUser,
  selectIsLoggedIn,
} from "./userSlice";
import { makeStore, mockFetchResponse } from "../../test-utils";

const TEST_USER = {
  id: "user-1",
  username: "testuser",
  email: "test@playstack.com",
};

describe("userSlice auth thunks (login and signup)", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  describe("loginUser", () => {
    test("Valid credentials send the correct request and populate user state", async () => {
      global.fetch = jest.fn(() => mockFetchResponse(TEST_USER)) as jest.Mock;
      const store = makeStore();

      await store.dispatch(
        loginUser({ email: "test@playstack.com", password: "Password123!" }),
      );

      const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toBe("https://mocked.api.url/auth/login");
      expect(init.method).toBe("POST");
      expect(init.credentials).toBe("include");
      expect(JSON.parse(init.body)).toEqual({
        email: "test@playstack.com",
        password: "Password123!",
      });

      expect(store.getState().user.user).toEqual(TEST_USER);
      expect(store.getState().user.loading).toBe(false);
      expect(selectIsLoggedIn(store.getState())).toBe(true);
    });

    test("A login failure response leaves user state unpopulated", async () => {
      global.fetch = jest.fn(() =>
        mockFetchResponse({ message: "Invalid credentials" }, { ok: false, status: 401 }),
      ) as jest.Mock;
      const store = makeStore();

      const result = await store.dispatch(
        loginUser({ email: "nobody@playstack.com", password: "wrong" }),
      );

      expect(loginUser.rejected.match(result)).toBe(true);
      // The thunk extracts data.message and passes it via rejectWithValue
      expect(result.payload).toBe("Invalid credentials");
      expect(store.getState().user.user).toBeNull();
      expect(selectIsLoggedIn(store.getState())).toBe(false);
    });
  });

  describe("signupUser", () => {
    test("Valid details send the correct request and populate user state", async () => {
      global.fetch = jest.fn(() =>
        mockFetchResponse(TEST_USER, { ok: true, status: 201 }),
      ) as jest.Mock;
      const store = makeStore();

      await store.dispatch(
        signupUser({
          username: "testuser",
          email: "test@playstack.com",
          password: "Password123!",
        }),
      );

      const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
      expect(url).toBe("https://mocked.api.url/auth/signup");
      expect(init.method).toBe("POST");
      expect(init.credentials).toBe("include");
      expect(JSON.parse(init.body)).toEqual({
        username: "testuser",
        email: "test@playstack.com",
        password: "Password123!",
      });

      expect(store.getState().user.user).toEqual(TEST_USER);
      expect(selectIsLoggedIn(store.getState())).toBe(true);
    });

    test("A signup failure response leaves user state unpopulated", async () => {
      global.fetch = jest.fn(() =>
        mockFetchResponse(
          {
            error: {
              fields: [
                { field: "email", message: "Account with this email already exists" },
              ],
            },
          },
          { ok: false, status: 409 },
        ),
      ) as jest.Mock;
      const store = makeStore();

      const result = await store.dispatch(
        signupUser({
          username: "testuser",
          email: "taken@playstack.com",
          password: "Password123!",
        }),
      );

      expect(signupUser.rejected.match(result)).toBe(true);
      // Signup extracts the fields array (a different shape from login's string)
      expect(result.payload).toEqual([
        { field: "email", message: "Account with this email already exists" },
      ]);
      expect(store.getState().user.user).toBeNull();
      expect(selectIsLoggedIn(store.getState())).toBe(false);
    });
  });
});

describe("logoutUser thunk", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test("a successful logout sends the correct request and wipes user state", async () => {
    global.fetch = jest.fn(() => mockFetchResponse({ status: "ok" })) as jest.Mock;
    const store = makeStore({
      user: { user: TEST_USER, loading: false, error: null },
    });

    await store.dispatch(logoutUser());

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://mocked.api.url/auth/logout");
    expect(init.method).toBe("POST");
    expect(store.getState().user.user).toBeNull();
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  test("a failed logout (network error) leaves user state intact", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network down")),
    ) as jest.Mock;
    const store = makeStore({
      user: { user: TEST_USER, loading: false, error: null },
    });

    await store.dispatch(logoutUser());

    expect(store.getState().user.user).toEqual(TEST_USER);
    expect(selectIsLoggedIn(store.getState())).toBe(true);
  });
});

describe("fetchCurrentUser thunk", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test("an expired session via /auth/me returns no user, so clears user state", async () => {
    global.fetch = jest.fn(() => mockFetchResponse({ user: null })) as jest.Mock;
    const store = makeStore({
      user: { user: TEST_USER, loading: false, error: null },
    });

    await store.dispatch(fetchCurrentUser());

    expect(store.getState().user.user).toBeNull();
    expect(selectIsLoggedIn(store.getState())).toBe(false);
  });

  test("a live session via /auth/me returns a user, so populates user state", async () => {
    global.fetch = jest.fn(() =>
      mockFetchResponse({ user: TEST_USER }),
    ) as jest.Mock;
    const store = makeStore();

    await store.dispatch(fetchCurrentUser());

    expect(store.getState().user.user).toEqual(TEST_USER);
    expect(selectIsLoggedIn(store.getState())).toBe(true);
  });
});

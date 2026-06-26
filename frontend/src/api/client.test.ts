jest.mock("../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

import { apiFetch, registerApiStore } from "./client";
import { userLoggedOut } from "../store/slices/userSlice";
import { makeStore, mockFetchResponse } from "../test-utils";

const TEST_USER = {
  id: "user-1",
  username: "testuser",
  email: "test@playstack.com",
};

// Register a fresh store with the api client and spy on its dispatch.
function setup(loggedIn: boolean) {
  const store = makeStore(
    loggedIn
      ? { user: { user: TEST_USER, loading: false, error: null } }
      : undefined,
  );
  registerApiStore(store);
  const dispatchSpy = jest.spyOn(store, "dispatch");
  return { store, dispatchSpy };
}

const loggedOutAction = expect.objectContaining({ type: userLoggedOut.type });

describe("apiFetch auth reconciliation", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  // 3.1.1 — server says unauthorised (401) while client believes it is logged in
  test("logged in + a 401 response dispatches userLoggedOut", async () => {
    const { dispatchSpy } = setup(true);
    global.fetch = jest.fn(() => mockFetchResponse({}, { ok: false, status: 401 }));

    await apiFetch("/games/123");

    expect(dispatchSpy).toHaveBeenCalledWith(loggedOutAction);
  });

  // 3.1.2 — public route returns 200 but the X-Authenticated header says false
  test("logged in + X-Authenticated:false dispatches userLoggedOut", async () => {
    const { dispatchSpy } = setup(true);
    global.fetch = jest.fn(() =>
      mockFetchResponse(
        {},
        { ok: true, status: 200, headers: { "X-Authenticated": "false" } },
      ),
    );

    await apiFetch("/games/123");

    expect(dispatchSpy).toHaveBeenCalledWith(loggedOutAction);
  });

  // 3.1.3 — server agrees the client is logged in: no teardown
  test("logged in + ok + X-Authenticated:true does not tear down", async () => {
    const { dispatchSpy } = setup(true);
    global.fetch = jest.fn(() =>
      mockFetchResponse(
        {},
        { ok: true, status: 200, headers: { "X-Authenticated": "true" } },
      ),
    );

    await apiFetch("/games/123");

    expect(dispatchSpy).not.toHaveBeenCalledWith(loggedOutAction);
  });

  // 3.1.4 — client is not logged in, so a 401 must NOT trigger teardown (the guard)
  test("logged out client + a 401 response does not tear down", async () => {
    const { dispatchSpy } = setup(false);
    global.fetch = jest.fn(() => mockFetchResponse({}, { ok: false, status: 401 }));

    await apiFetch("/games/123");

    expect(dispatchSpy).not.toHaveBeenCalledWith(loggedOutAction);
  });
});

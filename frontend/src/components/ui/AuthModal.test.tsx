jest.mock("../../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AuthModal from "./AuthModal";
import { renderWithProviders, mockFetchResponse } from "../../test-utils";

function renderModal() {
  return renderWithProviders(<AuthModal open onClose={jest.fn()} />);
}

describe("AuthModal", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test("Login: blank email and password show required errors and send no request", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn();
    renderModal();

    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("Login: email shows the format error and sends no request", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn();
    renderModal();

    await user.type(screen.getByLabelText("Email"), "notanemail");
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(
      screen.getByText("Please enter a valid email address"),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("Signup: blank fields show all three required errors and send no request", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn();
    renderModal();

    await user.click(screen.getByRole("tab", { name: "Sign up" }));
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("Signup: email shows the format error and sends no request", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn();
    renderModal();

    await user.click(screen.getByRole("tab", { name: "Sign up" }));
    await user.type(screen.getByLabelText("Username"), "testuser");
    await user.type(screen.getByLabelText("Email"), "notanemail");
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(
      screen.getByText("Please enter a valid email address"),
    ).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("Signup: a server conflict shows both field error messages on the modal", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn(() =>
      mockFetchResponse(
        {
          error: {
            fields: [
              { field: "username", message: "Username taken, please use another" },
              { field: "email", message: "Account with this email already exists" },
            ],
          },
        },
        { ok: false, status: 409 },
      ),
    ) as jest.Mock;
    renderModal();

    await user.click(screen.getByRole("tab", { name: "Sign up" }));
    await user.type(screen.getByLabelText("Username"), "takenuser");
    await user.type(screen.getByLabelText("Email"), "taken@playstack.com");
    await user.type(screen.getByLabelText("Password"), "Password123!");
    await user.click(screen.getByRole("button", { name: "Create account" }));

    expect(
      await screen.findByText("Username taken, please use another"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Account with this email already exists"),
    ).toBeInTheDocument();
  });

  test("Login: invalid credentials shows the server error on the modal", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn(() =>
      mockFetchResponse({ message: "Invalid credentials" }, { ok: false, status: 401 }),
    ) as jest.Mock;
    renderModal();

    await user.type(screen.getByLabelText("Email"), "nobody@playstack.com");
    await user.type(screen.getByLabelText("Password"), "wrongpassword");
    await user.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });
});

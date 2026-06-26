jest.mock("../../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Header from "./Header";
import { renderWithProviders } from "../../test-utils";

const TEST_USER = {
  id: "user-1",
  username: "testuser",
  email: "test@playstack.com",
};

const loggedInState = {
  user: { user: TEST_USER, loading: false, error: null },
};

describe("Header", () => {
  test("logged out: shows the Login option and no username", () => {
    renderWithProviders(<Header />);

    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.queryByText(TEST_USER.username)).not.toBeInTheDocument();
  });

  test("logged in: shows the username", () => {
    renderWithProviders(<Header />, { preloadedState: loggedInState });

    expect(screen.getByText(TEST_USER.username)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Login" }),
    ).not.toBeInTheDocument();
  });

  test("logged in: account menu contains a Logout item", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />, { preloadedState: loggedInState });

    await user.click(screen.getByRole("button", { name: TEST_USER.username }));

    expect(
      screen.getByRole("menuitem", { name: "Logout" }),
    ).toBeInTheDocument();
  });
});

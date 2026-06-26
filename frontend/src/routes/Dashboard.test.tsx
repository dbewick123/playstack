jest.mock("../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import RequireAuth from "../components/utilities/RequireAuth";
import { renderWithProviders } from "../test-utils";

const TEST_USER = {
  id: "user-1",
  username: "testuser",
  email: "test@playstack.com",
};

function renderDashboardRoute() {
  return renderWithProviders(
    <Routes>
      <Route path="/home" element={<div>Home page</div>} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
    </Routes>,
    {
      route: "/dashboard",
      preloadedState: { user: { user: TEST_USER, loading: false, error: null } },
    },
  );
}

describe("Dashboard sign-out", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  test("a failed logout keeps the user on the dashboard (not redirected)", async () => {
    const user = userEvent.setup();
    global.fetch = jest.fn(() => Promise.reject(new Error("Network down")));
    renderDashboardRoute();

    expect(
      screen.getByRole("heading", { name: /Welcome/ }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Sign out" }));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(
      screen.getByRole("heading", { name: /Welcome/ }),
    ).toBeInTheDocument();
    expect(screen.queryByText("Home page")).not.toBeInTheDocument();
  });
});

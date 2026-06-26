jest.mock("../../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";

import RequireAuth from "./RequireAuth";
import { renderWithProviders } from "../../test-utils";

const TEST_USER = {
  id: "user-1",
  username: "testuser",
  email: "test@playstack.com",
};

function renderGuardAt(preloadedUser: {
  user: typeof TEST_USER | null;
  loading: boolean;
  error: string | null;
}) {
  return renderWithProviders(
    <Routes>
      <Route path="/home" element={<div>Home page</div>} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <div>Protected dashboard</div>
          </RequireAuth>
        }
      />
    </Routes>,
    { route: "/dashboard", preloadedState: { user: preloadedUser } },
  );
}

describe("RequireAuth", () => {
  test("redirects to /home when not logged in", () => {
    renderGuardAt({ user: null, loading: false, error: null });
    expect(screen.getByText("Home page")).toBeInTheDocument();
    expect(screen.queryByText("Protected dashboard")).not.toBeInTheDocument();
  });

  test("renders the protected content when logged in", () => {
    renderGuardAt({ user: TEST_USER, loading: false, error: null });
    expect(screen.getByText("Protected dashboard")).toBeInTheDocument();
    expect(screen.queryByText("Home page")).not.toBeInTheDocument();
  });
});

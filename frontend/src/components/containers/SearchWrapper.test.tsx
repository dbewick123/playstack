import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import SearchWrapper from "./SearchWrapper";

// Mock VITE env variable
jest.mock("../../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

// Mock useDispatch and useNavigate
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
}));

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

afterEach(() => {
  jest.clearAllMocks();
});

test("Tests user interaction with search bar, inc relocation to home page", async () => {
  render(
    <MemoryRouter initialEntries={["/not-home"]}>
      <SearchWrapper />
    </MemoryRouter>
  );

  const user = userEvent.setup();
  const searchBar = screen.getByRole("textbox", { name: /^userSearch$/ });

  await user.click(searchBar);
  await user.keyboard("Test Search");
  await user.keyboard("{Enter}");

  expect(searchBar).toHaveValue("Test Search");
  expect(mockNavigate).toHaveBeenCalledWith("/home");
});

test("Tests search bar remains on home page if activated from there", async () => {
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <SearchWrapper />
    </MemoryRouter>
  );

  const user = userEvent.setup();
  const searchBar = screen.getByRole("textbox", { name: /^userSearch$/ });

  await user.click(searchBar);
  await user.keyboard("Test Search");
  await user.keyboard("{Enter}");

  expect(mockNavigate).not.toHaveBeenCalled();
});

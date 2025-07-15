import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import useElementOnScreen from "../../../hooks/useElementOnScreen";

import AnimatedCounter from "./AnimatedCounter";

beforeAll(() => {
  const mockIntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
    takeRecords: jest.fn(),
  }));

  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: mockIntersectionObserver,
  });
});

afterEach(() => {
  (useElementOnScreen as jest.Mock).mockReset();

})

jest.mock("../../../hooks/useElementOnScreen", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockRef = { current: document.createElement("div") };

test("Test counter renders when invisable, and after delay", async () => {
  (useElementOnScreen as jest.Mock).mockReturnValue([mockRef, true]);
  render(
    <MemoryRouter>
      <AnimatedCounter finalCount={20} milisecondDelay={5} />
    </MemoryRouter>
  );
  expect(await screen.findByText('20')).toBeInTheDocument();
});

test("Test counter wont render if not visable", async () => {
  (useElementOnScreen as jest.Mock).mockReturnValue([mockRef, true]);
  render(
    <MemoryRouter>
      <AnimatedCounter finalCount={20} milisecondDelay={5} />
    </MemoryRouter>
  );
  expect(await screen.findByText('20')).toBeInTheDocument();
});

test("Test counter renders, but hasnt animated fully yet", async () => {
  (useElementOnScreen as jest.Mock).mockReturnValue([mockRef, true]);
  render(
    <MemoryRouter>
      <AnimatedCounter finalCount={20} milisecondDelay={10} />
    </MemoryRouter>
  );

  expect(await screen.findByText('5')).toBeInTheDocument();
  expect(await screen.findByText('20')).toBeInTheDocument();
  
  await waitFor(() => {
    expect(screen.queryByText("21")).not.toBeInTheDocument();
  }, { timeout: 500 });

});





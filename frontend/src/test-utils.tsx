import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import searchReducer from "./store/slices/searchSlice";
import userReducer from "./store/slices/userSlice";
import type { RootState } from "./store/store";

// Builds a fresh store per render so tests stay isolated
export function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: { search: searchReducer, user: userReducer },
    preloadedState: preloadedState as RootState | undefined,
  });
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Partial<RootState>;
  route?: string;
}

export function renderWithProviders(
  ui: ReactElement,
  { preloadedState, route = "/", ...renderOptions }: ExtendedRenderOptions = {},
) {
  const store = makeStore(preloadedState);

  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

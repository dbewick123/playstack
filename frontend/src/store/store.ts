// store.ts
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";
import userReducer from "./slices/userSlice";
import { registerApiStore } from "../api/client";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
  },
});

// Hand the store to the api client here to prevent circular dependency.
registerApiStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

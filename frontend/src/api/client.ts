// Every call to the Playstack backend MUST go through `apiFetch` to ensure authorisation conformance

import { BACKEND_API_URL } from "../config";
import { userLoggedOut, selectIsLoggedIn } from "../store/slices/userSlice";
import type { AppStore } from "../store/store";

// The store is injected at creation time (see store.ts → registerApiStore) rather than imported here, to avoid a store -> slices -> client -> store circular dependency.

let apiStore: AppStore | undefined;
export function registerApiStore(store: AppStore) {
  apiStore = store;
}

export type ApiRequestOptions = RequestInit & {
  skipAuthHandling?: boolean;
};

export async function apiFetch(
  path: string,
  options: ApiRequestOptions = {},
): Promise<Response> {
  const { skipAuthHandling, ...init } = options;

  const url = path.startsWith("http") ? path : `${BACKEND_API_URL}${path}`;

  const response = await fetch(url, {
    credentials: "include",
    ...init,
  });

  // Only reconcile when the client currently believes it is logged in. 
  if (!skipAuthHandling && apiStore && selectIsLoggedIn(apiStore.getState())) {
    const serverSaysLoggedOut =
      response.status === 401 ||
      response.headers?.get("X-Authenticated") === "false";

    if (serverSaysLoggedOut) {
      apiStore.dispatch(userLoggedOut());
    }
  }

  return response;
}

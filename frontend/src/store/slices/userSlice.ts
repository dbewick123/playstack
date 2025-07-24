import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define what a User looks like
interface User {
  id: string;
  username: string;
  email: string;
}

// Define what our whole user state looks like
interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Toggle mock mode 
const MOCK_MODE = true;

// Initial state
const initialState: UserState = {
  user: MOCK_MODE
    ? {
        id: "mock-123",
        username: "mockuser",
        email: "mock@example.com",
      }
    : null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    clearUser(state) {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;

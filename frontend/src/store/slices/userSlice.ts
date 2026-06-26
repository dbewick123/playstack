import { createSlice, createAction, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { apiFetch } from "../../api/client";

interface User {
  id: string;
  username: string;
  email: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userLoggedOut = createAction("auth/userLoggedOut");

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { dispatch }) => {
    const response = await apiFetch(`/auth/me`);
    const data = await response.json();
    const user = (data.user ?? null) as User | null;
    if (!user) dispatch(userLoggedOut());
    return user;
  }
);

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (payload: { username: string; email: string; password: string }, thunkAPI) => {
    const response = await apiFetch(`/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      const fields = data.error?.fields 
        ? data.error.fields 
        : [{ field: 'general', message: data?.message ?? "Error signing up, please try again" }]
      
      return thunkAPI.rejectWithValue(fields);
    }
    return data as User;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (payload: { email: string; password: string }, thunkAPI) => {
    const response = await apiFetch(`/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message);
    }
    return data as User;
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    await apiFetch(`/auth/logout`, {
      method: "POST",
    });
    dispatch(userLoggedOut());
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, ) => {
        state.error = 'Error signing up';
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.error = 'Error logging in';
        state.loading = false;
      })
      .addCase(userLoggedOut, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUser, clearUser, setLoading, setError } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
export const selectIsLoggedIn = (state: RootState) => state.user.user !== null;

export default userSlice.reducer;

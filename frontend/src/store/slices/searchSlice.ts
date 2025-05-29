// src/store/slices/searchSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SearchState } from "../../types/game";
import { RootState } from "../store";

const initialState: SearchState = {
  query: "",
  filters: { platforms: [], genres: [] },
  results: { games: [], nextPage: "", previousPage: "", count: 0 },
  loading: false,
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  //TODO: Test this (probably just from the Search component)
  "search/fetchSearchResults",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, thunkAPI) => {
    try {
      const rootState = thunkAPI.getState() as RootState;
      const searchState = rootState.search;
      const params = new URLSearchParams();

      //TODO: Test this for nulls, etc
      if (searchState.query) {
        params.append("search", searchState.query.replace(/\s+/g, "%"));
      }
      if (searchState.filters.genres) {
        params.append("genres", searchState.filters.genres.join(","));
      }
      if (searchState.filters.platforms) {
        params.append("platforms", searchState.filters.platforms.join(","));
      }

      const url = `${import.meta.env.VITE_BACKEND_API_URL}/games/query?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching games, promise rejected", error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    // Check if value already present, if so do nothing
    addGenre(state, action: PayloadAction<string>) {
      if (state.filters.genres.includes(action.payload)) {
        return;
      } else {
        state.filters.genres = [...state.filters.genres, action.payload];
      }
    },

    // Check if value already missing, if so do nothing
    removeGenre(state, action: PayloadAction<string>) {
      if (state.filters.genres.includes(action.payload)) {
        state.filters.genres = state.filters.genres.filter(
          (genre) => genre !== action.payload
        );
      } else {
        return;
      }
    },
    addPlatform(state, action: PayloadAction<string>) {
      if (state.filters.platforms.includes(action.payload)) {
        return;
      } else {
        state.filters.platforms = [...state.filters.platforms, action.payload];
      }
    },
    removePlatform(state, action: PayloadAction<string>) {
      if (state.filters.platforms.includes(action.payload)) {
        state.filters.platforms = state.filters.platforms.filter(
          (platform) => platform !== action.payload
        );
      } else {
        return;
      }
    },
    clearResults(state) {
      state.results = { games: [], nextPage: "", previousPage: "", count: 0 };
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loading = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.loading = false;
      });
  },
});

export const {
  setQuery,
  addGenre,
  removeGenre,
  addPlatform,
  removePlatform,
  clearResults,
} = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.search.query;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchError = (state: RootState) => state.search.error;

export default searchSlice.reducer;

// src/store/slices/searchSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { SearchState } from "../../types/game";
import { RootState } from "../store";

import { BACKEND_API_URL } from "../../config";

const initialState: SearchState = {
  query: "",
  filters: { platforms: [], genres: [] },
  // TODO: Maybe add ordering here
  results: {
    games: [],
    next: "",
    previous: "",
    count: 0,
    status: "ok",
  },
  pageSize: 20,
  pageNumber: 1,
  loading: false,
  error: null,
};

export const fetchSearchResults = createAsyncThunk(
  //TODO: Improve the sophistication of the search, need to have better ways of showing recent games, etc (add order by)
  "search/fetchSearchResults",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, thunkAPI) => {
    try {

      const rootState = thunkAPI.getState() as RootState;
      const searchState = rootState.search;
      const params = new URLSearchParams();

      //TODO: Improve the search accuracy further
      const today = new Date();
      const localISODate =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

      //TODO: Test this for nulls, etc
      if (searchState.query) {
        params.append("search", searchState.query.replace(/\s+/g, "%"));
      }
      if (searchState.filters.genres.length > 0) {
        params.append("genres", searchState.filters.genres.join(","));
      }
      if (searchState.filters.platforms.length > 0) {
        params.append("platforms", searchState.filters.platforms.join(","));
      }
      if (searchState.pageSize) {
        params.append("page_size", searchState.pageSize.toString());
      }
      if (searchState.pageNumber) {
        params.append("page", searchState.pageNumber.toString());
      }

      //Defaults to improve basic search accuracy & ordering
      params.append("search_precise", "true");

      //TODO: Test case for this to check timezones
      params.append("dates", `1960-01-01,${localISODate}`);

      const url = `${BACKEND_API_URL}/games/query?${params.toString()}`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching games, promise rejected", error);
      throw error;
    }
  }
);

export const fetchNextPageResults = createAsyncThunk(
  "search/fetchNextPageResults",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (_, thunkAPI) => {
    try {
      const rootState = thunkAPI.getState() as RootState;
      const searchState = rootState.search;

      if (!searchState.results.next) {
        return;
      }

      const encodedUrl = encodeURIComponent(searchState.results.next);
      const finalUrl = `${BACKEND_API_URL}/games/proxy?targetUrl=${encodedUrl}`;

      const response = await fetch(finalUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(
        "Error fetching next page of games, promise rejected",
        error
      );
      throw error;
    }
  }
);

//TODO Tests for removing or adding Genres/Platforms when on a high page number, etc
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
    setPageNumber(state, action: PayloadAction<string>) {
      state.pageNumber = Number(action.payload) || 1;
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
      state.results = {
        games: [],
        next: "",
        previous: "",
        count: 0,
        status: "ok",
      };
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
      })
      .addCase(fetchNextPageResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNextPageResults.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = "true";
          return;
        }
        const { games, ...rest } = action.payload;
        state.results = {
          ...state.results,
          ...rest,
          games: [...state.results.games, ...games],
        };
        state.loading = false;
      })
      .addCase(fetchNextPageResults.rejected, (state, action) => {
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
  setPageNumber,
} = searchSlice.actions;

export const selectSearchQuery = (state: RootState) => state.search.query;
export const selectSearchResults = (state: RootState) => state.search.results;
export const selectSearchLoading = (state: RootState) => state.search.loading;
export const selectSearchError = (state: RootState) => state.search.error;
export const selectFilters = (state: RootState) => state.search.filters;
export const selectPageSize = (state: RootState) => state.search.pageSize;
export const selectPageNumber = (state: RootState) => state.search.pageNumber;

export default searchSlice.reducer;

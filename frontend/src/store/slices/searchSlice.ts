// src/store/slices/searchSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Define the shape of the search state
interface SearchState {
    query: string;
    filters: string[];
    results: string[]; // You can change this to Game[] later
    loading: boolean;
    error: string | null;
}

const initialState: SearchState = {
    query: '',
    filters: [],
    results: [],
    loading: false,
    error: null,
};

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (query: string) => {
        query;//TODO: Replace with real API call
        return ['PLACEHOLDER'];
    }
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        clearResults(state) {
            state.results = [];
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
                state.error = action.error.message || 'Something went wrong';
                state.loading = false;
            });
    },
});

export const { setQuery, clearResults } = searchSlice.actions;
export default searchSlice.reducer;

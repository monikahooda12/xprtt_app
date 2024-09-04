// src/slices/lazyLoaderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { httpRequest } from '../api/http'; 

const initialState = {
  data: [],
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

// Thunk for fetching data
export const fetchLazyData = createAsyncThunk(
  'lazyLoader/fetchLazyData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await httpRequest({
        url: params.url, // Pass the URL dynamically
        method: 'GET',
        params: {
          page: params.page,
          ...params.filters, // Spread any additional filters
        },
      });
      return response.data; // Return the response data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const lazyLoaderSlice = createSlice({
  name: 'lazyLoader',
  initialState,
  reducers: {
    resetLazyLoader: (state) => {
      // Reset state when required
      state.data = [];
      state.currentPage = 1;
      state.totalPages = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLazyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLazyData.fulfilled, (state, action) => {
        const { list, totalPages } = action.payload;
        state.data = [...state.data, ...list]; // Append new data
        state.totalPages = totalPages;
        state.currentPage += 1;
        state.loading = false;
      })
      .addCase(fetchLazyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetLazyLoader } = lazyLoaderSlice.actions;

export default lazyLoaderSlice.reducer;

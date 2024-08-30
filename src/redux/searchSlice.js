
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../constants';
import { httpRequest } from '../api/http';

export const fetchItems = createAsyncThunk(
  'search/fetchItems',
  async () => {
    const response = await httpRequest({
      method: 'GET',
      url: API.GET_CATEGORIES,
    });
    return response?.data?.list || [];
  }
);

const flattenItems = (items) => {
  let flattened = [];
  items.forEach(item => {
    flattened.push(item);
    // if (item.child && item.child.length > 0) {
      // flattened = flattened.concat(flattenItems(item.child)); 
    // }
  });
  return flattened;
};

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    allItems: [],
    // filteredItems: [],
    loading: false,
    searchTerm: '',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = state.allItems.filter(item => 
        item.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        (item.professional?.job_title && item.professional.job_title.toLowerCase().includes(action.payload.toLowerCase()))
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.allItems = flattenItems(action.payload);
        state.filteredItems = state.allItems;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
      });
  },
});


export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { API } from '../constants';
// import { httpRequest } from '../api/http';

// export const fetchItems = createAsyncThunk(
//   'search/fetchItems',
//   async () => {
//     const response = await httpRequest({
//       method: 'GET',
//       url: API.GET_CATEGORIES,
//     });
//     return response?.data?.list || [];
//   }
// );

// const flattenItems = (items) => {
//   let flattened = [];
//   items.forEach(item => {
//     flattened.push(item);
//        if (item.child && item.child.length > 0) {
//         // console.log(`${item.name} has ${item.child.length} child items`);
//          flattened = flattened.concat(flattenItems(item.child)); 
//        }
//   });
//   return flattened;
// };

// const searchSlice = createSlice({
//   name: 'search',
//   initialState: { 
//     allItems: [],
//      filteredItems: [],
//     loading: false,
//     searchTerm: '',
//   },
//   reducers: {
//     setSearchTerm: (state, action) => {
//       const searchTerm = action.payload.toLowerCase();
//       console.log('Search Term:', searchTerm);
  
//       state.filteredItems = state.allItems.filter(item => {
//         // Log the item being checked
//         console.log('Checking Item:', item.name);
  
//         // Check if the item name or professional job title matches
//         const matchesItem = item.name.toLowerCase().includes(searchTerm) ||
//           (item.professional?.job_title && item.professional.job_title.toLowerCase().includes(searchTerm));
        
//         // Check if any child item name matches
//         const matchesChild = item.child?.some(child => {
//           console.log('Checking Child:', child.name);
//           return child.name.toLowerCase().includes(searchTerm);
//         });
  
//         // Log matches
//         console.log('Matches Item:', matchesItem);
//         console.log('Matches Child:', matchesChild);
  
//         return matchesItem || matchesChild;
//       });
  
//       console.log('Filtered Items:', state.filteredItems);
//     },
//   },
  
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchItems.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchItems.fulfilled, (state, action) => {
//         state.loading = false;
//         state.allItems = flattenItems(action.payload);
//         state.filteredItems = state.allItems;
//       })
//       .addCase(fetchItems.rejected, (state) => {
//         state.loading = false;
//       });
//   },
// });


// export const { setSearchTerm } = searchSlice.actions;
// export default searchSlice.reducer;
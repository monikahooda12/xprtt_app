import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  selectedCategoryID:null,
  selectedService: null,
  searchTerm: '',
 selectedServiceName:null,
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategoryID:(state,action)=>{
      state.selectedCategoryID = action.payload;
  },
   setselectedService:(state,action)=>{ 
    state.selectedService = action.payload;
  },
  setSearchTerm: (state, action) => {
    state.searchTerm = action.payload;
  },

setCats:(state,action)=>{
  state.cats = action.payload;
},
setselectedServiceNames:(state,action)=>{
  state.selectedServiceNames = action.payload;
}

  

  },
});

export const { setCategories,setSelectedCategoryID,setselectedService,setSearchTerm ,setselectedServiceNames} = categorySlice.actions;
export default categorySlice.reducer;
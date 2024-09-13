import { configureStore } from '@reduxjs/toolkit';
import categoryReducer, { setselectedService } from '../redux/categories/categorySlice';


import searchReducer from '../redux/searchSlice';
import { thunk } from 'redux-thunk';
import lazyLoaderSlice from './lazyloder/lazyLoaderSlice';


const store = configureStore({
  reducer: {
    categories: categoryReducer,
    
  
    search: searchReducer,
    lazyLoader:lazyLoaderSlice,
    
  
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
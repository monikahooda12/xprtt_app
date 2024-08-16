import { configureStore } from '@reduxjs/toolkit';
import categoryReducer, { setselectedService } from '../redux/categories/categorySlice';
import  useReducer  from '../redux/users/userSlice';
import dataReducer from '../redux/data/dataSlice';
import searchReducer from '../redux/searchSlice'

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    user:useReducer,
    data:dataReducer,
    search: searchReducer,
  
  },
});

export default store;
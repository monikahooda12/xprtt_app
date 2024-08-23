import { configureStore } from '@reduxjs/toolkit';
import categoryReducer, { setselectedService } from '../redux/categories/categorySlice';
import  useReducer  from '../redux/users/userSlice';
import dataReducer from '../redux/data/dataSlice';
import searchReducer from '../redux/searchSlice';
import { thunk } from 'redux-thunk';


const store = configureStore({
  reducer: {
    categories: categoryReducer,
    user:useReducer,
    data:dataReducer,
    search: searchReducer,
  
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
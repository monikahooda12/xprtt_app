// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isloading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.isloading = true;
      state.error = null;
    },
    fetchUserSuccess: (state, action) => {
        state.users = action.payload;
        state.isloading = false;
        state.error = null;
      },
    fetchUserFailure(state, action) {
      state.isloading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;
export default userSlice.reducer;
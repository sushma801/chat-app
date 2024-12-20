import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loggedInUser: null,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setAuthUser: (state, action) => {
      const authUser = localStorage.getItem('authUser');
      if (authUser) {
        state.loggedInUser = authUser;
      }
      state.loggedInUser = action.payload;
    },
  },
});

export const { setUsers, setAuthUser } = UserSlice.actions;
export default UserSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { RoleEnum } from '../Enums';


interface AuthState {
  isLoggedIn: boolean
  role: RoleEnum | null
}

const initialState: AuthState = { 
  isLoggedIn: false,
  role: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.role = null;
    },
    setRole(state, action) {
      state.role = action.payload;
    },
  },
});

export const { login, logout, setRole } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
export default authSlice.reducer;
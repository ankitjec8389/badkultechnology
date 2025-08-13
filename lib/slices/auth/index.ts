// lib/features/authSlice.ts
import { RootState } from '@/lib/slices/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthState>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export const selectAuthState = (state: RootState) => state.auth;
export default authSlice;

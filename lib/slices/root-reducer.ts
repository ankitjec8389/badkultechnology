import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './auth';
import { baseAPI } from '../services';

export const rootReducer = combineReducers({
  [baseAPI.reducerPath]: baseAPI.reducer,
  // app level slice
  auth: authSlice.reducer,
});

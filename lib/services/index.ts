import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TAGS } from './tags';
import { RootState } from '../slices/store';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://jsonplaceholder.typicode.com', // change to your real API
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken; // assuming auth slice holds the token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 Unauthorized error, try to refresh the token
  if (result.error && result.error.status === 401) {
    console.log('Attempting token refresh...');

    // Attempt token refresh
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh', // adjust to your refresh endpoint
        method: 'POST',
        body: {
          refreshToken: (api.getState() as RootState).auth.refreshToken,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // Store the new token in your Redux state
      api.dispatch(
        // Replace with your actual action
        {
          type: 'auth/setCredentials',
          payload: refreshResult.data,
        },
      );

      // Retry the original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh failed, logout or handle accordingly
      api.dispatch({ type: 'auth/logout' });
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});

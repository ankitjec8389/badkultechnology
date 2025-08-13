import { ENDPOINTS } from '@/lib/utils';
import { baseAPI } from '..';

export const mockTestApi = baseAPI.injectEndpoints({
  endpoints: (b) => ({
    getPost: b.query<void, void>({
      query: () => ({
        url: ENDPOINTS.GET_POST,
      }),
    }),
  }),
});

export const { useGetPostQuery } = mockTestApi;

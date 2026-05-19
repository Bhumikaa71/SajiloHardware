// services/serviceApi.ts
import { baseApi } from './baseApi';

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // GET /api/v1/services (public)
    getServices: builder.query<any, void>({
      query: () => ({
        url: '/api/v1/services',
        method: 'GET',
      }),
      providesTags: ['Service'],
    }),
  }),
});

export const {
  useGetServicesQuery,
} = serviceApi;
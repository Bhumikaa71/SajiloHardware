

import { get } from 'http';
import { baseApi } from './baseApi';


export const brandApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBrands: builder.query<any, void>({
            query: () => ({
                url: '/api/v1/active-brands',
                method: 'GET',
                // keepUnusedDataFor: 10,
            }),
        }), 
    }),
});

export const {
    useGetBrandsQuery
} = brandApi;
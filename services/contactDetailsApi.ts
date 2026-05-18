import { get } from 'http';
import { baseApi } from './baseApi';

export const contactDetailsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getContactDetails: builder.query<any, void>({
            query: () => ({
                url: '/api/v1/contact-details',
                method: 'GET',
                // keepUnusedDataFor: 10,
            }),
        }), 
    }),
});

export const {
    useGetContactDetailsQuery
} = contactDetailsApi;
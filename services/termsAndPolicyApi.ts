import { get } from 'http';
import { baseApi } from './baseApi';
import { use } from 'react';

export const termsAndPolicyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTerms: builder.query<any, void>({
            query: () => ({
                url: '/api/v1/terms-conditions',
                method: 'GET',
                // keepUnusedDataFor: 10,
            }),
        }),
        getPrivacyPolicy: builder.query<any, void>({
            query: () => ({
                url: '/api/v1/privacy-policy',
                method: 'GET',
                // keepUnusedDataFor: 10,
            }),
        }),
    }),
});

export const {
    useGetTermsQuery,
    useGetPrivacyPolicyQuery
} = termsAndPolicyApi;
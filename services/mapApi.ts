import { get } from 'http';
import { baseApi } from './baseApi';

export const mapDetailsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMapDetails: builder.query<any, void>({
            query: () => ({
                url: '/api/v1/map-location-details',
                method: 'GET',
                // keepUnusedDataFor: 10,
            }),
        }), 
    }),
});

export const {
    useGetMapDetailsQuery
} = mapDetailsApi;
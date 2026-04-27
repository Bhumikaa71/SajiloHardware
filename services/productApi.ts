import { get } from "http";
import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBestSellingProducts: builder.query<any, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) =>
                `/api/v1/best-selling-products?page=${page}&limit=${limit}`,
            providesTags: ['BestSelling'],
            keepUnusedDataFor: 10, // cache for 10 sec
        }),

        // GET ALL PRODUCT LIST
        getAllProducts: builder.query<any, { page: number; limit: number; category?: string; brand?: string }>({
            query: ({ page, limit, category, brand }) => {
                const params = new URLSearchParams();
                params.append("page", String(page));
                params.append("limit", String(limit));
                if (category) params.append("category", category);
                if (brand) params.append("brand", brand);
                return `/api/v1/all-product-list?${params.toString()}`;
            },
        }),

        // Get Hot Deals
        getHotDeals: builder.query<any, void>({
            query: () =>
                `/api/v1/hot-deals`,
            providesTags: ['HotDeals'],
            keepUnusedDataFor: 10, // cache for 10 sec
        }),


    }),
});

export const {
    useGetBestSellingProductsQuery,
    useGetAllProductsQuery,
    useGetHotDealsQuery
} = productApi;
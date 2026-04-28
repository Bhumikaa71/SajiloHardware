import { get } from "http";
import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // GET BEST SELLING PRODUCTS
        getBestSellingProducts: builder.query<any, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) =>
                `/api/v1/best-selling-products?page=${page}&limit=${limit}`,
            providesTags: ['BestSelling'],
            // keepUnusedDataFor: 10, // cache for 10 sec
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

        // GET PRODUCT DETAILS
        getProductDetails: builder.query<any, { slug: string }>({
            query: ({ slug }) => `/api/v1/product/${slug}`,
            providesTags: (result, error, { slug }) => [{ type: 'Product', id: slug }],
        }),

        // GET PRODUCTS BY SUBCATEGORY
        getProductByCategories: builder.query<any, { categorySlug: string; page?: number; limit?: number }>({
            query: ({ categorySlug, page = 1, limit = 10 }) =>
                `/api/v1/product/category/${categorySlug}?page=${page}&limit=${limit}`,
            providesTags: ['Product'],
        }),

        // GET NEW ARRIVALS
        getNewArrivals: builder.query<any, void>({
            query: () =>
                `/api/v1/new-arrival`,
            providesTags: ['Product'],
            keepUnusedDataFor: 10, // cache for 10 sec
        }),

        // GET FEATURED PRODUCTS
        // getFeaturedProducts: builder.query<any, void>({
        //     query: () =>
        //         `/api/v1/product/featured`,
        //     providesTags: ['Product'],
        //     keepUnusedDataFor: 10, // cache for 10 sec
        // })

        // GET FEATURED PRODUCTS
        getFeaturedProducts: builder.query<any, void>({
            query: () => `/api/v1/product/featured`,
            providesTags: ['Product'],
            keepUnusedDataFor: 300, // cache for 5 min - featured products don't change often, so we can cache them for longer
        }),

    }),
});

export const {
    useGetBestSellingProductsQuery,
    useGetAllProductsQuery,
    useGetHotDealsQuery,
    useGetProductDetailsQuery,
    useGetProductByCategoriesQuery,
    useGetFeaturedProductsQuery,
    useGetNewArrivalsQuery,
} = productApi;
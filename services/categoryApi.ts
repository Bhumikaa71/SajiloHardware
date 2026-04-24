import { baseApi } from './baseApi';

// Types based on your Express Controller requirements
export interface Category {
    image: string | Blob | undefined;
    _id: string;
    name: string;
    slug: string;
    description?: string;
    parentCategory?: string | null;
    parent?: string | null; // Changed from parentCategory to match your Swagger/Backend
    level: number;          // Added to support level filtering
    order: number;
    children?: Category[];
}

interface CategoryResponse<T> {
    status: string;
    data: T;
}

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Fetch categories with optional level filtering
        getCategoryTree: builder.query<any, void>({
            query: () => '/api/v1/categories/tree',
            providesTags: ['Category'],
        }),

        // Best Selling Product List
        getBestSellingProducts: builder.query<any, void>({
            query: () => '/api/v1/best-selling-products',
            providesTags: ['BestSelling'],  
        }),


    }),
});

// Auto-generated hooks for use in components
export const {
    useGetCategoryTreeQuery,
    useGetBestSellingProductsQuery
} = categoryApi;
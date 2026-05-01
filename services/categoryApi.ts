import { baseApi } from './baseApi';

export interface Category {
    image: string | Blob | undefined;
    _id: string;
    name: string;
    slug: string;
    description?: string;
    parentCategory?: string | null;
    parent?: string | null;
    level: number;
    order: number;
    children?: Category[];
}

export const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCategoryTree: builder.query<any, void>({
            query: () => '/api/v1/categories/tree',
            providesTags: ['Category'],
        }),

        getFeatureCategories: builder.query<any, void>({
            query: () => '/api/v1/featured-categories',
            providesTags: ['Category'],
            keepUnusedDataFor: 300,
        }),

    }),
});

export const {
    useGetCategoryTreeQuery,
    useGetFeatureCategoriesQuery
} = categoryApi;
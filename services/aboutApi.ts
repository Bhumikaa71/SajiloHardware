import { baseApi } from "./baseApi";

// Define the interface for the About Data structure
export interface IAboutData {
    _id?: string;
    image: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
}

// Define the expected API responses
interface GetAboutResponse {
    success: boolean;
    data: IAboutData;
}

export const aboutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // 1. GET ABOUT CONTENT
        getAbout: builder.query<GetAboutResponse, void>({
            query: () => "/api/v1/about",
            providesTags: ["About"],
        }),

    }),
    overrideExisting: false,
});

// Auto-generated hooks based on the endpoints defined above
export const {
    useGetAboutQuery,
} = aboutApi;
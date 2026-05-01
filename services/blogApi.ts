
import { get } from "http";
import { baseApi } from "./baseApi";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllBlogs: builder.query<any, void>({
      query: () => ({ url: "/api/v1/blog/published", method: "GET" }),
      providesTags: ["Blogs"],
    }),

    getBlogById: builder.query<any, string>({
      query: (id) => ({ url: `/api/v1/blog/published/${id}`, method: "GET" }),
      providesTags: (result, error, id) => [{ type: "Blogs", id }],
    }),

  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogByIdQuery,
} = blogApi;
// src/redux/features/socialMedia/socialMediaApi.ts

import { baseApi } from "./baseApi";

export const socialMediaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ─────────────────────────────
    // Get All
    // ─────────────────────────────
    getAllSocialMedia: builder.query<any, void>({
      query: () => ({
        url: "/api/v1/social-media",
        method: "GET",
      }),

      providesTags: ["SocialMedia"],
    }),

  }),
});

export const {
  useGetAllSocialMediaQuery,
} = socialMediaApi;
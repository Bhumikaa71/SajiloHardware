import { baseApi } from "./baseApi";

export const sliderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllSliders: builder.query<any, void>({
      query: () => ({ url: "/api/v1/slider", method: "GET" }),
      providesTags: ["Sliders"],
    }),

  }),
});

export const {
  useGetAllSlidersQuery
} = sliderApi;
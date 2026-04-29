import { get } from "http";
import { baseApi } from "./baseApi";

export const vendorApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // LOGIN VENDOR
        loginVendor: builder.mutation<any, { email: string; password: string }>({
            query: (credentials) => ({
                url: `/api/v1/vendor-login`,
                method: "POST",
                body: credentials,
            }),
        }),

        // VENDOR PROFILE
        getVendorProfile: builder.query<any, void>({
            query: () => ({
                url: `/api/v1/vendor`,
                method: "GET",
            }),
        }),

        // UPDATE VENDOR PASSWORD
        updateProfile: builder.mutation({
            query: (body) => ({ url: "/api/v1/vendor/profile", method: "PUT", body }),
        }),

        // UPDATE VENDOR PASSWORD
        updatePassword: builder.mutation({
            query: (body) => ({ url: "/api/v1/vendor/password", method: "PUT", body }),
        }),

        // GET VENDOR ORDERS HISTORY
        getVendorOrdersHistory: builder.query<any, void>({
            query: () => ({ url: "/api/v1/vendor/order-history", method: "GET" }),
        }),


        // GET VENDOR ACTIVE ORDERS
        getVendorActiveOrders: builder.query<any, void>({
            query: () => ({ url: "/api/v1/vendor/orders", method: "GET" }),
        }),

    }),
});


export const {
    useLoginVendorMutation,
    useGetVendorProfileQuery,
    useUpdateProfileMutation,
    useUpdatePasswordMutation,
    useGetVendorOrdersHistoryQuery,
    useGetVendorActiveOrdersQuery,
} = vendorApi;
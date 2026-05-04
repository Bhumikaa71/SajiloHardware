import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'api', // The key in your Redux store
  keepUnusedDataFor: 300,        // ✅ Keep cache for 5 min globally
  refetchOnFocus: false,         // ✅ Disable - causes unnecessary refetches
  refetchOnReconnect: true,        // ✅ fixes reconnect re-fetch
  refetchOnMountOrArgChange: false, // ✅ MUST be false - this is your skeleton cause
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://sajilo-hardware.onrender.com', //baseUrl: 'https://sajilo-hardware.onrender.com
    // baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    prepareHeaders: (headers) => {
      const vn_sh_token = localStorage.getItem('vn-sh-token');
      if (vn_sh_token) headers.set('authorization', `Bearer ${vn_sh_token}`);
      return headers;
    },
  }),
  tagTypes: ['User', 'Products', 'Vendors', 'Blogs', 'Vendor', 'Admin', 'Media', 'Category', 'Brand', 'Product', 'Orders', 'BestSelling', 'HotDeals'], // Used for smart caching
  endpoints: () => ({}), // Leave empty! Features will "inject" here.
});


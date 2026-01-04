import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const priceSettingApi = createApi({
    reducerPath: "priceSettingApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        getPriceSettings: builder.query({
            query: () => "/admin/price-settings",
        }),
        createPriceSetting: builder.mutation({
            query: (data) => ({
                url: "/admin/price-settings",
                method: "POST",
                body: data,
            }),
        }),
        updatePriceSetting: builder.mutation({
            query: ({ id, body }) => ({
                url: `/admin/price-settings/${id}`,
                method: "PUT",
                body,
            }),
        }),
        deletePriceSetting: builder.mutation({
            query: (id) => ({
                url: `/admin/price-settings/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetPriceSettingsQuery,
    useCreatePriceSettingMutation,
    useUpdatePriceSettingMutation,
    useDeletePriceSettingMutation,
} = priceSettingApi;

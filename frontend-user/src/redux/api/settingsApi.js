import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const settingsApi = createApi({
    reducerPath: "settingsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
        credentials: "include",
    }),
    tagTypes: ["Settings"],
    endpoints: (builder) => ({
        getPlatformSettings: builder.query({
            query: () => "/admin/settings?group=platform",
            providesTags: ["Settings"],
        }),

        updatePlatformSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getModelSettings: builder.query({
            query: () => "/admin/settings?group=model",
            providesTags: ["Settings"],
        }),

        updateModelSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getPricingSettings: builder.query({
            query: () => "/admin/settings?group=pricing",
            providesTags: ["Settings"],
        }),

        updatePricingSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getPaymentSettings: builder.query({
            query: () => "/admin/settings?group=payment",
            providesTags: ["Settings"],
        }),

        updatePaymentSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getLocationSettings: builder.query({
            query: () => "/admin/settings?group=location",
            providesTags: ["Settings"],
        }),

        updateLocationSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getMediaSettings: builder.query({
            query: () => "/admin/settings?group=media",
            providesTags: ["Settings"],
        }),

        updateMediaSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getSeoSettings: builder.query({
            query: () => "/admin/settings?group=seo",
            providesTags: ["Settings"],
        }),

        updateSeoSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getEmailSettings: builder.query({
            query: () => "/admin/settings?group=email",
            providesTags: ["Settings"],
        }),

        updateEmailSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),

        getAwsSettings: builder.query({
            query: () => "/admin/settings?group=aws",
            providesTags: ["Settings"],
        }),

        updateAwsSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),

        getSecuritySettings: builder.query({
            query: () => "/admin/settings?group=security",
            providesTags: ["Settings"],
        }),

        updateSecuritySettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getLegalSettings: builder.query({
            query: () => "/admin/settings?group=legal",
            providesTags: ["Settings"],
        }),

        updateLegalSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getFeatureSettings: builder.query({
            query: () => "/admin/settings?group=features",
            providesTags: ["Settings"],
        }),

        updateFeatureSettings: builder.mutation({
            query: (body) => ({
                url: "/admin/settings",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Settings"],
        }),
        getAllSettings: builder.query({
            query: () => "/admin/settings",
            providesTags: ["Settings"],
        }),

        // getLocationSettings: builder.query({
        //     query: () => "/admin/settings?group=location",
        //     providesTags: ["Settings"],
        // }),

        // updateLocationSettings: builder.mutation({
        //     query: (body) => ({
        //         url: "/admin/settings",
        //         method: "PUT",
        //         body,
        //     }),
        //     invalidatesTags: ["Settings"],
        // }),

    }),
});

export const {
    useGetPlatformSettingsQuery,
    useUpdatePlatformSettingsMutation,
    useGetModelSettingsQuery,
    useUpdateModelSettingsMutation,
    useGetPricingSettingsQuery,
    useUpdatePricingSettingsMutation,
    useGetPaymentSettingsQuery,
    useUpdatePaymentSettingsMutation,
    useGetLocationSettingsQuery,
    useUpdateLocationSettingsMutation,
    useGetMediaSettingsQuery,
    useUpdateMediaSettingsMutation,
    useGetSeoSettingsQuery,
    useUpdateSeoSettingsMutation,
    useGetEmailSettingsQuery,
    useUpdateEmailSettingsMutation,
    useGetAwsSettingsQuery,
    useUpdateAwsSettingsMutation,
    useGetSecuritySettingsQuery,
    useUpdateSecuritySettingsMutation,
    useGetLegalSettingsQuery,
    useUpdateLegalSettingsMutation,
    useGetFeatureSettingsQuery,
    useUpdateFeatureSettingsMutation,
    useGetAllSettingsQuery,
} = settingsApi;

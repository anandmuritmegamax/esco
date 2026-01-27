import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pricingApi = createApi({
    reducerPath: "pricingApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["Plans"],
    endpoints: (builder) => ({
        getPlans: builder.query({
            query: () => "/admin/pricing-plans",
            providesTags: ["Pricing"],
        }),

        createPlan: builder.mutation({
            query: (data) => ({
                url: "/admin/pricing-plans",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Pricing"],
        }),

        updatePlan: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/pricing-plans/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Pricing"],
        }),

        deletePlan: builder.mutation({
            query: (id) => ({
                url: `/admin/pricing-plans/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pricing"],
        }),
    }),
});

export const {
    useGetPlansQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation,
} = pricingApi;

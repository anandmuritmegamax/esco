import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pricingApi = createApi({
    reducerPath: "pricingApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["Plans"],
    endpoints: (builder) => ({
        getPlans: builder.query({
            query: (params) => {
                const qs = new URLSearchParams(params || {}).toString();
                return `/admin/plans?${qs}`;
            },
            providesTags: (result) =>
                result?.plans
                    ? [...result.plans.map((p) => ({ type: "Plans", id: p._id })), { type: "Plans", id: "LIST" }]
                    : [{ type: "Plans", id: "LIST" }],
        }),
        getPlan: builder.query({
            query: (id) => `/admin/plan/${id}`,
            providesTags: (result, error, id) => [{ type: "Plans", id }],
        }),
        createPlan: builder.mutation({
            query: (body) => ({ url: "/admin/plans", method: "POST", body }),
            invalidatesTags: [{ type: "Plans", id: "LIST" }],
        }),
        updatePlan: builder.mutation({
            query: ({ id, data }) => ({ url: `/admin/plan/${id}`, method: "PUT", body: data }),
            invalidatesTags: (res, err, { id }) => [
                { type: "Plans", id },
                { type: "Plans", id: "LIST" },
            ],
        }),
        deletePlan: builder.mutation({
            query: (id) => ({ url: `/admin/plan/${id}`, method: "DELETE" }),
            invalidatesTags: [{ type: "Plans", id: "LIST" }],
        }),
    }),
});

export const {
    useGetPlansQuery,
    useGetPlanQuery,
    useCreatePlanMutation,
    useUpdatePlanMutation,
    useDeletePlanMutation
} = pricingApi;

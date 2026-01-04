import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptyLegApi = createApi({
    reducerPath: "emptyLegApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1", credentials: "include" }),
    tagTypes: ["EmptyLeg"],

    endpoints: (builder) => ({
        getEmptyLegs: builder.query({
            query: () => "/admin/empty-legs",
            providesTags: ["EmptyLeg"],
        }),

        getEmptyLegsDeals: builder.query({
            query: () => "/empty-legs",
            providesTags: ["EmptyLeg"],
        }),

        getEmptyLeg: builder.query({
            query: (id) => `/admin/empty-legs/${id}`,
        }),

        createEmptyLeg: builder.mutation({
            query: (body) => ({
                url: "/admin/empty-legs",
                method: "POST",
                body,
            }),
            invalidatesTags: ["EmptyLeg"],
        }),

        updateEmptyLeg: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/admin/empty-legs/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["EmptyLeg"],
        }),

        deleteEmptyLeg: builder.mutation({
            query: (id) => ({
                url: `/admin/empty-legs/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["EmptyLeg"],
        }),

        toggleEmptyLegStatus: builder.mutation({
            query: (id) => ({
                url: `/admin/empty-legs/toggle/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["EmptyLeg"],
        }),
        getEmptyLegDetail: builder.query({
            query: (id) => `/empty-legs/${id}`,
        }),
    }),
});

export const {
    useGetEmptyLegsQuery,
    useGetEmptyLegQuery,
    useCreateEmptyLegMutation,
    useUpdateEmptyLegMutation,
    useDeleteEmptyLegMutation,
    useToggleEmptyLegStatusMutation,
    useGetEmptyLegDetailQuery,
    useGetEmptyLegsDealsQuery,
} = emptyLegApi;

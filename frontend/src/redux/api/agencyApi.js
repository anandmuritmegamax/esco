import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const agencyApi = createApi({
    reducerPath: "agencyApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["Agency"],
    endpoints: (builder) => ({
        /* ================= ADMIN LIST ================= */
        getAgenciesAdmin: builder.query({
            query: () => "/admin/agencies",
            providesTags: ["Agency"],
        }),

        /* ================= PENDING ONLY ================= */
        getPendingAgencies: builder.query({
            query: () => "/admin/agencies/pending",
            providesTags: ["Agency"],
        }),

        /* ================= CREATE ================= */
        createAgency: builder.mutation({
            query: (body) => ({
                url: "/admin/agencies",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Agency"],
        }),

        /* ================= UPDATE ================= */
        updateAgency: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/admin/agencies/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Agency"],
        }),

        /* ================= STATUS ================= */
        updateAgencyStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/admin/agencies/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["Agency"],
        }),

        /* ================= DELETE ================= */
        deleteAgency: builder.mutation({
            query: (id) => ({
                url: `/admin/agencies/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Agency"],
        }),
    }),
});

export const {
    useGetAgenciesAdminQuery,
    useGetPendingAgenciesQuery,
    useCreateAgencyMutation,
    useUpdateAgencyMutation,
    useUpdateAgencyStatusMutation,
    useDeleteAgencyMutation,
} = agencyApi;

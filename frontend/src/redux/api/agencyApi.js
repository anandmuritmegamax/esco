import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");

        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;
    },
});

export const agencyApi = createApi({
    reducerPath: "agencyApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Agency", "Model", "Booking", "Earning"],
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

        /* ================= AGENCY DASHBOARD ================= */
        getAgencyDashboard: builder.query({
            query: () => "/agency/dashboard",
            providesTags: ["Agency"],
        }),

        /* ================= AGENCY PROFILE ================= */
        getAgencyProfile: builder.query({
            query: () => "/agency/profile",
            providesTags: ["Agency"],
        }),

        updateAgencyProfile: builder.mutation({
            query: (body) => ({
                url: "/agency/profile",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Agency"],
        }),

        /* ================= AGENCY MODELS ================= */
        getAgencyModels: builder.query({
            query: () => "/agency/models",
            providesTags: ["Model"],
        }),

        /* ================= ADD MODEL ================= */
        addModel: builder.mutation({
            query: (body) => ({
                url: "/agency/models",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Model"],
        }),

        /* ================= AGENCY BOOKINGS ================= */
        getAgencyBookings: builder.query({
            query: () => "/agency/bookings",
            providesTags: ["Booking"],
        }),

        /* ================= AGENCY EARNINGS ================= */
        getAgencyEarnings: builder.query({
            query: () => "/agency/earnings",
            providesTags: ["Earning"],
        }),
        getAgencyModel: builder.query({
            query: (id) => `/agency/models/${id}`,
        }),
        updateAgencyModel: builder.mutation({
            query: ({ id, body }) => ({
                url: `/agency/models/${id}`,
                method: "PUT",
                body,
            }),
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
    useGetAgencyDashboardQuery,
    useGetAgencyProfileQuery,
    useUpdateAgencyProfileMutation,
    useGetAgencyModelsQuery,
    useAddModelMutation,
    useGetAgencyBookingsQuery,
    useGetAgencyEarningsQuery,
    useGetAgencyModelQuery,
    useUpdateAgencyModelMutation,

} = agencyApi;
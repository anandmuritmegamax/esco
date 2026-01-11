// redux/api/clientApi.js
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

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Client", "Model", "Booking", "Favorite"],
    endpoints: (builder) => ({
        getClientsAdmin: builder.query({
            query: () => "/admin/clients",
            providesTags: ["Client"],
        }),

        createClient: builder.mutation({
            query: (body) => ({
                url: "/admin/clients",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Client"],
        }),

        updateClient: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/admin/clients/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Client"],
        }),

        updateClientStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/admin/clients/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["Client"],
        }),

        deleteClient: builder.mutation({
            query: (id) => ({
                url: `/admin/clients/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Client"],
        }),

        /* ================= CLIENT DASHBOARD ================= */
        getClientDashboard: builder.query({
            query: () => "/client/dashboard",
            providesTags: ["Client"],
        }),

        /* ================= CLIENT PROFILE ================= */
        getClientProfile: builder.query({
            query: () => "/client/profile",
            providesTags: ["Client"],
        }),

        updateClientProfile: builder.mutation({
            query: (body) => ({
                url: "/client/profile",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Client"],
        }),

        /* ================= BROWSE MODELS ================= */
        getModels: builder.query({
            query: (params) => {
                const qs = new URLSearchParams(params || {}).toString();
                return `/models?${qs}`;
            },
            providesTags: ["Model"],
        }),

        /* ================= FAVORITES ================= */
        getFavorites: builder.query({
            query: () => "/client/favorites",
            providesTags: ["Favorite"],
        }),

        addFavorite: builder.mutation({
            query: (modelId) => ({
                url: "/client/favorites",
                method: "POST",
                body: { modelId },
            }),
            invalidatesTags: ["Favorite"],
        }),

        removeFavorite: builder.mutation({
            query: (modelId) => ({
                url: `/client/favorites/${modelId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Favorite"],
        }),

        /* ================= BOOKINGS ================= */
        getBookings: builder.query({
            query: () => "/client/bookings",
            providesTags: ["Booking"],
        }),

        createBooking: builder.mutation({
            query: (body) => ({
                url: "/client/bookings",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Booking"],
        }),
    }),
});

export const {
    useGetClientsAdminQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useUpdateClientStatusMutation,
    useDeleteClientMutation,
    useGetClientDashboardQuery,
    useGetClientProfileQuery,
    useUpdateClientProfileMutation,
    useGetModelsQuery,
    useGetFavoritesQuery,
    useAddFavoriteMutation,
    useRemoveFavoriteMutation,
    useGetBookingsQuery,
    useCreateBookingMutation,
} = clientApi;
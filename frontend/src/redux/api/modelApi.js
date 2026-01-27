// redux/api/modelApi.js
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

export const modelApi = createApi({
    reducerPath: "modelApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Models", "Portfolio", "Booking", "Earning", "Availability"],
    endpoints: (builder) => ({
        getModels: builder.query({
            query: (params) => {
                const qs = new URLSearchParams(params || {}).toString();
                return `/admin/models?${qs}`;
            },
            providesTags: (result) =>
                result?.models ? [...result.models.map(m => ({ type: "Models", id: m._id })), { type: "Models", id: "LIST" }] : [{ type: "Models", id: "LIST" }]
        }),
        getModel: builder.query({
            query: (id) => `/admin/model/${id}`,
            providesTags: (result, error, id) => [{ type: "Models", id }],
        }),
        createModel: builder.mutation({
            query: (body) => ({ url: "/admin/models", method: "POST", body }),
            invalidatesTags: [{ type: "Models", id: "LIST" }],
        }),
        updateModel: builder.mutation({
            query: ({ id, data }) => ({ url: `/admin/model/${id}`, method: "PUT", body: data }),
            invalidatesTags: (res, err, { id }) => [{ type: "Models", id }, { type: "Models", id: "LIST" }],
        }),
        deleteModel: builder.mutation({
            query: (id) => ({ url: `/admin/model/${id}`, method: "DELETE" }),
            invalidatesTags: [{ type: "Models", id: "LIST" }],
        }),
        saveProfile: builder.mutation({
            query: ({ id, url, public_id, type }) => ({ url: `/admin/model/${id}/save_profile`, method: "PUT", body: { url, public_id, type } }),
            invalidatesTags: (res, err, { id }) => [{ type: "Models", id }],
        }),
        savePortfolio: builder.mutation({
            query: ({ id, images }) => ({ url: `/admin/model/${id}/save_portfolio`, method: "PUT", body: { images } }),
            invalidatesTags: (res, err, { id }) => [{ type: "Models", id }],
        }),
        deletePortfolioImage: builder.mutation({
            query: ({ id, public_id }) => ({ url: `/admin/model/${id}/delete_portfolio_image`, method: "PUT", body: { public_id } }),
            invalidatesTags: (res, err, { id }) => [{ type: "Models", id }],
        }),

        getModelsAdmin: builder.query({
            query: () => "/admin/models",
            providesTags: ["Models"],
        }),

        updateModelStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/admin/models/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["Models"],
        }),

        /* ================= MODEL DASHBOARD ================= */
        getModelDashboard: builder.query({
            query: () => "/model/dashboard",
            providesTags: ["Models"],
        }),

        /* ================= MODEL PROFILE ================= */
        getModelProfile: builder.query({
            query: () => "/model/profile",
            providesTags: ["Models"],
        }),

        updateModelProfile: builder.mutation({
            query: (body) => ({
                url: "/model/profile",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Models"],
        }),

        /* ================= MODEL PORTFOLIO ================= */
        getModelPortfolio: builder.query({
            query: () => "/model/portfolio",
            providesTags: ["Portfolio"],
        }),

        uploadMedia: builder.mutation({
            query: (body) => ({
                url: "/model/portfolio",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Portfolio"],
        }),

        deleteMedia: builder.mutation({
            query: (mediaId) => ({
                url: `/model/portfolio/${mediaId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Portfolio"],
        }),

        /* ================= MODEL BOOKINGS ================= */
        getModelBookings: builder.query({
            query: () => "/model/bookings",
            providesTags: ["Booking"],
        }),

        /* ================= MODEL EARNINGS ================= */
        getModelEarnings: builder.query({
            query: () => "/model/earnings",
            providesTags: ["Earning"],
        }),

        /* ================= MODEL AVAILABILITY ================= */
        getModelAvailability: builder.query({
            query: () => "/model/availability",
            providesTags: ["Availability"],
        }),

        updateModelAvailability: builder.mutation({
            query: (body) => ({
                url: "/model/availability",
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Availability"],
        }),

        /* ================= PUBLIC ================= */
        getPublicModels: builder.query({
            query: (params) => {
                const qs = new URLSearchParams(params || {}).toString();
                return `/models?${qs}`;
            },
            providesTags: ["Models"],
        }),

        getPublicModelBySlug: builder.query({
            query: (slug) => `/model/${slug}`,
            providesTags: (result, error, slug) => [{ type: "Models", id: slug }],
        }),
        getMyReviews: builder.query({
            query: () => "/model/reviews",
        }),

        getMyReports: builder.query({
            query: () => "/model/reports",
        }),
    })
});

export const {
    useGetModelsQuery, useGetModelQuery, useCreateModelMutation, useUpdateModelMutation,
    useDeleteModelMutation, useSaveProfileMutation, useSavePortfolioMutation, useDeletePortfolioImageMutation,
    useGetModelsAdminQuery, useUpdateModelStatusMutation,
    useGetModelDashboardQuery, useGetModelProfileQuery, useUpdateModelProfileMutation,
    useGetModelPortfolioQuery, useUploadMediaMutation, useDeleteMediaMutation,
    useGetModelBookingsQuery, useGetModelEarningsQuery,
    useGetModelAvailabilityQuery, useUpdateModelAvailabilityMutation,
    useGetPublicModelsQuery, useGetPublicModelBySlugQuery, useGetMyReviewsQuery,
    useGetMyReportsQuery,
} = modelApi;
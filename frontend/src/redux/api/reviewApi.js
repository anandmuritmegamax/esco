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

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: baseQueryWithAuth,

    endpoints: (builder) => ({
        getAdminReviews: builder.query({
            query: (status = "all") =>
                status === "all"
                    ? "/admin/reviews"
                    : `/admin/reviews?status=${status}`,
            providesTags: ["Reviews"],
        }),
        approveReview: builder.mutation({
            query: (id) => ({
                url: `/admin/reviews/${id}/approve`,
                method: "PATCH",
            }),
        }),
        rejectReview: builder.mutation({
            query: (id) => ({
                url: `/admin/reviews/${id}/reject`,
                method: "PATCH",
            }),
        }),

    }),
});

export const {
    useGetAdminReviewsQuery,
    useApproveReviewMutation,
    useRejectReviewMutation,
} = reviewApi;

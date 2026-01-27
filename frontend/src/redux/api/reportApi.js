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

export const reportApi = createApi({
    reducerPath: "reportApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Reports"],
    endpoints: (builder) => ({
        getAdminReports: builder.query({
            query: (status = "all") =>
                status === "all"
                    ? "/admin/reports"
                    : `/admin/reports?status=${status}`,
            providesTags: ["Reports"],
        }),
        markReportReviewed: builder.mutation({
            query: (id) => ({
                url: `/admin/reports/${id}/review`,
                method: "PATCH",
            }),
        }),
        rejectReport: builder.mutation({
            query: (id) => ({
                url: `/admin/reports/${id}/reject`,
                method: "PATCH",
            }),
        }),
    }),
});

export const {
    useGetAdminReportsQuery,
    useMarkReportReviewedMutation,
    useRejectReportMutation,
} = reportApi;

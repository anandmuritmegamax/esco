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

export const pagesApi = createApi({
    reducerPath: "pagesApi",
    baseQuery: baseQueryWithAuth,
    tagTypes: ["Pages"],
    endpoints: (builder) => ({
        getPages: builder.query({
            query: () => "/admin/pages",
            providesTags: ["Pages"],
        }),

        createPage: builder.mutation({
            query: (data) => ({
                url: "/admin/pages",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Pages"],
        }),

        updatePage: builder.mutation({
            query: ({ id, data }) => ({
                url: `/admin/pages/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Pages"],
        }),

        deletePage: builder.mutation({
            query: (id) => ({
                url: `/admin/pages/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pages"],
        }),
        getPublicPages: builder.query({
            query: () => "/pages/public",
        }),

        getPageBySlug: builder.query({
            query: (slug) => `/pages/public/${slug}`,
        }),
    }),
});

export const {
    useGetPagesQuery,
    useCreatePageMutation,
    useUpdatePageMutation,
    useDeletePageMutation,
    useGetPublicPagesQuery,
    useGetPageBySlugQuery,
} = pagesApi;

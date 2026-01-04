// redux/api/modelApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const modelApi = createApi({
    reducerPath: "modelApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["Models"],
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
            providesTags: ["Model"],
        }),

        updateModelStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/admin/models/${id}/status`,
                method: "PUT",
                body: { status },
            }),
            invalidatesTags: ["Model"],
        }),
    })
});

export const {
    useGetModelsQuery, useGetModelQuery, useCreateModelMutation, useUpdateModelMutation,
    useDeleteModelMutation, useSaveProfileMutation, useSavePortfolioMutation, useDeletePortfolioImageMutation, useGetModelsAdminQuery, useUpdateModelStatusMutation
} = modelApi;

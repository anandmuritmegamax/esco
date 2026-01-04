import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const masterApi = createApi({
    reducerPath: "masterApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
        credentials: "include",
    }),
    tagTypes: ["Masters"],
    endpoints: (builder) => ({
        getMasters: builder.query({
            query: (type) => `/admin/masters?type=${type}`,
            providesTags: ["Masters"],
        }),

        createMaster: builder.mutation({
            query: (body) => ({
                url: "/admin/masters",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Masters"],
        }),

        updateMaster: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/admin/masters/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Masters"],
        }),

        deleteMaster: builder.mutation({
            query: (id) => ({
                url: `/admin/masters/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Masters"],
        }),
    }),
});

export const {
    useGetMastersQuery,
    useCreateMasterMutation,
    useUpdateMasterMutation,
    useDeleteMasterMutation,
} = masterApi;

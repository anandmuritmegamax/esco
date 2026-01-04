import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clientApi = createApi({
    reducerPath: "clientApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    tagTypes: ["Client"],
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
    }),
});

export const {
    useGetClientsAdminQuery,
    useCreateClientMutation,
    useUpdateClientMutation,
    useUpdateClientStatusMutation,
    useDeleteClientMutation,
} = clientApi;

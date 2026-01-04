import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const pilotApi = createApi({
    reducerPath: "pilotApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (build) => ({
        getPilots: build.query({
            query: () => ({ url: "/admin/pilots", method: "GET" }),
            providesTags: ["Pilot"],
        }),

        createPilot: build.mutation({
            query: (formData) => ({
                url: "/admin/pilots",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Pilot"],
        }),

        updatePilot: build.mutation({
            query: ({ id, formData }) => ({
                url: `/admin/pilots/${id}`,
                method: "PUT",
                body: formData,
            }),
            invalidatesTags: ["Pilot"],
        }),

        deletePilot: build.mutation({
            query: (id) => ({
                url: `/admin/pilots/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Pilot"],
        }),
    }),
});

export const {
    useGetPilotsQuery,
    useCreatePilotMutation,
    useUpdatePilotMutation,
    useDeletePilotMutation,
} = pilotApi;
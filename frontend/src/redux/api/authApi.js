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

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithAuth,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: ({ identifier, password }) => ({
                url: "/login",
                method: "POST",
                body: { identifier, password },
            }),
        }),
        register: builder.mutation({
            query: (body) => ({
                url: "/register",
                method: "POST",
                body,
            }),
        }),
        getProfile: builder.query({
            query: () => "/me",
        }),
        logout: builder.query({
            query: () => "/logout",
        }),
    }),
});

export const { useLoginMutation, useGetProfileQuery, useLazyLogoutQuery, useRegisterMutation } = authApi;
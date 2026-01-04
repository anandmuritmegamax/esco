import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { userApi } from "./userApi";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1"
    }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query(body) {
                return {
                    url: "/register",
                    method: 'POST',
                    body,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        login: builder.mutation({
            query(body) {
                return {
                    url: "/login",
                    method: 'POST',
                    body,
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {
                    console.log(error)
                }
            },
        }),
        logout: builder.query({
            query: () => "/logout",
        }),

        sendOtp: builder.mutation({
            query: (data) => ({
                url: "/send-otp",
                method: "POST",
                body: data, // { email } or { phone }
            }),
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: "/verify-otp",
                method: "POST",
                body: data, // { email/phone, otp }
            }),
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useLazyLogoutQuery, useSendOtpMutation, useVerifyOtpMutation } = authApi;
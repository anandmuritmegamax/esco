import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cloudinaryApi = createApi({
    reducerPath: "cloudinaryApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        getUploadSignature: builder.query({
            query: (folder) => `/cloudinary/signature?folder=${folder}`,
        })
    }),
});

export const { useLazyGetUploadSignatureQuery } = cloudinaryApi;

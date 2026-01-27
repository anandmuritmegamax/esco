import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationApi = createApi({
    reducerPath: "locationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/v1",
    }),
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => "/location/countries",
        }),
    }),
});

export const { useGetCountriesQuery } = locationApi;

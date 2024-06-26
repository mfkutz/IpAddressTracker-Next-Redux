import {  createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const GEO_LOC_API_KEY = process.env.NEXT_PUBLIC_GEO_LOC_API_KEY

export const geoLocApi = createApi({
    reducerPath: "geoLocApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://geo.ipify.org/api/v2/" }),
    endpoints: (builder) => ({  
        getGeoLoc: builder.query({
            query: (ip) => `country,city?apiKey=${GEO_LOC_API_KEY}&ipAddress=${ip}`,
        }),
    }),
})

//exporto el hook generado para la consulta
export const {useGetGeoLocQuery} = geoLocApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const myApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/api/' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query:()  => "show",
    }),
  }),
})

export const { useGetAllUsersQuery } = myApi
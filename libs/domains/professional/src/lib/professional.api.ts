import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RootState } from '@placecare/store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://localhost:3333',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { user } = getState() as RootState

    headers.set('Authorization', `Bearer ${user.token}`)
  }
})

export const professionalApi = createApi({
  reducerPath: 'professionalApi',
  baseQuery,
  endpoints: (builder) => ({
    getProfessional: builder.query<any, string>({
      query: (id) => `/v1/professionals/${id}`
    })
  })
})

export const { useGetProfessionalQuery } = professionalApi
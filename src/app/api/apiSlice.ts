import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { setCredentials, LogOut } from '@/features/auth/authSlice'

import { RootState } from '../store'
import { User } from '@/features/auth/authSlice'


interface RefreshResponse {
    access: string
}

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 403) {
        console.log("sending for refresh token...")
        const refreshResult = await baseQuery('/token/refresh', api, extraOptions)

        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user as User
            const refreshData = refreshResult.data as RefreshResponse
            api.dispatch(setCredentials({ user, accessToken: refreshData.access }))

            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(LogOut())
        }
    }

    return result
}


export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
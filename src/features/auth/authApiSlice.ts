import { apiSlice } from '@/app/api/apiSlice'


interface LoginReq {
    username: string
    password: string
}

interface LoginRes {
    access: string
    refresh: string
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginReq, LoginRes>({
            query: credentials => ({
                url: 'users/token/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
    })
})
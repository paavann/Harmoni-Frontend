import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/app/store'



export interface User {
    name: string
}

interface AuthState {
    user: User | null
    token: string | null
}


const initialState: AuthState = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: User, accessToken: string }>) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        LogOut: (state) => {
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, LogOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
export const selectCurrentToken = (state: RootState) => state.auth.token
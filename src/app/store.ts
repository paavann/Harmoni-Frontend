import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authReducer from '../features/auth/authSlice'
import { loadState, saveState } from './localStorage'
import { throttle } from 'lodash'


const persistedState = loadState()

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    //adding the middleware from implemented rtk query to the default middleware
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
    preloadedState: persistedState,
})

store.subscribe(throttle(() => {
    saveState({
        auth: store.getState().auth
    })
}, 1000))

export type RootState = ReturnType<typeof store.getState>
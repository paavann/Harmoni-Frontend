import React, { useEffect } from 'react'
import { LoginForm } from '@/components/login-form'
import { useLocation, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'
import { setCredentials } from '@/features/auth/authSlice'
import { useLoginMutation } from '@/features/auth/authApiSlice'
import { selectCurrentToken } from '@/features/auth/authSlice'


function Login() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const token = useSelector(selectCurrentToken)

    const [login] = useLoginMutation()

    const handleLogin = async (e: React.FormEvent, email: string, password: string): Promise<void | string> => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials({ user: { email }, accessToken: userData.access }))
            navigate('/')
        } catch (err) {
            const error = err as FetchBaseQueryError | SerializedError

            if ('status' in error) {
                if (!error.status) {
                    throw new Error('No Server Response')
                } else if (error.status === 400) {
                    throw new Error('Missing Email or Password')
                } else {
                    throw new Error('Login Failed')
                }
            }
        }
    }


    useEffect(() => {
        if (token) {
            const from = (location.state as { from?: Location })?.from?.pathname || '/'
            navigate(from, { replace: true })
        }
    }, [token, location, navigate])

    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm onLogin={handleLogin}/>
            </div>
        </div>
    )
}

export default Login
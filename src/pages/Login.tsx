import React from 'react'
import { LoginForm } from '@/components/login-form'
import { useNavigate } from 'react-router-dom'

import api from '@/lib/api'


function Login() {
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent, email: string, password: string): Promise<void> => {
        e.preventDefault()

        try {
            const res = await api.post('users/token/', { email, password })
            localStorage.setItem("access", res.data.access)
            localStorage.setItem("refresh", res.data.refresh)
            navigate('/')
        } catch (err) {
            alert(err)
        }
    }


    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm onLogin={handleLogin}/>
            </div>
        </div>
    )
}

export default Login
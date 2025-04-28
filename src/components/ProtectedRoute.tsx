import { useState, useEffect, ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

import api from '../lib/api'



function ProtectedRoute({ children }: { children: ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

    const refreshToken = async (): Promise<void> => {
        const refreshToken = localStorage.getItem("refresh")

        try {
            const res = await api.post('users/token/refresh', {
                refresh: refreshToken   
            })
            if (res.status === 200) {
                localStorage.setItem("access", res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (err) {
            console.log("error getting access token: ", err)
            setIsAuthorized(false)
        }
    }

    const auth = async (): Promise<void> => {
        const token = localStorage.getItem("access")
        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decodedToken = jwtDecode(token)
        const tokenExp = decodedToken.exp
        const now = Date.now() / 1000

        if (tokenExp && tokenExp < now) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    
    if (isAuthorized === null) {
        return <div>loading...</div>
    }
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    return (
        isAuthorized ? children : <Navigate to='/login' />
    )
}

export default ProtectedRoute
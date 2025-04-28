import axios, { AxiosError } from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use(
    (config) => {
        const token: string | null = localStorage.getItem("access")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (err: AxiosError) => {
        return Promise.reject(err)
    }
)


export default api
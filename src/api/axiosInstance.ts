import { notification } from 'antd'
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.5pix.org',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
})
let cachedSession: Awaited<ReturnType<typeof getSession>> | null = null
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (!cachedSession) {
      cachedSession = await getSession()
    }
    const token = cachedSession?.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 403) {
      console.error('Unauthorized! Redirecting to login...')
      // Add logout logic or redirect to login
      // signOut({ callbackUrl: '/auth/login' })
      // window.location.href = '/auth/login'
      signIn()
    }
    if (error.response?.status === 400) {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: error.response?.data?.message || 'Có lỗi xảy ra',
      })
      window.history.back()
      // window.location.href = '/404'
    }
    if (error.response?.status === 500) {
      notification.error({
        message: 'Có lỗi xảy ra',
        description: error.response?.data?.message || 'Có lỗi xảy ra',
      })
      window.history.back()
    }
    return Promise.reject(error)
  },
)

export const defaultMutator = async <TData>(config: AxiosRequestConfig): Promise<TData> => {
  const response = await axiosInstance.request<TData>(config)
  return response.data
}
export default axiosInstance

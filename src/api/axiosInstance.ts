// src/api/axiosInstance.ts
import { ro } from '@faker-js/faker/.'
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: 'https://dapi.5pix.org', // Replace with your base URL
  timeout: 10000, // Set timeout for requests
  headers: {
    'Content-Type': 'application/json',
    Authorization: '',
  },
})

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Add an Authorization header or other custom logic
    console.log('Headerrrrr:', config.headers)
    const session = await getSession()
    const token = session?.accessToken
    console.log('Token o day ne:', session)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      // config.headers.Authorization = `Bearer ${token}`
    }
    console.log('Requesteee:', config.headers)
    return config
  },
  (error) => {
    // Handle request errors
    console.error('Request Erroreeee:', error)
    return Promise.reject(error)
  },
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('Responseeee:', response)
    return response
  },
  (error) => {
    const router = useRouter()
    // Handle response errors, e.g., token expiration
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...')
      // Add logout logic or redirect to login
      router.push('/auth/login')
    }
    return Promise.reject(error)
  },
)

export const defaultMutator = async <TData>(config: AxiosRequestConfig): Promise<TData> => {
  const response = await axiosInstance.request<TData>(config)
  return response.data // React Query expects only the data, not the full Axios response
}

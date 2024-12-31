// src/api/axiosInstance.ts
import { ro } from '@faker-js/faker/.'
import { w } from '@faker-js/faker/dist/airline-BLb3y-7w'
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { getSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.5pix.org', // Replace with your base URL
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
    const session = await getSession()
    const token = session?.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      // config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Handle request errors
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
    // Handle response errors, e.g., token expiration
    if (error.response?.status === 403) {
      console.error('Unauthorized! Redirecting to login...')
      // Add logout logic or redirect to login
      // signOut({ callbackUrl: '/auth/login' })
      window.location.href = '/auth/login'
    }
    if (error.response?.status === 400) {
      console.error('Unauthorized! Redirecting to login...')
      // Add logout logic or redirect to login
      // signOut({ callbackUrl: '/auth/login' })
      // how to window turn back the page before
      window.history.back()
      // window.location.href = '/404'
    }
    return Promise.reject(error)
  },
)

export const defaultMutator = async <TData>(config: AxiosRequestConfig): Promise<TData> => {
  const response = await axiosInstance.request<TData>(config)
  return response.data // React Query expects only the data, not the full Axios response
}

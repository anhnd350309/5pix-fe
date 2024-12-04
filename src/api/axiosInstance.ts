// src/api/axiosInstance.ts
import { ro } from '@faker-js/faker/.'
import axios, { AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

// Create a custom axios instance
const axiosInstance = axios.create({
  baseURL: 'https://dapi.5pix.org', // Replace with your base URL
  timeout: 10000, // Set timeout for requests
})

// Add request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Add an Authorization header or other custom logic
    const session = await getSession()
    const token = session?.accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('Request:', config)
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
    console.log('Response:', response)
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

export const defaultMutator = async (config: AxiosRequestConfig) => {
  return axiosInstance.request(config)
}

import { Form, Input, Checkbox } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const admin = process.env.NEXT_ENV === 'dev' ? 'admin-dev' : 'admin'
  const merchant = process.env.NEXT_ENV === 'dev' ? 'merchant-dev' : 'merchant'
  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true)
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      })
      if (result?.error) {
        setError(result.error)
      } else {
        const hostname = window.location.hostname
        const subdomain = hostname.split('.')[0]
        if (subdomain === admin || subdomain === merchant) {
          router.push('/home')
        } else {
          router.push('/')
        }
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-full items-center justify-center bg-gradient-to-b from-black to-blue-900'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
        <div className='mb-6 text-center'>
          <img src='/assets/images/Logo.svg' alt='Logo' className='mx-auto h-12' />
          <h2 className='mt-4 text-2xl font-bold text-gray-800'>Đăng nhập</h2>
        </div>
        {error && <p className='text-red-500 mb-4'>Incorrect email or password</p>}
        <Form
          name='loginForm'
          layout='vertical'
          initialValues={{ email: '', password: '', remember: true }}
          onFinish={onSubmit}
          autoComplete='off'
        >
          <Form.Item
            label={<label className='text-sm font-medium text-gray-700'>Tên tài khoản</label>}
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập tên tài khoản!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input
              placeholder='Placeholder'
              className='h-12 rounded-lg border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-blue-500'
            />
          </Form.Item>

          <Form.Item
            label={<label className='text-sm font-medium text-gray-700'>Mật khẩu</label>}
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              placeholder='Password'
              className='h-12 rounded-lg border border-gray-300 px-4 text-sm focus:border-blue-500 focus:ring-blue-500'
            />
          </Form.Item>

          <div className='mb-4 flex items-center justify-between'>
            <Checkbox className='text-sm text-gray-600'>Lưu mật khẩu</Checkbox>
            <Link href='/' className='text-sm text-blue-500 hover:underline'>
              Quên mật khẩu?
            </Link>
          </div>

          <Form.Item>
            <button
              type='submit'
              disabled={isLoading}
              className='w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-blue-400'
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

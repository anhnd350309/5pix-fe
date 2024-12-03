'use client'

import { Form, Input } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { Toaster } from '@/components/ui/toaster'
import { useToast } from '@/hooks/use-toast'
import { useLoginAccessTokenLoginPost } from '@/services/login/login'

import { ClapSpinner } from '../ui/spinners'

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { mutate, status } = useLoginAccessTokenLoginPost()
  const isLoading = status === 'pending'
  const { t } = useTranslation('login')
  const onSubmit = (values: any) => {
    try {
      const loginData = {
        username: values.email,
        password: values.password,
      }
      mutate(
        { data: loginData },
        {
          onSuccess: (data) => {
            console.log('Login success: ', data)
            if (data) {
              router.replace('/')
            }
          },
          onError: (error) => {
            toast({
              title: 'Something went wrong!',
              description: error.response?.data?.detail?.toString(),
            })
            console.log('Login error: ', error.response?.data?.detail)
          },
        },
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Login hehehe: ', error)
    }
  }

  return (
    <Form
      name='loginForm'
      layout='vertical'
      className='mx-auto mt-10 w-full px-4 text-left sm:w-2/3 lg:px-0'
      initialValues={{ email: '', password: '' }}
      onFinish={onSubmit}
      autoComplete='off'
    >
      <Form.Item
        label={
          <label htmlFor='email' className='text-lg font-bold text-white'>
            {t('Email', { ns: 'login' })}
          </label>
        }
        name='email'
        required={false}
        rules={[
          { required: true, message: `${t('Please input your email', { ns: 'login' })}` },
          { type: 'email', message: `${t('Email is invalid', { ns: 'login' })}` },
        ]}
      >
        <Input
          id='email'
          className='placeholder-white-500 mt-2 h-[50px] w-full rounded-lg border border-indigo-600 bg-black p-3 text-lg leading-none text-white'
        />
      </Form.Item>

      <Form.Item
        label={
          <label htmlFor='password' className='text-lg font-bold text-white'>
            {t('Password', { ns: 'login' })}
          </label>
        }
        name='password'
        required={false}
        rules={[
          { required: true, message: `${t('Please input your password!', { ns: 'login' })}` },
        ]}
      >
        <Input
          id='password'
          type='password'
          className='placeholder-white-500 mt-2 h-[50px] w-full rounded-lg border border-indigo-600 bg-black p-3 text-lg leading-none text-white'
        />
      </Form.Item>

      <div className='text-right'>
        <Link href='/' className='text-[15px] text-gray-400 hover:text-gray-100'>
          {t('Forgot your password?', { ns: 'login' })}
        </Link>
      </div>
      <div className='px-4 pt-10'>
        <button
          type='submit'
          disabled={isLoading}
          className='relative block w-full rounded-full bg-indigo-600 p-4 text-lg uppercase text-white hover:bg-indigo-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-indigo-400'
        >
          {true && (
            <div className='absolute left-1/4 top-1/2 -translate-y-1/2'>
              <ClapSpinner size={20} frontColor='#fff' backColor='#fff' />
            </div>
          )}
          {t('Sign in', { ns: 'login' })}
        </button>
      </div>
      <div className='left-0 right-0 mt-16 flex justify-center space-x-4 p-4 text-center lg:hidden '>
        <Link href='/'>
          <svg
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
          >
            <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' />
          </svg>
        </Link>
        <Link href='/'>
          <svg
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
          >
            <path d='M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' />
          </svg>
        </Link>
        <Link href='/'>
          <svg
            fill='#fff'
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
          >
            <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
          </svg>
        </Link>
      </div>

      <Toaster />
    </Form>
  )
}

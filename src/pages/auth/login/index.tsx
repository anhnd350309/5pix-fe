import { Select, Space } from 'antd'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import { LoginForm } from '@/components/auth/LoginForm'

const { Option } = Select

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['login'])),
  },
})

const Login = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { t } = useTranslation('login')

  const handleChangeLanguage = (value: string) => {
    router.replace(router.pathname, undefined, {
      locale: value,
    })
  }

  return (
    <div className='flex h-screen items-center justify-center bg-gradient-to-b from-black to-blue-900'>
      <div className='relative w-full max-w-md rounded-xl p-8 shadow-lg'>
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
export const getLayout = (page: React.ReactNode) => <div>{page}</div>
Login.getLayout = getLayout

// components/withAuth.tsx
import { Spin } from 'antd'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { ComponentType } from 'react'

const withAuth = (WrappedComponent: ComponentType) => {
  return (props: any) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'unauthenticated') {
        signIn()
      }
    }, [status])

    if (status === 'loading') {
      return <Spin />
    }

    if (status === 'authenticated') {
      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAuth

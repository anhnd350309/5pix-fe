// components/withAuth.tsx
import { Spin } from 'antd'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ComponentType } from 'react'
import { UserRole } from '@/schemas/userRole'

type WithAuthProps = {
  requiredRoles?: Array<keyof typeof UserRole>
}

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>,
  { requiredRoles = [] }: WithAuthProps = {},
) => {
  return (props: P) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'unauthenticated') {
        signIn()
        return
      }

      // Kiểm tra role nếu có yêu cầu role cụ thể
      if (status === 'authenticated' && requiredRoles.length > 0) {
        const userRole = session?.role as keyof typeof UserRole

        if (!userRole || !requiredRoles.includes(userRole)) {
          router.replace('/unauthorized')
        }
      }
    }, [status, session, router])

    if (status === 'loading') {
      return <Spin />
    }

    if (status === 'authenticated') {
      // Kiểm tra quyền truy cập dựa trên role
      if (requiredRoles.length > 0) {
        const userRole = session?.role as keyof typeof UserRole

        if (!userRole || !requiredRoles.includes(userRole)) {
          return null
        }
      }

      return <WrappedComponent {...props} />
    }

    return null
  }
}

export default withAuth

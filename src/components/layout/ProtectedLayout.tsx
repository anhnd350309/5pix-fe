import { Spin } from 'antd'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { UserRole } from '@/schemas/userRole'

type Props = {
  children: React.ReactElement
  requiredRoles?: Array<keyof typeof UserRole>
}

export const ProtectedLayout = ({ children, requiredRoles = [] }: Props): JSX.Element => {
  const router = useRouter()
  const { data: session, status: sessionStatus } = useSession()
  const authorized = sessionStatus === 'authenticated'
  const unAuthorized = sessionStatus === 'unauthenticated'
  const loading = sessionStatus === 'loading'

  useEffect(() => {
    // check if the session is loading or the router is not ready
    if (loading || !router.isReady) return
    console.log('ehehehe', window.location.href)
    if (unAuthorized) {
      // router.replace('/auth/login')
      signIn(undefined, { callbackUrl: window.location.href })
      return
    }

    // Kiểm tra role nếu có yêu cầu role cụ thể
    if (authorized && requiredRoles.length > 0) {
      const userRole = session?.role as keyof typeof UserRole

      if (!userRole || !requiredRoles.includes(userRole)) {
        // Redirect đến trang unauthorized nếu không có quyền
        router.replace('/unauthorized')
      }
    }
  }, [loading, unAuthorized, authorized, sessionStatus, router, session, requiredRoles])

  // if the user refresh the page or somehow navigated to the protected page
  if (loading) {
    return (
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Spin size='large' />
      </div>
    )
  }

  // Kiểm tra quyền truy cập dựa trên role
  if (authorized && requiredRoles.length > 0) {
    const userRole = session?.role as keyof typeof UserRole

    if (!userRole || !requiredRoles.includes(userRole)) {
      return <></>
    }
  }

  // if the user is authorized, render the page
  // otherwise, render nothing while the router redirects him to the login page
  return authorized ? <>{children}</> : <></>
}

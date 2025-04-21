import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Button, Result } from 'antd'
import Link from 'next/link'

const Unauthorized = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleGoHome = () => {
    // Chuyển hướng dựa trên role
    if (session?.role === 'admin') {
      router.push('/admin/')
    } else if (session?.role === 'merchant') {
      router.push('/doitac/')
    } else {
      router.push('/')
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Result
        status='403'
        title='403'
        subTitle='Xin lỗi, bạn không có quyền truy cập trang này.'
        extra={
          <div className='flex gap-4'>
            <Button type='primary' onClick={handleGoHome}>
              Trở về trang chủ
            </Button>
            <Button danger onClick={() => signOut()}>
              Đăng xuất
            </Button>
          </div>
        }
      />
    </div>
  )
}

export default Unauthorized

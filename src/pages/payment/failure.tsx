import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

export default function PaymentFailurePage() {
  const router = useRouter()

  return (
    <div className='flex flex-col justify-center items-center bg-red-50 p-4'>
      <div className='bg-white shadow-md rounded-2xl p-8 text-center max-w-md w-full'>
        <h1 className='text-2xl font-bold text-red-600 mb-4'>Thanh toán thất bại!</h1>
        <p className='text-gray-700 mb-6'>
          Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng kiểm tra ở trang cá nhân.
        </p>
        <Button
          onClick={() => router.push('/')}
          className='bg-red-600 hover:bg-red-700 w-full mb-4'
        >
          Về trang chủ
        </Button>
        <Button
          onClick={() => router.push('/personal_info')}
          className='bg-red-600 hover:bg-red-700 w-full'
        >
          Quay lại danh sách đơn hàng
        </Button>
      </div>
    </div>
  )
}

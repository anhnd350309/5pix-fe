import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

export default function PaymentSuccessPage() {
  const router = useRouter()

  return (
    <div className='min-h-screen flex flex-col justify-center items-center bg-green-50 p-4'>
      <div className='bg-white shadow-md rounded-2xl p-8 text-center max-w-md w-full'>
        <h1 className='text-2xl font-bold text-green-600 mb-4'>Thanh toán thành công!</h1>
        <p className='text-gray-700 mb-6'>
          Cảm ơn bạn đã thanh toán. Đơn hàng của bạn đang được xử lý.
        </p>
        <Button onClick={() => router.push('/')} className='bg-green-600 hover:bg-green-700 w-full'>
          Về trang chủ
        </Button>
      </div>
    </div>
  )
}

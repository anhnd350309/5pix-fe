import axiosInstance from '@/api/axiosInstance'
import { LoadingOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function PaymentCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const checkPayment = async () => {
      if (!router.isReady) return

      if (Object.keys(router.query).length === 0) {
        setError('Missing payment information.')
        setChecking(false)
        return
      }

      try {
        console.log('Payment check query:', router.query)
        const res = await axiosInstance.get('/vnpay/check', { params: router.query })
        console.log('Payment check response:', res)
        if (res.data?.RspCode === '00') {
          router.push('/payment/success')
        } else {
          router.push('/payment/failure')
        }
      } catch (err) {
        console.error('Payment check error:', err)
        setError('Something went wrong.')
        setChecking(false)
      }
    }

    checkPayment()
  }, [router.isReady, router.query])

  if (checking) {
    return (
      <div className='flex flex-col items-center justify-center h-96 text-lg font-semibold'>
        <LoadingOutlined spin style={{ fontSize: 32 }} />
        <div className='mt-4'>Đang xác thực thanh toán...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center h-96 text-lg font-semibold text-red-500'>
        {error}
      </div>
    )
  }

  return null
}

import axiosInstance from '@/api/axiosInstance'
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
    return <div>Đang xác thực thanh toán...</div>
  }

  if (error) {
    return <div className='text-red-500'>{error}</div>
  }

  return null
}

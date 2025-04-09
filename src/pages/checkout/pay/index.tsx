import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import CreditSelection from '@/components/credit/Selection'
import { PaymentMethodSelector } from '@/components/credit/PaymentMethodSelector'
import Cart from '@/components/credit/Cart'
import CheckoutInfo from '@/components/common/CheckOut'

// Import components with no SSR to prevent hydration issues
const DashboardStats = dynamic(() => import('@/components/dashboard/DashboardStats'), {
  ssr: false,
})
const CreditStats = dynamic(() => import('@/components/dashboard/CreditStats'), {
  ssr: false,
})

const options = [
  { label: 'Kinh doanh', value: 'business' },
  { label: 'Quản lý credit', value: 'credit' },
]

const Credit = () => {
  return (
    <div
      className='flex flex-wrap '
      style={{ background: 'linear-gradient(to bottom, #FFFFFF, #E1F4FF)' }}
    >
      <div className='w-full xl:w-3/5 lg:px-3 space-y-2 md:space-y-6'>
        <CheckoutInfo />
      </div>
      <div className='w-full xl:w-2/5 lg:px-3 mt-2 md:mt-6 xl:mt-0 xl:sticky xl:top-4 xl:h-fit'>
        <PaymentMethodSelector />
        <div className='mt-4'></div>
        <Cart />
      </div>
    </div>
  )
}

export default Credit

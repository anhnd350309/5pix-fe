import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import ToggleSwitch from '@/components/event/admin/ToggleSwitch'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'

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

const Dashboard = () => {
  const [selected, setSelected] = useState('business')

  return (
    <div className='flex flex-col gap-4 md:p-6 lg:p-8'>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12'>
        <h1 className='text-[#1D2939] text-xl md:text-2xl lg:text-3xl font-semibold'>Tổng quan</h1>
        <ToggleSwitch options={options} selected={selected} onChange={setSelected} />
      </div>

      {/* Content */}
      <div className='rounded-lg bg-white shadow-md md:p-6 lg:p-8'>
        {selected === 'business' ? <DashboardStats /> : <CreditStats />}
      </div>
    </div>
  )
}

export default Dashboard

Dashboard.requireAuth = true
Dashboard.requiredRoles = ['admin', 'merchant']
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
Dashboard.getLayout = getLayout

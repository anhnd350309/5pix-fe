import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import ToggleSwitch from '@/components/event/admin/ToggleSwitch'

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
    <div className='flex flex-col'>
      <div className='flex items-center  gap-12 p-4'>
        <h1 className='text-[#1D2939] text-2xl font-semibold'>Tổng quan</h1>
        <ToggleSwitch options={options} selected={selected} onChange={setSelected} />
      </div>

      <div className=' rounded-lg'>
        {selected === 'business' ? <DashboardStats /> : <CreditStats />}
      </div>
    </div>
  )
}

export default Dashboard
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
Dashboard.getLayout = getLayout

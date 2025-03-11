import React from 'react'
import HeaderAdmin from '@/components/layout/HeaderAdmin'
import Navbar from '@/components/layout/Navbar'
import SEOHead from '../seo'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SEOHead />
      <HeaderAdmin />
      <div className='flex  h-[calc(100vh-80px)]'>
        <div className='w-[200px]'>
          <Navbar />
        </div>
        <div className='bg-white flex-1 w-[calc(100%-200px)]'>
          <div className='bg-[#F9FAFB] rounded-tl-[50px] h-fit p-4'>{children}</div>
        </div>
      </div>
    </>
  )
}

export default Layout

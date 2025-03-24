import React from 'react'
import HeaderAdmin from '@/components/layout/admin/HeaderAdmin'
import NavbarAdmin from '@/components/layout/admin/Navbar'
import SEOHead from '../../seo'

const LayoutAdmin = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SEOHead />
      <HeaderAdmin />
      <div className='flex  h-[calc(100vh-80px)]'>
        <div className='w-[200px]'>
          <NavbarAdmin />
        </div>
        <div className='bg-white flex-1 w-[calc(100%-180px)]'>
          <div className='bg-[#F9FAFB] rounded-tl-[50px] h-fit p-12 w-[98%] mr-auto ml-auto'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default LayoutAdmin

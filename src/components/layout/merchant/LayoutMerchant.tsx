import React from 'react'
import SEOHead from '../../seo'
import NavbarMerchant from './NavbarMerchant'
import HeaderMerchant from './HeaderMerchant'

const LayoutMerchant = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SEOHead />
      <HeaderMerchant />
      <div className='flex flex-col md:flex-row h-[calc(100vh-80px)]'>
        {/* Sidebar */}
        <div className='w-full md:w-[200px]'>
          <NavbarMerchant />
        </div>
        {/* Main Content */}
        <div className='bg-white flex-1 w-full md:w-[calc(100%-200px)]'>
          <div className='bg-[#F9FAFB] rounded-tl-[50px] h-fit p-4 w-[100%] md:w-[90%] mx-auto'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default LayoutMerchant

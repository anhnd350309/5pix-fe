import React from 'react'
import SEOHead from '../../seo'
import NavbarMerchant from './NavbarMerchant'
import HeaderMerchant from './HeaderMerchant'

const LayoutMerchant = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SEOHead />
      <HeaderMerchant />
      <div className='flex  h-[calc(100vh-80px)]'>
        <div className='w-[200px]'>
          <NavbarMerchant />
        </div>
        <div className='bg-white flex-1 w-[calc(100%-200px)]'>
          <div className='bg-[#F9FAFB] rounded-tl-[50px] h-fit p-4 w-[90%] mr-auto ml-auto'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default LayoutMerchant

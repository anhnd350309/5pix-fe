import React from 'react'
import { useRouter } from 'next/router'

import Footer from './Footer'
import Header from './Header'
import ZaloChatWidget from '../common/ZaloChat'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const bgColor = 'white'

  return (
    <>
      {/* {bgColor === 'black' && (
        <div
          className='absolute top-0 left-0 -z-10 w-full h-[400px] bg-cover bg-center'
          style={{ backgroundImage: "url('/assets/images/BG.webp')" }}
        />
      )} */}
      <Header bgColor={bgColor} />
      <div className='bg-gradient-to-b from-white to-[#E1F4FF] font-sans'>{children}</div>

      <ZaloChatWidget />
      <Footer />
    </>
  )
}

export default Layout

export const getDefaultLayout = (page: React.ReactNode) => <Layout>{page}</Layout>

import React from 'react'

import Footer from './Footer'
import Header from './Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
    <div className="absolute top-0 left-0 -z-10 w-full h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/assets/images/BG.png')" }}></div>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout

import React from 'react';
import { useRouter } from 'next/router';

import Footer from './Footer';
import Header from './Header';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const bgColor = router.pathname === '/list_events' ? 'white' : 'black';

  return (
    <>
      {bgColor === 'black' && (
        <div
          className='absolute top-0 left-0 -z-10 w-full h-[400px] bg-cover bg-center'
          style={{ backgroundImage: "url('/assets/images/BG.png')" }}
        />
      )}
      <Header bgColor={bgColor} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;

import React from 'react';
import HeaderAdmin from '@/components/layout/HeaderAdmin';
import Navbar from '@/components/layout/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <HeaderAdmin />
      <div className='flex h-screen'>
        <div className='w-[200px]'>
          <Navbar />
        </div>
        <div className="bg-[#0A347D] flex-1 w-[calc(100%-200px)]">
          <div className="bg-white h-full p-4">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;

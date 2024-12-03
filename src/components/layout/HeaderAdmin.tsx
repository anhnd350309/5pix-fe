import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeaderAdmin = () => {
  return (
    <>
      <header className='h-[80px] w-full bg-[#0A347D] flex justify-between py-4 px-8 items-center'>
        <Link href='/'>
          <Image
            className='h-8 w-auto'
            src='/assets/images/LogoWhite.svg'
            alt='Logo'
            height={30}
            width={100}
          />
        </Link>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <div className="text-emerald-50 flex flex-col items-end">
              <p className="font-bold">Danny Nguyen</p>
              <p>Quản trị viên</p>
            </div>
            <Image
              className='h-8 w-auto border-amber-50 rounded-full cursor-pointer'
              src='/assets/images/AvaDefault.svg'
              alt='Logo'
              height={30}
              width={100}
            />
          </div>
          <svg width="1" height="40" viewBox="0 0 1 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0.5" y1="0.5" x2="0.499998" y2="39.5" stroke="white" stroke-opacity="0.15"
                  stroke-linecap="round" />
          </svg>
          <Image
            className='h-8 w-auto border-amber-50 rounded-full cursor-pointer'
            src='/assets/images/AlertIcon.svg'
            alt='Logo'
            height={20}
            width={50}
          />
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;

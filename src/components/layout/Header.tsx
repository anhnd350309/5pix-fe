import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Link as LinkScroll } from 'react-scroll'

const Header = ({ bgColor }: { bgColor: string }) => {
  const [activeLink, setActiveLink] = useState<string>('')

  return (
    <>
      <header className={`top-0 z-30 w-full bg-transparent transition-all pt-4`}>
        <nav className='container mx-auto grid grid-flow-col px-8 py-3 sm:py-4 xl:px-16 relative z-10'>
          <div className='col-start-1 col-end-2 flex items-center'>
            <Link href='/'>
              <Image
                className='h-8 w-auto'
                src='/assets/images/Logo.svg'
                alt='Logo'
                height={30}
                width={100}
              />
            </Link>
          </div>
          {/* Dynamically set text color based on bgColor */}
          <ul
            className={`col-start-4 col-end-8 hidden items-center ${
              bgColor === 'white' ? 'text-black' : 'text-white'
            } lg:flex`}
          >
            <Link
              href='/'
              prefetch
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'about'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
              onClick={() => {
                setActiveLink('about')
              }}
            >
              Trang chủ
            </Link>
            <Link
              href='/list_events'
              prefetch
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'feature'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
              onClick={() => {
                setActiveLink('feature')
              }}
            >
              Danh sách sự kiện
            </Link>
            <LinkScroll
              activeClass='active'
              to='pricing'
              spy
              smooth
              duration={1000}
              onSetActive={() => {
                setActiveLink('pricing')
              }}
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'pricing'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
            >
              Về 5PIX
            </LinkScroll>
            <LinkScroll
              activeClass='active'
              to='preview'
              spy
              smooth
              duration={1000}
              onSetActive={() => {
                setActiveLink('preview')
              }}
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'preview'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
            >
              Liên Hệ
            </LinkScroll>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default Header

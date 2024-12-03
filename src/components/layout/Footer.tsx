import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div
      className='bg-template-white-300 pb-10 pt-10'
      style={{ backgroundImage: "url('/assets/images/BG.png')" }}
    >
      <div className='container mx-auto grid w-full grid-flow-row grid-cols-3 grid-rows-4 gap-4 px-8 sm:grid-flow-col sm:grid-cols-12 sm:grid-rows-1 xl:px-16'>
        <div className='col-span-12 flex flex-col items-center sm:items-start sm:col-span-4 sm:col-end-6 '>
          <Image
            className='mb-6 h-[80px] w-[180px]'
            src='/assets/images/Logo.svg'
            alt='Logo'
            height={80}
            width={180}
          />
        </div>
        <div className='col-span-12 row-span-2 flex flex-col sm:col-span-2 sm:col-start-7 sm:col-end-10 gap-4'>
          <p className='font-sans text-xl font-bold leading-7 tracking-[0.005em] text-left underline-offset-auto [text-decoration-skip-ink:none]'>
            Contact
          </p>
          <ul className='text-template-black-500 gap-y-4 '>
            <li className='font-sans text-base font-normal leading-6 tracking-[0.002em] text-left underline-offset-auto [text-decoration-skip-ink:none] mb-3'>
              <div className='flex items-center space-x-3'>
                <Image
                  className='h-6 w-6 text-white'
                  src='/assets/icons/template/phone.svg'
                  alt='phone'
                  height={30}
                  width={30}
                />
                <span className='text-sm text-white'>0373 398 986</span>
              </div>
            </li>
            <li className='font-sans text-base font-normal leading-6 tracking-[0.002em] text-left underline-offset-auto [text-decoration-skip-ink:none] mb-3'>
              <div className='flex items-center space-x-3'>
                <Image
                  className='h-6 w-6'
                  src='/assets/icons/template/mail.svg'
                  alt='mail'
                  height={30}
                  width={30}
                />
                <span className='text-sm text-white'>danny@5bib.com</span>
              </div>
            </li>
            <li className='font-sans text-base font-normal leading-6 tracking-[0.002em] text-left underline-offset-auto [text-decoration-skip-ink:none] mb-3'>
              <div className='flex items-center space-x-3'>
                <Image
                  className='h-6 w-6'
                  src='/assets/icons/template/location.svg'
                  alt='location'
                  height={30}
                  width={30}
                />
                <span className='text-sm text-white'>
                  Tầng 9, Hồ Gươm Plaza (tòa văn phòng), Số 102 Trần Phú, Quận Hà Đông, Thành Phố Hà
                  Nội , Việt Nam.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className='col-span-12 flex flex-col sm:col-span-3 sm:col-start-10 sm:col-end-13'>
          <p className='font-sans text-xl font-bold leading-7 tracking-[0.005em] text-left underline-offset-auto [text-decoration-skip-ink:none]'>
            Social media
          </p>
          <div className='-mx-2 mb-8 mt-2 flex w-full'>
            <div className='mx-2 flex items-center justify-center rounded-full bg-template-white-500 p-2 shadow-md'>
              <Link href='https://www.facebook.com/profile.php?id=61569050554470' target='_blank'>
                <Image
                  className='h-6 w-6'
                  src='/assets/icons/template/facebook.svg'
                  alt='facebook'
                  height={30}
                  width={30}
                />
              </Link>
            </div>
            <div className='mx-2 flex items-center justify-center rounded-full bg-template-white-500 p-2 shadow-md'>
              <Image
                className='h-6 w-6'
                src='/assets/icons/template/twitter.svg'
                alt='twitter'
                height={30}
                width={30}
              />
            </div>
            <div className='mx-2 flex items-center justify-center rounded-full bg-template-white-500 p-2 shadow-md'>
              <Image
                className='h-6 w-6'
                src='/assets/icons/template/instagram.svg'
                alt='instagram'
                height={30}
                width={30}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer

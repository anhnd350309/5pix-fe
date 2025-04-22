import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
const Column = ({
  title,
  links,
  className,
}: {
  title: string
  links: Array<{ name: string; href: string }>
  className?: string
}) => {
  return (
    <div className={`lg:mx-auto font-medium ${className}`}>
      <h2 className='uppercase mb-6 text-sm font-semibold dark:text-black text-[#101828]'>
        {title}
      </h2>
      <ul className='space-y-4 text-sm text-[#101828]'>
        {links.map(({ name, href }) => (
          <li key={name}>
            <Link href={href} className='hover:underline'>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
const Footer = () => {
  return (
    <div
      className='bg-white pb-10 pt-10'
      // style={{ backgroundImage: "url('/assets/images/BG.webp')" }}
    >
      <div className='container mx-auto grid w-full grid-flow-row grid-cols-3 grid-rows-4 gap-4 px-8 sm:grid-flow-col sm:grid-cols-12 sm:grid-rows-1 xl:px-16'>
        <div className='col-span-12 flex flex-col items-center sm:items-start sm:col-span-4 sm:col-end-2 '>
          <Image
            className='mb-6 h-[80px] w-[180px]'
            src='/assets/images/Logo.svg'
            alt='Logo'
            height={80}
            width={180}
          />
        </div>
        <div className='col-span-12 row-span-2 flex flex-col sm:col-span-2 sm:col-start-3 sm:col-end-6 gap-4'>
          <Column
            className='col-span-6 md:col-span-2'
            title={'Pháp lý'}
            links={[
              {
                name: 'Quy chế 5bib.com',
                href: `/privacy/quy-che-5bib-com`,
              },
              {
                name: 'Chính sách bảo mật thông tin',
                href: `/privacy/chinh-sach-bao-mat-thong-tin`,
              },
              {
                name: 'Chính sách bảo mật thông tin thanh toán',
                href: `/privacy/chinh-sach-bao-mat-thong-tin-thanh-toan`,
              },
              {
                name: 'Chính sách thanh toán',
                href: `/privacy/chinh-sach-thanh-toan`,
              },
              {
                name: 'Thông tin về chủ sở hữu',
                href: `/privacy/thong-tin-ve-chu-so-huu`,
              },
              {
                name: 'Quy trình giải quyết tranh chấp, khiếu nại',
                href: `/privacy/quy-trinh-giai-quyet-tranh-chap-khieu-nai`,
              },
            ]}
          />
        </div>
        <div className='col-span-12 row-span-2 flex flex-col sm:col-span-2 sm:col-start-7 sm:col-end-10 gap-4'>
          <p className='font-sans text-xl font-bold leading-7 tracking-[0.005em] text-left underline-offset-auto [text-decoration-skip-ink:none] text-gray-800'>
            Contact
          </p>
          <ul className='text-template-black-500 gap-y-4 '>
            <li className='font-sans text-base font-normal leading-6 tracking-[0.002em] text-left underline-offset-auto [text-decoration-skip-ink:none] mb-3'>
              <div className='flex items-center space-x-3'>
                <Image
                  className='h-6 w-6 text-gray-800'
                  src='/assets/icons/template/phone.svg'
                  alt='phone'
                  height={30}
                  width={30}
                />
                <span className='text-sm text-gray-800'>098 6587 345</span>
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
                <span className='text-sm text-gray-800'>danny@5bib.com</span>
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
                <span className='text-sm text-gray-800'>
                  Tầng 9, Hồ Gươm Plaza (tòa văn phòng), Số 102 Trần Phú, Quận Hà Đông, Thành Phố Hà
                  Nội , Việt Nam.
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div className='col-span-12 flex flex-col sm:col-span-3 sm:col-start-10 sm:col-end-13'>
          <p className='font-sans text-xl font-bold leading-7 tracking-[0.005em] text-left underline-offset-auto [text-decoration-skip-ink:none] text-gray-800'>
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
              <Link href='https://www.tiktok.com/@_whynotdanny_' target='_blank'>
                <Image
                  className='h-6 w-6'
                  src='/assets/icons/template/tiktok.svg'
                  alt='tiktok'
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

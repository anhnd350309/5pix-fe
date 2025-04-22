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
    <div className='bg-white pb-10 pt-10'>
      <div className='mx-auto grid w-full grid-flow-row grid-cols-3 grid-rows-5 gap-4 px-8 sm:grid-flow-col sm:grid-cols-12 sm:grid-rows-1 xl:px-16'>
        {/* Logo + Info */}
        <div className='col-span-12 flex flex-col items-center sm:items-start sm:col-span-4 sm:col-end-4'>
          <Image
            className='mb-6 h-[80px] w-[180px]'
            src='/assets/images/Logo.svg'
            alt='Logo'
            height={80}
            width={180}
          />
          <div className='my-4 font-light text-sm space-y-2'>
            <p>
              <span className='font-bold'>{'Địa chỉ'}</span>: Tầng 9, Hồ Gươm Plaza (tòa văn phòng),
              Số 102 Trần Phú, Quận Hà Đông, Thành Phố Hà Nội , Việt Nam.
            </p>
            <p>
              <span className='font-bold'>{'Mã thuế'}</span>: 0110398986
            </p>
            <p>
              <span className='font-bold'>{'Ngày cấp'}</span>: 26/06/2023
            </p>
            <p>
              <span className='font-bold'>{'Nơi cấp'}</span>: Sở Kế hoạch và Đầu tư Thành phố Hà Nội
            </p>
            <p>
              <span className='font-bold'>Email</span>:{' '}
              <Link href='mailto:info@5bib.com' className='hover:underline'>
                info@5bib.com
              </Link>
            </p>
            <p>
              <span className='font-bold'>{'phone'}</span>:{' '}
              <Link href='tel:+84373398986' className='hover:underline'>
                0373398986
              </Link>
            </p>
          </div>
        </div>

        {/* Column - Pháp lý */}
        <div className='col-span-12 row-span-2 flex flex-col sm:col-span-2 sm:col-start-4 sm:col-end-7 gap-4'>
          <Column
            className='col-span-6 md:col-span-2'
            title={'Pháp lý'}
            links={[
              { name: 'Quy chế 5pix.com', href: `/privacy/quy-che-5bib-com` },
              {
                name: 'Chính sách bảo mật thông tin',
                href: `/privacy/chinh-sach-bao-mat-thong-tin`,
              },
              {
                name: 'Chính sách bảo mật thông tin thanh toán',
                href: `/privacy/chinh-sach-bao-mat-thong-tin-thanh-toan`,
              },
              { name: 'Chính sách thanh toán', href: `/privacy/chinh-sach-thanh-toan` },
              { name: 'Thông tin về chủ sở hữu', href: `/privacy/thong-tin-ve-chu-so-huu` },
              {
                name: 'Quy trình giải quyết tranh chấp, khiếu nại',
                href: `/privacy/quy-trinh-giai-quyet-tranh-chap-khieu-nai`,
              },
            ]}
          />
        </div>

        {/* Contact */}
        <div className='col-span-12 row-span-2 flex flex-col sm:col-span-2 sm:col-start-7 sm:col-end-10 gap-4'>
          <p className='font-sans text-xl font-bold leading-7 tracking-[0.005em] text-left underline-offset-auto text-gray-800'>
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

        {/* Social Media - Di chuyển ra cuối */}
        <div className='col-span-12 flex flex-col sm:col-span-3 sm:col-start-10 sm:col-end-13'>
          <p className='font-sans text-xl font-bold leading-7 tracking-[0.005em] text-left underline-offset-auto text-gray-800'>
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

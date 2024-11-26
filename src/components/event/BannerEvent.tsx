import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import SvgDate from '../icons/icons/Date'
import SvgImage from '../icons/icons/Image'
import SvgSearch from '../icons/icons/Search'

export const BannerEvent: React.FC = () => {
  return (
    <div className='flex flex-col items-start bg-gradient-to-r  p-6 rounded-lg text-white max-w-4xl mx-auto gap-8'>
      {/* Banner */}
      <div className='flex items-center gap-4 w-full'>
        <div className='relative w-1/2 max-w-sm aspect-video'>
          <Image
            src='/assets/images/event.png'
            alt='Tà Năng Trail Challenge 2025'
            fill
            className='rounded-md object-cover'
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-bold'>Tà Năng Trail Challenge 2025</h1>
          <div className='flex items-center gap-6 text-gray-300'>
            <div className='flex items-center gap-1'>
              <SvgDate width={16} />
              <span>10 Jun 2023</span>
            </div>
            <div className='flex items-center gap-1'>
              <SvgImage width={16} />
              <span>50.000 Ảnh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className='flex flex-col sm:flex-row p-2 items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:bg-white shadow rounded-full'>
        <div className='flex flex-col sm:flex-row w-full sm:w-auto gap-4'>
          <div className='flex bg-white w-full sm:w-80 border-l-2 rounded-full sm:rounded'>
            <Input
              placeholder='Nhập số BIB'
              className='w-full sm:w-64 !ml-0 border-none !important'
            />
          </div>
          <div className='flex flex-1 w-full sm:w-auto gap-1'>
            <Button className='bg-blue-500 w-3/4 sm:w-[200px] text-white flex items-center rounded-full'>
              <SvgSearch width={16} stroke='white' /> Tìm ảnh
            </Button>
            <Button className='bg-blue-100 w-full sm:w-[220px] text-blue-600 flex items-center rounded-full'>
              <SvgImage width={16} stroke='#2563EB' /> Tìm kiếm bằng hình ảnh
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

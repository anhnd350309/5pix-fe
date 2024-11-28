import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { GetPubAlbumsGetParams } from '@/schemas'
import { useGetPubAlbumsGet } from '@/services/public-album/public-album'

import { ListEvents } from '../event/ListEvents'
import EventCard from '../shared/EventCard'
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '@/components/ui/dialog'

const Hero = () => {
  const { t } = useTranslation('common')

  const params2: GetPubAlbumsGetParams = {
    page: 1,
    page_size: 1,
    highlight: true,
  }
  const { data: data2, error: error2, isLoading: isLoading2 } = useGetPubAlbumsGet(params2)

  if (isLoading2) return <div>Loading...</div>
  if (error2) return <div>Error</div>

  const eventHighlights = data2?.data.data

  return (
    <div className='flex flex-col space-y-5 mt-4 px-8 xl:px-16 center sm:mx-16' id='about'>
      <div className='flex flex-col justify-center items-center space-y-5 row-start-2 sm:row-start-1'>
        <h1 className='font-bold text-3xl text-center text-white lg:text-4xl xl:text-5xl leading-normal'>
          {t('Nhiếp ảnh')}
          <br /> {t('mang lại trải nghiệm khác biệt')}
        </h1>
        <div className='flex flex-col sm:flex-row p-2 items-center space-y-4 sm:space-y-0 sm:space-x-4 sm:bg-white shadow rounded-full'>
          <Select>
            <SelectTrigger className='bg-white border-none rounded-full w-full text-center'>
              <span className='text-gray-700'>GIẢI CHẠY VIỆT NAM FAMILY MARATHON...</span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='1'>Option 1</SelectItem>
              <SelectItem value='2'>Option 2</SelectItem>
              <SelectItem value='3'>Option 3</SelectItem>
            </SelectContent>
          </Select>
          <div className='flex flex-1 w-full sm:w-auto'>
            <div className='flex bg-white w-full sm:w-64 border-l-2 rounded-full sm:rounded'>
              <Input
                placeholder='Nhập số BIB'
                className='w-full sm:w-48 !ml-0 border-none !important'
              />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#98A2B3" />
                    <path
                      d="M30 8H10C9.46957 8 8.96086 8.21071 8.58579 8.58579C8.21071 8.96086 8 9.46957 8 10V30C8 30.5304 8.21071 31.0391 8.58579 31.4142C8.96086 31.7893 9.46957 32 10 32H30C30.5304 32 31.0391 31.7893 31.4142 31.4142C31.7893 31.0391 32 30.5304 32 30V10C32 9.46957 31.7893 8.96086 31.4142 8.58579C31.0391 8.21071 30.5304 8 30 8Z"
                      stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M32 28.3333L24.6667 21.6667L18 27.6667L13.3333 23.6667L8 27.6667M16 19.6667C16.8841 19.6667 17.7319 19.3155 18.357 18.6904C18.9821 18.0652 19.3333 17.2174 19.3333 16.3333C19.3333 15.4493 18.9821 14.6014 18.357 13.9763C17.7319 13.3512 16.8841 13 16 13C15.1159 13 14.2681 13.3512 13.643 13.9763C13.0179 14.6014 12.6667 15.4493 12.6667 16.3333C12.6667 17.2174 13.0179 18.0652 13.643 18.6904C14.2681 19.3155 15.1159 19.6667 16 19.6667Z"
                      stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <rect x="22" y="5" width="14" height="14" rx="7" fill="#2563EB" />
                    <path
                      d="M27.9247 16H30.0713C30.3664 16 30.6079 15.7141 30.6079 15.3647V12.1882H31.4612C31.9388 12.1882 32.1803 11.5021 31.8422 11.1018L29.379 8.18579C29.3294 8.1269 29.2704 8.08017 29.2055 8.04829C29.1405 8.01641 29.0709 8 29.0007 8C28.9304 8 28.8608 8.01641 28.7959 8.04829C28.7309 8.08017 28.672 8.1269 28.6223 8.18579L26.1591 11.1018C25.821 11.5021 26.0571 12.1882 26.5348 12.1882H27.388V15.3647C27.388 15.7141 27.6295 16 27.9247 16Z"
                      fill="white" />
                  </svg>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <div className='text-center text-2xl font-bold'>Tìm kiếm bằng gương mặt</div>
                <div className='text-center text-sm'>Hãy chọn ảnh rõ mặt để kết quả tìm kiếm được chính xác nhất</div>
                <div className='border flex flex-col p-10 items-center gap-4'>
                  <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d='M22 100L73 52L97 76M22 100H82C91.9411 100 100 91.9411 100 82V52M22 100C12.0589 100 4 91.9411 4 82V22C4 12.0589 12.0589 4 22 4H61M76 16.2129L88.2713 4M88.2713 4L100 15.6608M88.2713 4V34M40 31C40 35.9706 35.9706 40 31 40C26.0294 40 22 35.9706 22 31C22 26.0294 26.0294 22 31 22C35.9706 22 40 26.0294 40 31Z'
                      stroke='black' stroke-width='8' stroke-linecap='round' stroke-linejoin='round' />
                  </svg>
                  <div className='text-sm font-bold text-center'>Kéo thả ảnh vào hoặc</div>
                  <Button className='w-28 bg-[#2563EB] rounded-full'>
                    Chọn tệp tải lên
                  </Button>
                </div>
                <Input id="picture" type="file" />
                <div className="text-center text-sm">JPEG, JPG, PNG / Dung lượng tối đa 10MB / Kích thước tối thiếu
                  200px x 200px
                </div>
              </DialogContent>
            </Dialog>
            <Button className="bg-blue-500 w-full sm:w-[200px] text-white flex items-center rounded-full">
              Tìm ảnh
            </Button>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center w-full">
      <Carousel
          opts={{
            align: 'start',
          }}
          className='w-[90%]'
        >
          <CarouselContent>
            {eventHighlights?.map((event) => (
              <CarouselItem key={event.id} className='md:basis-1/1 lg:basis-1/3'>
                <div className='p-1'>
                  <Link href={`/events/${event.id}`} prefetch>
                    <EventCard
                      key={event.id}
                      title={event.album_name}
                      date={event.event_date}
                      imageCount={event.total_image ?? 0}
                      imageUrl={event.album_image_url}
                    />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <ListEvents />
    </div>
  )
}

export default Hero

import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import {
  AlbumItemResponsePublic,
  GetPubAlbumsGetParams,
  ImageSearchType,
  PageAlbumImageItemResponsePublic,
} from '@/schemas'
import { getPubAlbumsGet } from '@/services/public-album/public-album'
import { useRouter } from 'next/router'
import { ListEvents } from '../event/ListEvents'
import EventCard from '../shared/EventCard'
import UploadImageComponent from '@/components/common/UploadImageComponent'
import { searchPubImagesPost } from '@/services/public-images/public-images'
import { Spin } from 'antd'

const Hero = () => {
  const { t } = useTranslation('common')
  const [albumId, setAlbumId] = useState('1') // Default to the first option
  const [bibNumber, setBibNumber] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [eventHighlights, setEventHighlights] = useState<AlbumItemResponsePublic[]>([])
  const [searchResults, setSearchResults] = useState<PageAlbumImageItemResponsePublic | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    console.log('Component mounted: slide')
  }, [])
  const params: GetPubAlbumsGetParams = {
    page: 1,
    page_size: 10,
    highlight: true,
  }

  useEffect(() => {
    const fetchEventHighlights = async () => {
      setIsLoading(true)
      try {
        const response = await getPubAlbumsGet(params)
        setEventHighlights(response.data.data || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetchEventHighlights()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert('Please upload an image!')
      return
    }

    const body = {
      avatar_file: selectedFile,
    }
    const params = {
      album_id: parseInt(albumId),
      bib_number: bibNumber,
      search_type: ImageSearchType.all,
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }

    try {
      const response = await searchPubImagesPost(body, params)
      setSearchResults(response.data) // Update state with search results
      alert('Search successful!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('An error occurred. Please try again.')
    }
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spin />
      </div>
    )
  }
  if (error) {
    router.push('/404') // Redirect to 404 page
    return null
  }

  const displayItems = searchResults?.data || eventHighlights

  return (
    <div className='flex flex-col space-y-5 sm:mx-16 mt-4 px-8 xl:px-16 center' id='about'>
      <div className='flex flex-col justify-center items-center space-y-5 row-start-2 sm:row-start-1'>
        <h1 className='font-bold text-3xl text-center text-white lg:text-4xl xl:text-5xl leading-normal'>
          {t('Nhiếp ảnh')}
          <br /> {t('mang lại trải nghiệm khác biệt')}
        </h1>
        <div className='flex sm:flex-row flex-col items-center sm:space-x-4 space-y-4 sm:space-y-0 sm:bg-white shadow p-2 rounded-full'>
          <Select onValueChange={(value: string) => setAlbumId(value)}>
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
            <div className='flex bg-white border-l-2 rounded-full sm:rounded w-full sm:w-64'>
              <Input
                placeholder='Nhập số BIB'
                value={bibNumber}
                onChange={(e) => setBibNumber(e.target.value)}
                className='!ml-0 border-none w-full sm:w-48'
              />
            </div>
            {/*<Dialog>*/}
            {/*  <DialogTrigger asChild>*/}
            {/*    <img*/}
            {/*      src='/assets/icons/template/search_by_image.svg'*/}
            {/*      className='mr-2 w-auto'*/}
            {/*      alt=''*/}
            {/*    />*/}
            {/*  </DialogTrigger>*/}
            {/*  <DialogContent className='sm:max-w-[700px]'>*/}
            {/*    <UploadImageComponent onFileChange={handleFileChange} />*/}
            {/*  </DialogContent>*/}
            {/*</Dialog>*/}
            <Button
              className='flex items-center bg-blue-500 rounded-full w-full sm:w-[200px] text-white'
              onClick={handleSubmit}
            >
              Tìm ảnh
            </Button>
          </div>
        </div>
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
                  <Link href={`/events/${event.id}`}>
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
      <h2 className='m-4 font-bold text-3xl text-center'>Danh sách sự kiện</h2>
      <ListEvents />
    </div>
  )
}

export default Hero

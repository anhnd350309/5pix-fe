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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'
import {
  AlbumItemResponsePublic,
  GetPubAlbumsGetParams,
  PageAlbumImageItemResponsePublic,
} from '@/schemas'
import { getPubAlbumsGet } from '@/services/public-album/public-album'
import { useRouter } from 'next/router'
import { ListEvents } from '../event/ListEvents'
import EventCard from '../shared/EventCard'
import { Spin } from 'antd'

const Hero = () => {
  const { t } = useTranslation('common')
  const [albumId, setAlbumId] = useState('') // Default to the first option
  const [bibNumber, setBibNumber] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [eventHighlights, setEventHighlights] = useState<AlbumItemResponsePublic[]>([])
  const [events, setEvents] = useState<AlbumItemResponsePublic[]>([])
  const [searchResults, setSearchResults] = useState<PageAlbumImageItemResponsePublic | null>(null)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    console.log('Component mounted: slide')
  }, [])
  const params: GetPubAlbumsGetParams = {
    page: 1,
    page_size: 1000,
    highlight: false,
  }

  useEffect(() => {
    // const fetchEventHighlights = async () => {
    //   setIsLoading(true)
    //   try {
    //     const response = await getPubAlbumsGet(params)
    //     setEventHighlights(response.data || [])
    //     setError(null)
    //   } catch (err: any) {
    //     setError(err.message || 'Something went wrong')
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }
    const fetchALlEvents = async () => {
      setIsLoading(true)
      try {
        const response = await getPubAlbumsGet(params)
        setEvents(response.data || [])
        // filter highlight events
        const highlightEvents = response.data?.filter((event) => event.is_highlight)
        setEventHighlights(highlightEvents || [])
        setError(null)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }
    fetchALlEvents()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async () => {
    if (!albumId) {
      alert('Please select an event!')
      return
    }
    if (!bibNumber) {
      router.push(`/events/${albumId}`)
      return
    }
    router.push(`/events/${albumId}?bib_number=${bibNumber}`)
    // if (!selectedFile) {
    //   alert('Please upload an image!')
    //   return
    // }

    // const body = {
    //   avatar_file: selectedFile,
    // }
    // const params = {
    //   album_id: parseInt(albumId),
    //   bib_number: bibNumber,
    //   search_type: ImageSearchType.all,
    //   page_size: 100,
    //   page: 1,
    //   sort_by: 'id',
    //   order: 'desc',
    // }

    // try {
    //   const response = await searchPubImagesPost(body, params)
    //   setSearchResults(response) // Update state with search results
    //   alert('Search successful!')
    // } catch (error) {
    //   console.error('Error submitting form:', error)
    //   alert('An error occurred. Please try again.')
    // }
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
      <div className='flex flex-col justify-center items-center space-y-5 row-start-1'>
        <h1 className='text-center font-extrabold text-4xl md:text-5xl'>
          Nhiếp ảnh
          <br /> mang lại trải nghiệm khác biệt
        </h1>
        <div className='flex sm:flex-row flex-col items-center sm:space-x-4 space-y-4 sm:space-y-0 sm:bg-white shadow p-2 rounded-full'>
          <Select onValueChange={(value: string) => setAlbumId(value)}>
            <SelectTrigger className='bg-white border-none rounded-full text-center !w-[300px]'>
              <SelectValue placeholder='Tìm kiếm giải chạy' />
              {/* <span className='text-gray-700'>Tìm kiếm giải chạy</span> */}
            </SelectTrigger>
            <SelectContent>
              {events.map((event, index) => (
                <SelectItem key={index} value={event.id.toString()}>
                  {event.album_name}
                </SelectItem>
              ))}
              {/* <SelectItem value='1'>Option 1</SelectItem>
              <SelectItem value='2'>Option 2</SelectItem>
              <SelectItem value='3'>Option 3</SelectItem> */}
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
          className='w-[80%]'
        >
          <CarouselContent>
            {eventHighlights?.map((event) => (
              <CarouselItem key={event.id} className='md:basis-1/1 lg:basis-[33.4%]'>
                <div className='p-1'>
                  <Link href={`/events/${event.album_slug ? event.album_slug : event.id}`}>
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

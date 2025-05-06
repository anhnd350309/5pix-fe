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
  AlbumItemResponsePublic,
  GetPubAlbumsGetParams,
  PageAlbumImageItemResponsePublic,
} from '@/schemas'
import { getPubAlbumsGet } from '@/services/public-album/public-album'
import { useRouter } from 'next/router'
import { ListEvents } from '../event/ListEvents'
import EventCard from '../shared/EventCard'
import { Spin } from 'antd'
import { normalizeString } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { SearchOutlined } from '@ant-design/icons'
import SvgStar from '../icons/icons/Star'

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
    <div
      className='flex flex-col space-y-5 sm:mx-16 mt-4 px-8 xl:px-16 center font-sans justify-center items-center'
      id='about'
    >
      <div className='flex flex-col sm:flex-row h-fit justify-between items-start max-w-[99%] sm:max-w-[80%] gap-4'>
        <div className='flex flex-col justify-start items-start space-y-5 w-full sm:w-1/2'>
          <h1 className='text-4xl sm:text-5xl font-bold sm:mx-5 text-center sm:text-left'>
            Nhiếp ảnh mang lại
            <br /> trải nghiệm khác biệt
          </h1>
          <div className='flex flex-col space-y-4 w-full'>
            <div className='flex flex-1  bg-white items-center justify-center w-full'>
              <div className='flex rounded-full shadow  py-1 w-full mx-5'>
                <Input
                  placeholder='Tìm sự kiện, album'
                  value={bibNumber}
                  onChange={(e) => setBibNumber(e.target.value)}
                  className='!ml-0 border-none w-full '
                />
                <Button
                  className='flex items-center justify-center bg-[#2563EB] rounded-full text-white mx-2 w-36'
                  onClick={handleSubmit}
                >
                  <SearchOutlined />
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className='w-full sm:w-1/2 px-10'>
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000, // 5 seconds
                stopOnInteraction: false,
              }),
            ]}
            className='w-full h-[250px]'
          >
            <CarouselContent className='h-full'>
              {[1, 2, 3].map((item, index) => (
                <CarouselItem key={index} className='flex justify-center h-full'>
                  <img
                    src={`/assets/images/main${item}.jpg`}
                    alt={`Banner ${item}`}
                    className='rounded-lg object-cover w-full h-[250px] '
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
      <Carousel
        opts={{
          align: 'start',
        }}
        className='md:max-w-[1130px] max-w-[93%] mx-auto'
      >
        <CarouselContent className='flex gap-5 p-0 mx-0'>
          {eventHighlights?.map((event) => (
            <CarouselItem key={event.id} className='lg:basis-[calc((100%-2rem)/3)] p-0'>
              <div className=' relative w-[350px]'>
                <Link
                  href={`/events/${event.album_slug ? normalizeString(event.album_slug) : event.id}`}
                  className='h-[225px] w-[350px]'
                >
                  <EventCard
                    key={event.id}
                    title={event.album_name}
                    date={event.event_date}
                    imageCount={event.total_image ?? 0}
                    imageUrl={event.album_image_url}
                  />
                  <div className='absolute top-0 right-10'>
                    <SvgStar width={40} />
                  </div>
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <h2 className='m-4 font-bold text-3xl text-center'>Danh sách sự kiện</h2>
      <ListEvents />
    </div>
  )
}

export default Hero

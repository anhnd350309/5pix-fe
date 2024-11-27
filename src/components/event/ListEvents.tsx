import { Spin } from 'antd'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { AlbumItemResponsePublic, GetPubAlbumsGetParams } from '@/schemas'
import { useGetPubAlbumsGet } from '@/services/public-album/public-album'

import EventCard from '../shared/EventCard'

export const ListEvents: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loadedEvents, setLoadedEvents] = useState<AlbumItemResponsePublic[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const params: GetPubAlbumsGetParams = {
    page: currentPage,
    page_size: 1,
  }
  const { data, error, isLoading } = useGetPubAlbumsGet(params)
  useEffect(() => {
    if (data) {
      setLoadedEvents((prevEvents) => [...prevEvents, ...data.data.data])
      setIsLoadingMore(false)
    }
  }, [data])
  if (isLoading && currentPage === 1) return <Spin />
  if (error) return <div>Error</div>
  const totalEvents = data?.data.metadata.total_items
  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setCurrentPage((prevPage) => prevPage + 1)
  }
  return (
    <div className=''>
      <h2 className='m-4 font-bold text-3xl text-center'>Danh sách sự kiện</h2>
      <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {loadedEvents?.map((event) => (
          <Link href={`/events/${event.id}`} key={event.id} prefetch>
            <EventCard
              key={event.id}
              title={event.album_name}
              date={event.event_date}
              imageCount={event.total_image ?? 0}
              imageUrl={event.album_image_url}
            />
          </Link>
        ))}
      </div>
      {loadedEvents.length < (totalEvents ?? 0) && (
        <div className='flex justify-center mt-4 border-blue-500'>
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            className='bg-transparent hover:bg-blue-500 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
          >
            {isLoadingMore ? <Spin className='mr-2' /> : 'Xem thêm'}
          </Button>
        </div>
      )}
    </div>
  )
}

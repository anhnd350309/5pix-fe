import { Spin } from 'antd'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { AlbumItemResponsePublic, GetPubAlbumsGetParams } from '@/schemas'
import { getPubAlbumsGet } from '@/services/public-album/public-album'

import EventCard from '../shared/EventCard'
import { normalizeString } from '@/lib/utils'

export const ListEvents: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loadedEvents, setLoadedEvents] = useState<AlbumItemResponsePublic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalEvents, setTotalEvents] = useState<number | null>(null)

  const params: GetPubAlbumsGetParams = {
    page: currentPage,
    page_size: 9,
  }

  useEffect(() => {
    const fetchEvents = async () => {
      if (currentPage === 1) setIsLoading(true)
      setError(null)

      try {
        const response = await getPubAlbumsGet(params)
        const newEvents = response.data
        setLoadedEvents((prevEvents) => [...prevEvents, ...newEvents])
        setTotalEvents(response.metadata.total_items)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    }

    fetchEvents()
  }, [currentPage])

  if (isLoading && currentPage === 1) return <Spin />
  if (error) return <div>Error: {error}</div>

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setCurrentPage((prevPage) => prevPage + 1)
  }
  return (
    <div className='pb-8 flex flex-col items-center'>
      <div className='grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {loadedEvents?.map((event) => (
          <Link
            href={`/events/${event.album_slug ? normalizeString(event.album_slug) : event.id}`}
            key={event.id}
            style={{ width: 'fit-content' }}
          >
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

import React, { useEffect, useState } from 'react'
import { Button, Input, Spin } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { AlbumItemResponsePublic, GetPubAlbumsGetParams } from '@/schemas'
import Link from 'next/link'
import EventCardAdmin from '@/components/shared/EvenCardAdmin'
import { getAlbumsGet } from '@/services/album/album'
interface AllEventsAdminProps {
  // setIsModalUpdate?: void
  setIsModalUpdate: (visible: boolean) => void
  setEvent?: any
}

const AllEventsAdmin: React.FC<AllEventsAdminProps> = ({ setIsModalUpdate, setEvent }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loadedEvents, setLoadedEvents] = useState<AlbumItemResponsePublic[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalEvents, setTotalEvents] = useState<number | null>(null)

  const params: GetPubAlbumsGetParams = {
    page: currentPage,
    page_size: 10,
  }

  useEffect(() => {
    const fetchEvents = async () => {
      if (currentPage === 1) setIsLoading(true)
      setError(null)

      try {
        const response = await getAlbumsGet(params)
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
    <div>
      <Input size='large' placeholder='Mã sự kiện, tên sự kiện' prefix={<SearchOutlined />} />
      <div className='flex flex-col gap-4 py-4'>
        {loadedEvents?.map((event) => (
          <div className='relative'>
            <Link href={`/admin/events/${event.id}`} key={event.id}>
              <EventCardAdmin
                key={event.id}
                title={event.album_name}
                date={event.event_date}
                imageCount={event.total_image ?? 0}
                imageUrl={event.album_image_url}
              />
            </Link>
            <Button
              size='large'
              className='bg-[#0A347D] text-emerald-50 font-bold absolute right-0 top-0'
              onClick={() => {
                setEvent(event)
                setIsModalUpdate(true)
              }}
            >
              Chỉnh sửa
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllEventsAdmin

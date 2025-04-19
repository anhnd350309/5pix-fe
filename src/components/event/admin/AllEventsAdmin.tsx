import React, { useEffect, useState } from 'react'
import { Button, Input, Spin, Dropdown, Menu } from 'antd'
import { EditOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons'
import { AlbumItemResponse, GetPubAlbumsGetParams } from '@/schemas'
import Link from 'next/link'
import EventCardAdmin from '@/components/shared/EvenCardAdmin'
import { getAlbumsGet } from '@/services/album/album'

interface AllEventsAdminProps {
  setIsModalUpdate: (visible: boolean) => void
  setEvent?: any
  currentPage: number
  setCurrentPage: (page: any) => void
}

const AllEventsAdmin: React.FC<AllEventsAdminProps> = ({
  setIsModalUpdate,
  setEvent,
  currentPage,
  setCurrentPage,
}) => {
  const [loadedEvents, setLoadedEvents] = useState<AlbumItemResponse[]>([])
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
    setCurrentPage((prevPage: number) => prevPage + 1)
  }

  return (
    <div className=''>
      {/* Search Input */}
      <Input
        size='large'
        placeholder='Mã sự kiện, tên sự kiện'
        prefix={<SearchOutlined />}
        className='w-full sm:w-1/2 mb-4'
      />

      {/* Events List */}
      <div className='flex flex-col gap-4 py-4'>
        {loadedEvents?.map((event) => (
          <div className='relative bg-white shadow-md rounded-lg '>
            <Link href={`/events/${event.id}`} key={event.id}>
              <EventCardAdmin
                key={event.id}
                title={event.album_name}
                date={event.event_date}
                imageCount={event.total_image ?? 0}
                imageUrl={event.album_image_url}
              />
            </Link>
            <div className='absolute right-0 top-0 flex items-center gap-2  h-full p-4'>
              {/* Dropdown for mobile */}
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key='disable' onClick={() => {}}>
                      Vô hiệu
                    </Menu.Item>
                    <Menu.Item
                      key='edit'
                      onClick={() => {
                        setEvent(event)
                        setIsModalUpdate(true)
                      }}
                    >
                      Chỉnh sửa
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click']}
                className='block sm:hidden'
              >
                <Button
                  size='large'
                  className='text-emerald-50 font-bold w-full bg-transparent hover:bg-gray-200'
                >
                  <MoreOutlined />
                </Button>
              </Dropdown>

              {/* Buttons for larger screens */}
              <Button
                size='large'
                className='bg-white h-8 text-[#2563EB] border-[#2563EB] border-1 rounded-3xl font-bold w-full sm:w-auto hidden sm:inline-flex font-sans text-sm'
                onClick={() => {}}
              >
                Vô hiệu
              </Button>
              <Button
                icon={<EditOutlined />}
                size='large'
                className='bg-white h-8 text-[#2563EB] border-[#2563EB] border-1 rounded-3xl font-bold w-full sm:w-auto hidden sm:inline-flex font-sans text-sm'
                onClick={() => {
                  setEvent(event)
                  setIsModalUpdate(true)
                }}
              >
                Chỉnh sửa
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {totalEvents && loadedEvents.length < totalEvents && (
        <div className='flex justify-center mt-4'>
          <Button
            size='large'
            className='bg-[#0A347D] text-emerald-50 font-bold px-6 py-2'
            onClick={handleLoadMore}
            loading={isLoadingMore}
          >
            Tải thêm
          </Button>
        </div>
      )}
    </div>
  )
}

export default AllEventsAdmin

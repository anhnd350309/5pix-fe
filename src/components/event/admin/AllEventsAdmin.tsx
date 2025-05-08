import React, { useEffect, useState } from 'react'
import { Button, Input, Spin, Dropdown, Menu, message } from 'antd'
import { EditOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons'
import {
  Album5pixStatus,
  AlbumItemResponse,
  GetAlbumsGetParams,
  GetPubAlbumsGetParams,
} from '@/schemas'
import Link from 'next/link'
import EventCardAdmin from '@/components/shared/EvenCardAdmin'
import { approveAlbumAlbumsApproveAlbumPost, getAlbumsGet } from '@/services/album/album'
import { useRouter } from 'next/router'

interface AllEventsAdminProps {
  setEvent: (event: AlbumItemResponse) => void
  currentPage: number
  setCurrentPage: (page: any) => void
  reloadTrigger: number
  status?: string
  type: string
}

const AllEventsAdmin: React.FC<AllEventsAdminProps> = ({
  setEvent,
  currentPage,
  setCurrentPage,
  reloadTrigger,
  status,
  type,
}) => {
  const [loadedEvents, setLoadedEvents] = useState<AlbumItemResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingApprove, setIsLoadingApprove] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [totalEvents, setTotalEvents] = useState<number | null>(null)
  const router = useRouter()
  const params: GetAlbumsGetParams = {
    page: currentPage,
    page_size: 10,
    album_5pix_status: status as Album5pixStatus | undefined,
  }
  const fetchEvents = async () => {
    if (currentPage === 1) setIsLoading(true)
    setError(null)

    try {
      const response = await getAlbumsGet(params)
      const newEvents = response.data

      console.log('Fetched events:', newEvents)
      setLoadedEvents((prevEvents) => {
        if (currentPage === 1) return newEvents
        return [...prevEvents, ...newEvents]
      })
      setTotalEvents(response.metadata.total_items)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }
  const rejectEvent = (id: number) => () => {
    try {
      setIsLoadingApprove(true)
      approveAlbumAlbumsApproveAlbumPost({
        album_id: id,
        album_5pix_status: 'rejected',
      }).then((res) => {
        console.log('Event rejected:', res)
        message.success('Đã từ chối album')
        fetchEvents()
      })
    } catch (error) {
      console.error('Error rejecting event:', error)
      message.error(`Từ chối album không thành công, ${error}`)
    } finally {
      setIsLoadingApprove(false)
    }
  }
  const approveEvent = (id: number) => () => {
    try {
      setIsLoadingApprove(true)
      approveAlbumAlbumsApproveAlbumPost({
        album_id: id,
        album_5pix_status: 'approved',
      }).then((res) => {
        console.log('Event approved:', res)

        message.success('Đã duyệt album')

        fetchEvents()
      })
    } catch (error) {
      console.error('Error rejecting event:', error)
      message.error(`Duyệt album không thành công, ${error}`)
    } finally {
      setIsLoadingApprove(false)
    }
  }
  useEffect(() => {
    fetchEvents()
  }, [currentPage, reloadTrigger])

  if (isLoading && currentPage === 1) return <Spin />
  if (error) return <div>Error: {error}</div>

  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setCurrentPage((prevPage: number) => prevPage + 1)
  }

  return (
    <div>
      {/* Search Input */}
      <Input
        size='large'
        placeholder='Mã sự kiện, tên sự kiện'
        prefix={<SearchOutlined />}
        className='w-full sm:w-1/2 mb-4'
      />

      {/* Events List */}
      <div className='flex flex-col gap-4 py-4'>
        {loadedEvents.length === 0 && <span>Không tìm thấy album</span>}
        {loadedEvents?.map((event) => (
          <div className='relative bg-white shadow-md rounded-lg' key={event.id}>
            <Link href={`/events/${event.id}`}>
              <EventCardAdmin
                title={event.album_name}
                date={event.event_date}
                imageCount={event.total_image ?? 0}
                imageUrl={event.album_image_url}
                status={event.album_5pix_status ?? ''}
              />
            </Link>
            <div className='absolute right-0 top-0 flex items-center gap-2 h-full p-4'>
              {/* Dropdown for mobile */}
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item
                      key='edit'
                      onClick={() => {
                        router.push(`/events/${event.id}/update`)
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
              {event.album_5pix_status === 'waiting_for_approve' && type === 'admin' && (
                <>
                  <Button
                    loading={isLoadingApprove}
                    size='large'
                    className='bg-white h-8 text-[#2563EB] border-[#2563EB] border-1 rounded-3xl font-bold w-full sm:w-auto hidden sm:inline-flex font-sans text-sm'
                    onClick={rejectEvent(event.id)}
                  >
                    Từ chối
                  </Button>
                  <Button
                    loading={isLoadingApprove}
                    size='large'
                    className='bg-white h-8 text-[#2563EB] border-[#2563EB] border-1 rounded-3xl font-bold w-full sm:w-auto hidden sm:inline-flex font-sans text-sm'
                    onClick={approveEvent(event.id)}
                  >
                    Duyệt
                  </Button>
                </>
              )}
              <Button
                icon={<EditOutlined />}
                size='large'
                className='bg-white h-8 text-[#2563EB] border-[#2563EB] border-1 rounded-3xl font-bold w-full sm:w-auto hidden sm:inline-flex font-sans text-sm'
                onClick={() => {
                  router.push(`/events/${event.id}/update`)
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

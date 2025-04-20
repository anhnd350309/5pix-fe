// pages/admin/events/[id]/update.tsx

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Spin, message } from 'antd'
import { AlbumItemResponse } from '@/schemas'
import UpdateEvent from '@/components/event/admin/UpdateEvent'
import ToggleSwitch from '@/components/event/admin/ToggleSwitch'
import PriceConfig from '@/components/event/admin/PriceConfig'
import { detailAlbumsAlbumIdGet } from '@/services/album/album'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'

const options = [
  { label: 'Tổng quan album', value: 'overView' },
  { label: 'Cấu hình kinh doanh', value: 'businessConfig' },
]

const UpdateEventPage = () => {
  const router = useRouter()
  const { id } = router.query

  const [event, setEvent] = useState<AlbumItemResponse | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selected, setSelected] = useState('overView')

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return

      setIsLoading(true)
      try {
        const albumId = parseInt(Array.isArray(id) ? id[0] : id, 10)
        const res = await detailAlbumsAlbumIdGet(albumId) // 📌 API lấy detail theo ID
        if (res.data) {
          setEvent(res.data)
        } else {
          throw new Error('No data found')
        }
      } catch (error) {
        message.error('Không lấy được thông tin sự kiện.')
        router.push('/admin/events') // Quay về danh sách sự kiện nếu lỗi
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  if (isLoading)
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin />
      </div>
    )

  if (!event) return null

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Chỉnh sửa sự kiện</h1>

      {/* Toggle tabs */}
      <div className='flex justify-center mb-6'>
        <ToggleSwitch selected={selected} onChange={setSelected} options={options} />
      </div>

      {/* Form update */}
      {selected === 'overView' ? (
        <UpdateEvent
          event={event}
          setEventData={setEvent}
          setShowModalUpdate={() => {}}
          onChange={setSelected}
        />
      ) : (
        <PriceConfig
          type='save'
          setCurrentPage={() => {}}
          setIsModalVisible={() => {}}
          event={event}
        />
      )}
    </div>
  )
}

export default UpdateEventPage
UpdateEventPage.requireAuth = true
UpdateEventPage.requiredRoles = ['admin', 'merchant']
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
UpdateEventPage.getLayout = getLayout

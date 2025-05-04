import React, { useEffect, useState } from 'react'
import ListEventsDetailAdmin from '@/components/event/admin/ListItemDetailAdmin'
import { useRouter } from 'next/router'
import DetailEventFilter from '@/components/event/admin/EventFilter'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'
import { detailAlbumsAlbumIdGet } from '@/services/album/album'
import { AlbumDetailResponse } from '@/schemas'

const EventAdmin = () => {
  const router = useRouter()
  const { id } = router.query
  const [eventName, setEventName] = useState<string>('')
  const [event, setEvent] = useState<AlbumDetailResponse | undefined>(undefined)

  const [searchKey, setSearchKey] = useState<string>('')
  useEffect(() => {
    const fetchEventName = async () => {
      if (id) {
        try {
          const albumId = parseInt(Array.isArray(id) ? id[0] : id, 10)
          const response = await detailAlbumsAlbumIdGet(albumId)
          if (response?.data) {
            console.log('Event name:', response.data)
            setEvent(response.data)
            setEventName(response.data.album_name)
          } else {
            console.error('Failed to fetch event name:', response)
            // Handle error appropriately, e.g., display a default name or an error message
          }
        } catch (error) {
          console.error('Error fetching event name:', error)
          // Handle error appropriately
        }
      }
    }

    fetchEventName()
  }, [id])
  const triggerSearch = (key: string) => {
    setSearchKey(key)
  }
  return (
    <>
      <DetailEventFilter
        eventName={eventName}
        id={id ? parseInt(Array.isArray(id) ? id[0] : id, 10) : 0}
        event={event}
        triggerSearch={triggerSearch}
      />
      {id && <ListEventsDetailAdmin id={Array.isArray(id) ? id[0] : id} searchKey={searchKey} />}
    </>
  )
}

export default EventAdmin

EventAdmin.requireAuth = true
EventAdmin.requiredRoles = ['admin', 'merchant']
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
EventAdmin.getLayout = getLayout

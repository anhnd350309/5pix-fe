import React, { useEffect, useState } from 'react'
import ListEventsDetailAdmin from '@/components/event/admin/ListItemDetailAdmin'
import { useRouter } from 'next/router'
import DetailEventFilter from '@/components/event/admin/EventFilter'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'
import { detailAlbumsAlbumIdGet } from '@/services/album/album'

const EventAdmin = () => {
  const router = useRouter()
  const { id } = router.query
  const [eventName, setEventName] = useState<string>('')

  useEffect(() => {
    const fetchEventName = async () => {
      if (id) {
        try {
          const albumId = parseInt(Array.isArray(id) ? id[0] : id, 10)
          const response = await detailAlbumsAlbumIdGet(albumId)
          if (response?.data) {
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
  return (
    <>
      <DetailEventFilter
        eventName={eventName}
        id={id ? parseInt(Array.isArray(id) ? id[0] : id, 10) : 0}
      />
      {id && <ListEventsDetailAdmin id={Array.isArray(id) ? id[0] : id} />}
    </>
  )
}

export default EventAdmin

EventAdmin.requireAuth = true
EventAdmin.requiredRoles = ['admin', 'merchant']
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
EventAdmin.getLayout = getLayout

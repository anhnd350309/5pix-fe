import React, { useEffect, useState } from 'react'
import SEOHead from '@/components/seo'
import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
import ListEventsDetailAdmin from '@/components/event/admin/ListItemDetailAdmin'
import { useRouter } from 'next/router'
import DetailEventFilter from '@/components/event/admin/EventFilter'
import { detailAlbumsAlbumIdGet } from '@/services/album/album'

const EventAdmin = () => {
  const router = useRouter()
  const { id } = router.query
  const [eventName, setEventName] = useState<string>('')

  const [searchKey, setSearchKey] = useState<string>('')
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
  const triggerSearchBib = (key: string) => {
    setSearchKey(key)
  }
  const [imgName, setImgName] = useState<string>('')
  const triggerSearchImg = (key: string) => {
    setImgName(key)
  }
  return (
    <>
      <DetailEventFilter
        eventName={eventName}
        id={id ? parseInt(Array.isArray(id) ? id[0] : id, 10) : 0}
        triggerSearchBib={triggerSearchBib}
        triggerSearchImg={triggerSearchImg}
      />
      {id && (
        <ListEventsDetailAdmin
          id={Array.isArray(id) ? id[0] : id}
          searchKey={searchKey}
          imgName={imgName}
        />
      )}
    </>
  )
}

export default EventAdmin

EventAdmin.requireAuth = true
EventAdmin.requiredRoles = ['admin']
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
EventAdmin.getLayout = getLayout

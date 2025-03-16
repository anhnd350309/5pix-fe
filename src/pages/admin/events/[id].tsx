import React from 'react'
import SEOHead from '@/components/seo'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import ListEventsDetailAdmin from '@/components/event/admin/ListItemDetailAdmin'
import { useRouter } from 'next/router'
import DetailEventFilter from '@/components/event/admin/EventFilter'

const EventAdmin = () => {
  const router = useRouter()
  const { id } = router.query
  const eventName = 'Tà Năng Trail Challenge 2025' // Bạn có thể thay đổi tên sự kiện ở đây

  return (
    <>
      <DetailEventFilter eventName={eventName} />
      {id && <ListEventsDetailAdmin id={Array.isArray(id) ? id[0] : id} />}
    </>
  )
}

export default EventAdmin
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
EventAdmin.getLayout = getLayout

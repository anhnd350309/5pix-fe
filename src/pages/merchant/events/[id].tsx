import React from 'react'
import ListEventsDetailAdmin from '@/components/event/admin/ListItemDetailAdmin'
import { useRouter } from 'next/router'
import DetailEventFilter from '@/components/event/admin/EventFilter'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'

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

EventAdmin.requireAuth = true
EventAdmin.requiredRoles = ['admin', 'merchant']
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
EventAdmin.getLayout = getLayout

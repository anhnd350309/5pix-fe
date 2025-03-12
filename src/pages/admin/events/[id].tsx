import React from 'react'
import SEOHead from '@/components/seo'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import ListEventsDetailAdmin from '@/components/event/admin/ListItemDetailAdmin'
import { useRouter } from 'next/router'
//
const EventAdmin = () => {
  const router = useRouter()
  const { id } = router.query
  return <>{id && <ListEventsDetailAdmin id={Array.isArray(id) ? id[0] : id} />}</>
}

export default EventAdmin
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
EventAdmin.getLayout = getLayout

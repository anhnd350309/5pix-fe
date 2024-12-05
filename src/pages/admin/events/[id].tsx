import React from 'react'
import SEOHead from '@/components/seo'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import ListEventsDetailAdmin from '@/components/event/ListItemDetailAdmin'

const EventAdmin = () => {
  return (
    <>
      <SEOHead title="5PIX" />
      <LayoutAdmin>
        <ListEventsDetailAdmin />
      </LayoutAdmin>
    </>
  );
}

export default EventAdmin

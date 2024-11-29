import { ListEvents } from '@/components/event/ListEvents'
import Layout from 'components/layout/Layout'
import React from 'react'

const ListEventPage = () => {
  return (
    <Layout>
      <div className='px-8 mx-16'>
        <ListEvents />
      </div>
    </Layout>
  )
}

export default ListEventPage

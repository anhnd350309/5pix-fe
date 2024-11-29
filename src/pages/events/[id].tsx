import { Spin } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { BannerEvent } from '@/components/event/BannerEvent'
import Layout from '@/components/layout/Layout'
import { useDetailPubAlbumsAlbumIdGet } from '@/services/public-album/public-album'

const Event: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error, isLoading } = useDetailPubAlbumsAlbumIdGet(Number(id))
  if (isLoading) return <Spin />
  if (error) return <div>Error</div>
  const event = data?.data.data
  if (!event) return <div>Not found</div>
  return (
    <Layout>
      <div className='space-y-5 mx-1 mt-4 px-4 xl:px-16 center sm:mx-16'>
        <BannerEvent event={event} />
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'>
          {Array.from({ length: 12 }).map((_, index) => (
            <Image
              src='/assets/images/DetailEvent.png'
              key={index}
              alt='TA NANG TRAIL CHALLENGE 2025'
              width={600}
              height={400}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Event

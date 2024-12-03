import { Spin } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { use, useEffect } from 'react'

import { BannerEvent } from '@/components/event/BannerEvent'
import Layout from '@/components/layout/Layout'
import { useDetailPubAlbumsAlbumIdGet } from '@/services/public-album/public-album'
import { useSearchPubImagesPost } from '@/services/public-images/public-images'
import { Blob } from 'buffer'
import { ImageViewer } from '@/components/event/ImageViewer'
import ImgViewer from '@/components/event/ImgViewer'

const Event: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, error, isLoading } = useDetailPubAlbumsAlbumIdGet(Number(id))
  const { mutate, data: imagesData, error: imagesError } = useSearchPubImagesPost()
  const lstImages = imagesData?.data?.data
  useEffect(() => {
    if (id) {
      mutate({
        data: {
          avatar_file: '',
        },
        params: {
          album_id: Number(id),
          search_type: 'all',
          page: 1,
          page_size: 100,
          sort_by: 'id',
          order: 'desc',
        },
      })
    }
  }, [id, mutate])
  if (isLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spin />
      </div>
    )
  }
  if (error) {
    router.push('/404') // Redirect to 404 page
    return null
  }
  const event = data?.data.data
  if (!event) return <div>Not found</div>
  return (
    <Layout>
      <div className='space-y-5 mx-1 sm:mx-16 mt-4 px-4 xl:px-16 center'>
        <BannerEvent event={event} id={id} />
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5'>
          {lstImages?.map((image, index: number) => (
            <ImgViewer
              src={image?.cdn_image_url || 'assets/images/DetailEvent.png'}
              key={index}
              alt={image?.image_name || 'image'}
              extra={image?.s3_image_url || 'assets/images/DetailEvent.png'}
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

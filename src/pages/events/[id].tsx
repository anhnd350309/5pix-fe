import { Button, Spin } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { use, useEffect, useState } from 'react'

import { BannerEvent } from '@/components/event/BannerEvent'
import Layout from '@/components/layout/Layout'
import { useDetailPubAlbumsAlbumIdGet } from '@/services/public-album/public-album'
import { searchPubImagesPost, useSearchPubImagesPost } from '@/services/public-images/public-images'
import { Blob } from 'buffer'
// import { ImageViewer } from '@/components/event/ImageViewer'
import ImgViewer from '@/components/event/ImgViewer'
import {
  AlbumImageItemResponsePublic,
  BodySearchPubImagesPost,
  SearchPubImagesPostParams,
} from '@/schemas'

const Event: React.FC = () => {
  const router = useRouter()
  const { id } = router.query
  const [currentPage, setCurrentPage] = useState(1)
  const [curLoading, setCurLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const { data, error, isLoading } = useDetailPubAlbumsAlbumIdGet(Number(id))
  const { mutate, data: imagesData, error: imagesError } = useSearchPubImagesPost()
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponsePublic[]>([])
  // setLoadedImgs(imagesData?.data?.data || [])
  const [totalEvents, setTotalEvents] = useState<number | null>(null)
  useEffect(() => {
    console.log('start', id)
    const fetchEvents = async () => {
      if (currentPage === 1) setCurLoading(true)
      // setError(null)

      try {
        if (id) {
          const body: BodySearchPubImagesPost = {
            avatar_file: '',
          }
          const params: SearchPubImagesPostParams = {
            album_id: Number(id),
            search_type: 'all',
            page: currentPage,
            page_size: 100,
            sort_by: 'id',
            order: 'desc',
          }
          const newImgs = await searchPubImagesPost(body, params)
          console.log('newImgs', imagesData)
          setLoadedImgs((prevEvents) => [...prevEvents, ...newImgs.data.data])
          setTotalEvents(newImgs?.data.metadata.total_items ?? null)
        }
      } catch (err: any) {
        // setError(err.message || 'Something went wrong')
        console.log(err)
      } finally {
        setCurLoading(false)
        setIsLoadingMore(false)
      }
    }

    fetchEvents()
    console.log('currentPage', currentPage)
  }, [currentPage, id])
  useEffect(() => {
    if (imagesData) {
      setLoadedImgs(imagesData?.data?.data || [])
      setTotalEvents(imagesData?.data.metadata.total_items ?? null)
    }
  }, [imagesData])
  console.log('loadedImgs', loadedImgs)
  const handleLoadMore = () => {
    setIsLoadingMore(true)
    setCurrentPage((prevPage) => prevPage + 1)
  }
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
        <BannerEvent event={event} id={id} mutate={mutate} />
        <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6'>
          {loadedImgs?.map((image, index: number) => (
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
        {loadedImgs.length < (totalEvents ?? 0) && (
          <div className='flex justify-center mt-4 border-blue-500'>
            <Button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className='bg-transparent hover:bg-blue-500 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
            >
              {isLoadingMore ? <Spin className='mr-2' /> : 'Xem thêm'}
            </Button>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Event

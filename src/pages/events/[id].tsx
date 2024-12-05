import { Button, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { BannerEvent } from '@/components/event/BannerEvent'
import Layout from '@/components/layout/Layout'
import { useDetailPubAlbumsAlbumIdGet } from '@/services/public-album/public-album'
import { searchPubImagesPost, useSearchPubImagesPost } from '@/services/public-images/public-images'
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
  const { mutate, data: imagesData, error: imagesError, isPending } = useSearchPubImagesPost()
  const [showTotal, setShowTotal] = useState(false)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponsePublic[]>([])
  const [totalPages, setTotalPages] = useState(1)
  // setLoadedImgs(imagesData?.data?.data || [])
  const [totalEvents, setTotalEvents] = useState<number | null>(null)
  useEffect(() => {
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
          setLoadedImgs(newImgs.data.data)
          setTotalEvents(newImgs?.data.metadata.total_items ?? null)
          setTotalPages(Math.ceil(newImgs?.data.metadata.total_items / 100))
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
  }, [currentPage, id])
  useEffect(() => {
    if (imagesData) {
      setLoadedImgs(imagesData?.data?.data || [])
      setTotalEvents(imagesData?.data.metadata.total_items ?? null)
    }
  }, [imagesData])
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
      // handleLoadMore(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
      // handleLoadMore(currentPage + 1)
    }
  }
  // const handleLoadMore = () => {
  //   setIsLoadingMore(true)
  //   setCurrentPage((prevPage) => prevPage + 1)
  // }
  const handleBackToPage1 = () => {
    setCurrentPage(1)
  }
  if (isLoading || curLoading) {
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
        <BannerEvent event={event} id={id} mutate={mutate} setShowTotal={setShowTotal} />
        {isPending ? (
          <Spin className='flex justify-center items-center h-24' />
        ) : (
          <React.Fragment>
            {showTotal && loadedImgs.length > 0 && (
              <span>
                Tìm thấy {loadedImgs.length} ảnh của bạn, trong tổng số {event.total_image} ảnh
              </span>
            )}
            <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6'>
              {loadedImgs.length === 0 ? (
                <span className='flex justify-center items-center w-[85vw]'>
                  Không tìm thấy hình ảnh nào của bạn
                </span>
              ) : (
                loadedImgs?.map((image, index: number) => (
                  <ImgViewer
                    src={image?.cdn_image_url || 'assets/images/DetailEvent.png'}
                    key={index}
                    alt={image?.image_name || 'image'}
                    extra={image?.s3_image_url || 'assets/images/DetailEvent.png'}
                    width={600}
                    height={400}
                  />
                ))
              )}
            </div>
          </React.Fragment>
        )}

        {loadedImgs.length < (totalEvents ?? 0) && (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 mt-4'>
            <div className='flex justify-center border-blue-500'>
              <Button
                onClick={handleBackToPage1}
                disabled={currentPage === 1 || isLoadingMore}
                className='bg-transparent hover:bg-blue-500 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                Back to Page 1
              </Button>
            </div>
            <div className='flex justify-center border-blue-500'>
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoadingMore}
                className='bg-transparent hover:bg-blue-500 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                Previous
              </Button>

              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoadingMore}
                className='bg-transparent hover:bg-blue-500 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                {isLoadingMore ? <Spin className='mr-2' /> : 'Next'}
              </Button>
            </div>
            <div className='flex justify-center border-blue-500'>
              <span className='mx-4'>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Event

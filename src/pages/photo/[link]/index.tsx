import { Button, Card, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { BannerEvent } from '@/components/event/BannerEvent'
import { detailPubAlbumsAlbumSlugGet } from '@/services/public-album/public-album'
import {
  searchByAlbumLinkPubImagesSearchByLinkPost,
  searchPubImagesPost,
  useSearchByAlbumLinkPubImagesSearchByLinkPost,
  useSearchPubImagesPost,
} from '@/services/public-images/public-images'
import ImgViewer from '@/components/event/ImgViewer'

import {
  AlbumImageItemResponsePublic,
  AlbumItemResponsePublic,
  BodySearchPubImagesPost,
  ImageSearchType,
  SearchPubImagesPostParams,
} from '@/schemas'
import { useSearchParams } from 'next/navigation'
import SEOHead from '@/components/seo'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import ImageModal from '@/components/common/ImageModal'
import { useSession } from 'next-auth/react'
import useCurrency from '@/hooks/useCurrency'
import { createByLinkImageCollectionCreateByLinkPost } from '@/services/image-collection/image-collection'
type Repo = {
  event?: AlbumItemResponsePublic
  images: AlbumImageItemResponsePublic[]
  link?: string
  eventId: number
}
export const getServerSideProps = (async (context) => {
  const link = Array.isArray(context.params?.link) ? context.params?.link[0] : context.params?.link

  if (!link) {
    throw new Error('Invalid link')
  }

  const [bibNum, eventId, hash] = link.split('-')
  const res = await detailPubAlbumsAlbumSlugGet(eventId)
  const event = res.data

  console.log('event', event)
  console.log('linkkkkk', Array.isArray(link) ? link[0] : link)
  const imagesData = await searchByAlbumLinkPubImagesSearchByLinkPost({
    album_link: Array.isArray(link) ? link[0] : link,
  })
  console.log('imgaaa', imagesData)
  const images = imagesData.data
  return {
    props: { repo: { event, images, eventId: parseInt(eventId, 10), link } },
  }
}) satisfies GetServerSideProps<{ repo: Repo }>
const Event = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const images = repo.images
  const event = repo.event
  const formatter = useCurrency('đ')
  // event.is_album_free = 0
  const {
    mutate,
    data: imagesData,
    error: imagesError,
    isPending,
  } = useSearchByAlbumLinkPubImagesSearchByLinkPost()
  const [showTotal, setShowTotal] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  console.log('even neeeeee', event)
  const searchParams = useSearchParams()
  const router = useRouter()
  const eventId = repo.eventId
  const link = repo.link
  console.log(link)
  const { slug } = router.query
  const bibNumber = searchParams.get('bib_number')
  const [currentPage, setCurrentPage] = useState(1)
  const [curLoading, setCurLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponsePublic[]>(images)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isModalVisibleImage, setIsModalVisibleImage] = useState(false)
  const [bibNum, setBibNum] = useState<string>('')
  if (bibNumber) {
    setBibNum(bibNumber)
  }
  let id = parseInt(slug as string, 0)
  if (isNaN(id)) {
    id = 0
  }
  // setLoadedImgs(imagesData?.data?.data || [])
  const [totalEvents, setTotalEvents] = useState<number | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      if (currentPage === 1) setCurLoading(true)
      // setError(null)

      try {
        if (id || slug) {
          const body: BodySearchPubImagesPost = {
            avatar_file: '',
          }
          const params: SearchPubImagesPostParams = {
            album_id: id,
            slug: slug as string,
            search_type: 'all',
            page: currentPage,
            page_size: 100,
            sort_by: 'id',
            order: 'desc',
          }
          const newImgs = await searchPubImagesPost(body, params)
          setLoadedImgs(newImgs.data)
          setTotalEvents(newImgs?.metadata.total_items ?? null)
          setTotalPages(Math.ceil(newImgs?.metadata.total_items / 100))
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
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setIsLoadingMore(true)
      setCurrentPage((prevPage) => prevPage - 1)
      // handleLoadMore(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsLoadingMore(true)
      setCurrentPage((prevPage) => prevPage + 1)
      // handleLoadMore(currentPage + 1)
    }
  }

  const handleBackToPage1 = () => {
    setIsLoadingMore(true)
    setCurrentPage(1)
  }
  if (curLoading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spin />
      </div>
    )
  }

  const handleOptionClick = (action: string, imageIndex: number) => {
    if (action === 'open') {
      setSelectedImageIndex(imageIndex)
      setIsModalVisibleImage(true)
    }
  }
  const showPopup = async () => {
    await createByLinkImageCollectionCreateByLinkPost({
      album_link: typeof link === 'string' ? link : '',
    }).then(() => router.push(`/events/${eventId}/checkout`))
  }
  return (
    <React.Fragment>
      <div className='space-y-5 mx-1 sm:mx-16 mt-4 px-4 xl:px-16 center pb-[40px]'>
        <BannerEvent
          event={event!}
          id={id}
          mutate={mutate}
          setShowTotal={setShowTotal}
          bibNum={bibNum}
          setBibNum={setBibNum}
          setFile={setFile}
          setCurrentPage={setCurrentPage}
          type='link'
        />

        {curLoading ? (
          <Spin className='flex justify-center items-center h-24' />
        ) : (
          <React.Fragment>
            <div className='flex flex-col xl:flex-row gap-4'>
              <div className='flex-1'>
                <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  min-h-[300px] '>
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
                        extra={image?.cdn_image_url || 'assets/images/DetailEvent.png'}
                        width={600}
                        height={400}
                        onClick={() => handleOptionClick('open', index)}
                      />
                    ))
                  )}
                </div>
              </div>
              {event?.is_album_free === 0 && (
                <div className='w-fit'>
                  <Card
                    title='Photobook'
                    headStyle={{
                      backgroundColor: '#E6F7FF',
                      borderBottom: 'none',
                      fontWeight: 700,
                      fontSize: '18px',
                      padding: '8px 16px',
                      textAlign: 'center',
                    }}
                    style={{
                      width: 200,
                      borderRadius: 8,
                      overflow: 'hidden',
                      border: '1px solid #d9d9d9',
                    }}
                    bodyStyle={{
                      padding: '16px',
                    }}
                  >
                    <p>Tất cả ảnh của bạn định dạng kỹ thuật số (JPG) chỉ với</p>
                    <h3
                      style={{
                        margin: '16px 0',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {formatter(event?.album_price ?? 0)}
                    </h3>
                    <Button type='primary' shape='round' onClick={showPopup}>
                      Mua toàn bộ ảnh
                    </Button>
                  </Card>
                </div>
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
                {isLoadingMore ? <Spin className='mr-2' /> : 'Back to Page 1'}
              </Button>
            </div>
            <div className='flex justify-center border-blue-500'>
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoadingMore}
                className='bg-transparent hover:bg-blue-500 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                {isLoadingMore ? <Spin className='mr-2' /> : 'Previous'}
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
      <ImageModal
        visible={isModalVisibleImage}
        onCancel={() => setIsModalVisibleImage(false)}
        images={loadedImgs}
        selectedImageIndex={selectedImageIndex || 0}
        setSelectedImageIndex={setSelectedImageIndex}
        bibNum={bibNum}
        albumSlug={event?.album_slug}
        isFree={event?.is_album_free}
        albumId={event?.id || 0}
        price={event?.album_image_price}
      />
    </React.Fragment>
  )
}

export default Event

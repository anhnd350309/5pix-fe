import { Button, Card, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { BannerEvent } from '@/components/event/BannerEvent'
import { detailPubAlbumsAlbumSlugGet } from '@/services/public-album/public-album'
import { searchPubImagesPost, useSearchPubImagesPost } from '@/services/public-images/public-images'
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
import { fi } from '@faker-js/faker/.'
import AddToCartModal from '@/components/common/AddToCartModal'
import { signIn, useSession } from 'next-auth/react'
type Repo = {
  event?: AlbumItemResponsePublic
  images: AlbumImageItemResponsePublic[]
}
export const getServerSideProps = (async (context) => {
  // const searchParams = useSearchParams()
  // const router = useRouter()
  // const { slug } = router.query
  // const bibNumber = searchParams.get('bib_number')
  const slug = context.params?.slug
  const bibNumber = context.query.bib_number
  const res = await detailPubAlbumsAlbumSlugGet(slug as string)
  const event = res.data
  if (!event) {
    return {
      notFound: true,
    }
  }
  let params
  let id = parseInt(slug as string, 0)
  if (isNaN(id)) {
    id = 0
  }
  if (bibNumber) {
    params = {
      album_id: id,
      slug: Array.isArray(slug) ? slug[0] : slug,
      bib_number: Array.isArray(bibNumber) ? bibNumber[0] : bibNumber,
      search_type: 'metadata' as ImageSearchType,
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }
  } else {
    params = {
      album_id: id,
      slug: Array.isArray(slug) ? slug[0] : slug,
      search_type: 'all' as ImageSearchType,
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }
  }
  const imagesData = await searchPubImagesPost(
    {
      avatar_file: '',
    },
    params,
  )
  const images = imagesData.data
  return {
    props: { repo: { event, images } },
  }
}) satisfies GetServerSideProps<{ repo: Repo }>
const Event = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const event = repo.event
  const searchParams = useSearchParams()
  const router = useRouter()
  const { slug } = router.query
  const bibNumber = searchParams.get('bib_number')
  const [currentPage, setCurrentPage] = useState(1)
  const [curLoading, setCurLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { status } = useSession()
  const [isPopupVisible, setIsPopupVisible] = useState(false)
  const hidePopup = () => {
    setIsPopupVisible(false)
  }
  const showPopup = () => {
    router.push(`/events/${slug}/checkout`)
  }

  // const { data, error, isLoading } = useDetailPubAlbumsAlbumSlugGet(slug as string, {
  //   query: {},
  // })
  const { mutate, data: imagesData, error: imagesError, isPending } = useSearchPubImagesPost()
  const [showTotal, setShowTotal] = useState(false)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponsePublic[]>(repo.images)
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
    setTotalEvents(imagesData?.metadata.total_items ?? null)
    setTotalPages(Math.ceil((imagesData?.metadata.total_items ?? 0) / 100))
  }, [imagesData])
  useEffect(() => {
    const fetchEvents = async () => {
      if (bibNum) {
        try {
          if (slug) {
            const params = {
              album_id: id,
              slug: Array.isArray(slug) ? slug[0] : slug,
              bib_number: bibNum,
              search_type: 'metadata' as ImageSearchType,
              page_size: 100,
              page: currentPage,
              sort_by: 'id',
              order: 'desc',
            }

            setShowTotal(true)
            mutate({
              data: {
                avatar_file: '',
              },
              params: params,
            })
          }
        } catch (err: any) {
          console.log(err)
        } finally {
          setCurLoading(false)
          setIsLoadingMore(false)
        }
      } else if (file) {
        if (currentPage === 1) setCurLoading(true)
        // setError(null)

        try {
          if (id || slug) {
            const body: BodySearchPubImagesPost = {
              avatar_file: file,
            }
            const params: SearchPubImagesPostParams = {
              album_id: id,
              slug: slug as string,
              search_type: 'index_face',
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
      } else {
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
    }
    if (file) {
      console.log('file', file, currentPage)
    }
    fetchEvents()
  }, [currentPage, id])
  useEffect(() => {
    if (imagesData) {
      setLoadedImgs(imagesData?.data || [])
      setTotalEvents(imagesData.metadata.total_items ?? null)
    }
  }, [imagesData])
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
  // const handleLoadMore = () => {
  //   setIsLoadingMore(true)
  //   setCurrentPage((prevPage) => prevPage + 1)
  // }
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
      console.log('Open image', imageIndex)
      setSelectedImageIndex(imageIndex)
      setIsModalVisibleImage(true) // Mở modal khi nhấn vào ảnh
    }
  }

  return (
    <React.Fragment>
      {event.album_slug && (
        <SEOHead templateTitle={event.album_name} image={event.album_image_url} />
      )}
      <div className='space-y-5 mx-1 sm:mx-16 mt-4 px-4 xl:px-16 center pb-[40px]'>
        <BannerEvent
          event={event}
          id={id}
          mutate={mutate}
          setShowTotal={setShowTotal}
          bibNum={bibNum}
          setBibNum={setBibNum}
          setFile={setFile}
          setCurrentPage={setCurrentPage}
        />
        {isPending ? (
          <Spin className='flex justify-center items-center h-24' />
        ) : (
          <React.Fragment>
            {showTotal && loadedImgs.length > 0 && (
              <span className='text-center'>
                Tìm thấy {loadedImgs.length} ảnh của bạn, trong tổng số {event?.total_image} ảnh
              </span>
            )}
            <div className='flex flex-col xl:flex-row gap-4'>
              {/* Phần grid ảnh (giữ nguyên code của bạn) */}
              <div className='flex-1'>
                <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5  min-h-[300px] '>
                  {loadedImgs.length === 0 ? (
                    <span className='flex justify-center items-center w-[85vw]'>
                      Không tìm thấy hình ảnh nào của bạn
                    </span>
                  ) : (
                    loadedImgs?.map((image, index: number) => (
                      // In the file where you use the ImageViewer component
                      <ImgViewer
                        src={image?.cdn_image_url || 'assets/images/DetailEvent.png'}
                        key={index}
                        alt={image?.image_name || 'image'}
                        extra={image?.s3_image_url || 'assets/images/DetailEvent.png'}
                        width={600}
                        height={400}
                        onClick={() => handleOptionClick('open', index)}
                      />
                    ))
                  )}
                </div>
              </div>
              <div className='w-fit'>
                <Card
                  title='Photobook'
                  // Tùy chỉnh giao diện phần header
                  headStyle={{
                    backgroundColor: '#E6F7FF',
                    borderBottom: 'none',
                    fontWeight: 700,
                    fontSize: '18px',
                    padding: '8px 16px',
                    textAlign: 'center',
                  }}
                  // Tùy chỉnh giao diện phần khung Card
                  style={{
                    width: 200,
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: '1px solid #d9d9d9',
                  }}
                  // Tùy chỉnh phần nội dung bên trong Card
                  bodyStyle={{
                    padding: '16px',
                  }}
                >
                  <p>Tất cả 110 ảnh khoảnh khắc định dạng kỹ thuật số (JPG)</p>
                  <h3
                    style={{
                      margin: '16px 0',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    150.000 VND
                  </h3>
                  <Button type='primary' shape='round' onClick={showPopup}>
                    Kiểm tra giỏ hàng
                  </Button>
                </Card>
              </div>
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
        albumSlug={event.album_slug}
        isFree={false}
        albumId={event.id}
      />
      {/* <AddToCartModal isPopupVisible={isPopupVisible} hidePopup={hidePopup} slug={slug as string} /> */}
    </React.Fragment>
  )
}

export default Event

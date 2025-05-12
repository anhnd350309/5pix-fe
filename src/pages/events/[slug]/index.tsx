import { Card, notification, Spin } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { BannerEvent } from '@/components/event/BannerEvent'
import { detailPubAlbumsAlbumSlugGet } from '@/services/public-album/public-album'
import ImgViewer from '@/components/event/ImgViewer'

import {
  AlbumImageItemResponsePublic,
  AlbumItemResponsePublic,
  BodySearchPubImagesPost,
  ImageQueryDTO,
  ImageSearchType,
  SearchPubImagesPostParams,
} from '@/schemas'
import { useSearchParams } from 'next/navigation'
import SEOHead from '@/components/seo'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import ImageModal from '@/components/common/ImageModal'
import { useSession } from 'next-auth/react'
import useCurrency from '@/hooks/useCurrency'
import { getAlbumImagesGet } from '@/services/images/images'
import { searchPubImagesGet, useSearchPubImagesGet } from '@/services/public-images/public-images'
import { Button } from '@/components/ui/button'
import { addImageImageCollectionAddImagePost } from '@/services/image-collection/image-collection'
import { ur } from '@faker-js/faker/.'
import { set } from 'immer/dist/internal'
type Repo = {
  event?: AlbumItemResponsePublic
  images: AlbumImageItemResponsePublic[]
}
export const getServerSideProps = (async (context) => {
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
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }
  } else {
    params = {
      album_id: id,
      slug: Array.isArray(slug) ? slug[0] : slug,
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }
  }
  const imagesData = await searchPubImagesGet(params)
  const images = event.is_find_all_image === 1 ? imagesData.data : []
  return {
    props: { repo: { event, images } },
  }
}) satisfies GetServerSideProps<{ repo: Repo }>
const Event = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const event = repo.event
  const formatter = useCurrency('đ')
  // event.is_album_free = 0
  console.log('even neeeeee', event)
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

  const [showTotal, setShowTotal] = useState(false)
  const [isBuyAll, setIsBuyAll] = useState(false)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponsePublic[]>(repo.images)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [isModalVisibleImage, setIsModalVisibleImage] = useState(false)
  const [bibNum, setBibNum] = useState<string>('')
  const [fileName, setFileName] = useState<string | null>('')
  const [urlSearch, setUrlSearch] = useState<string | null>('')

  const [api, contextHolder] = notification.useNotification()
  const openNotificationWithIcon = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    description?: string,
  ) => {
    api[type]({
      message: message,
      description: description,
      placement: 'topRight',
    })
  }
  if (bibNumber) {
    setBibNum(bibNumber)
  }
  let id = parseInt(slug as string, 0)
  if (isNaN(id)) {
    id = 0
  }
  const fetchEvents = async () => {
    if (bibNum) {
      try {
        if (slug) {
          const params = {
            album_id: id,
            slug: Array.isArray(slug) ? slug[0] : slug,
            bib_number: bibNum,
            page_size: 100,
            page: currentPage,
            sort_by: 'id',
            order: 'desc',
          }

          setShowTotal(true)
          setCurLoading(true)
          const newImgs = await searchPubImagesGet(params)
          if (event.is_find_all_image === 1) {
            setLoadedImgs(newImgs.data)
            setTotalEvents(newImgs?.metadata.total_items ?? null)
            setTotalPages(Math.ceil(newImgs?.metadata.total_items / 100))
          }
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
            page: currentPage,
            page_size: 100,
            sort_by: 'id',
            order: 'desc',
          }
          const newImgs = await searchPubImagesGet(params)
          if (event.is_find_all_image === 1) {
            setLoadedImgs(newImgs.data)
            setTotalEvents(newImgs?.metadata.total_items ?? null)
            setTotalPages(Math.ceil(newImgs?.metadata.total_items / 100))
          }
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
            page: currentPage,
            page_size: 100,
            sort_by: 'id',
            order: 'desc',
          }
          const newImgs = await searchPubImagesGet(params)
          if (event.is_find_all_image === 1) {
            setLoadedImgs(newImgs.data)
            setTotalEvents(newImgs?.metadata.total_items ?? null)
            setTotalPages(Math.ceil(newImgs?.metadata.total_items / 100))
          }
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
  const [totalEvents, setTotalEvents] = useState<number | null>(null)
  const buyPhotobook = (albumId: number) => {
    try {
      console.log('bibnum', bibNum, fileName)
      const query: ImageQueryDTO[] = []
      if (bibNum !== '') {
        query.push({
          keyword: bibNum,
          keyword_type: 'bib_number',
        })
      }
      if (fileName !== '' && fileName !== null) {
        query.push({
          keyword: fileName ?? undefined,
          keyword_type: 'image_name',
        })
      }
      addImageImageCollectionAddImagePost({
        album_id: albumId,
        queries: query,
      }).then((res) => {
        if (res.id) {
          openNotificationWithIcon('success', 'Thành công', 'Đã thêm photobook vào giỏ hàng.')
        } else {
          openNotificationWithIcon(
            'error',
            'Thất bại',
            'Có lỗi xảy ra khi thêm photobook vào giỏ hàng.',
          )
          console.error('Error adding to cart:', res)
        }
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setBibNum('')
      setFileName(null)
      setUrlSearch(null)
      // setShowTotal(false)
      // fetchEvents()
    }
  }
  useEffect(() => {
    if (file) {
      console.log('file', file, currentPage)
    }
    fetchEvents()
  }, [currentPage, id])
  // useEffect(() => {
  //   if (imagesData) {
  //     if (event.is_find_all_image === 1) {
  //       setLoadedImgs(imagesData?.data || [])
  //       setTotalEvents(imagesData.metadata.total_items ?? null)
  //     }
  //   }
  // }, [imagesData])
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

  return (
    <React.Fragment>
      {contextHolder}
      {event.album_slug && (
        <SEOHead templateTitle={event.album_name} image={event.album_image_url} />
      )}
      <div className='space-y-5  center pb-[40px] font-sans'>
        <BannerEvent
          event={event}
          id={id}
          setShowTotal={setShowTotal}
          bibNum={bibNum}
          setBibNum={setBibNum}
          setCurrentPage={setCurrentPage}
          setLoadedImgs={setLoadedImgs}
          setTotalEvents={setTotalEvents}
          setTotalPages={setTotalPages}
          fileName={fileName || ''}
          setFileName={setFileName}
          setIsBuyAll={setIsBuyAll}
          setUrlSearch={setUrlSearch}
        />
        {curLoading ? (
          <Spin className='flex justify-center items-center h-24' />
        ) : (
          <div className=' mx-1 sm:mx-16 px-4 xl:px-16 relative sm:-top-16'>
            {showTotal && loadedImgs.length > 0 && (
              <>
                <span className='text-center'>
                  Tìm thấy {loadedImgs.length} ảnh của bạn, trong tổng số {event?.total_image} ảnh
                </span>
                {urlSearch && (
                  <div className='flex items-center justify-start'>
                    <img
                      src={urlSearch}
                      alt='Ảnh của bạn'
                      className='max-h-40 rounded-md object-contain'
                    />
                    <Button
                      onClick={() => {
                        setFileName('')
                        setUrlSearch('')
                      }}
                      className='ml-2 rounded-full bg-red-500 text-white hover:bg-red-700'
                    >
                      X
                    </Button>
                  </div>
                )}
              </>
            )}
            <div className='flex flex-col xl:flex-row gap-4 pt-4'>
              {/* Phần grid ảnh (giữ nguyên code của bạn) */}
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
                        extra={image?.s3_image_url || image?.cdn_image_url}
                        width={600}
                        height={400}
                        onClick={() => handleOptionClick('open', index)}
                      />
                    ))
                  )}
                </div>
              </div>
              {event.is_album_free === 0 && (
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
                    <p className='font-sans'>
                      Tất cả ảnh của bạn định dạng kỹ thuật số (JPG) chỉ với
                    </p>
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
                    {showTotal === true && (
                      <Button
                        onClick={() => buyPhotobook(event.id)}
                        className='rounded-[20px] bg-blue-600 w-full mb-2'
                      >
                        Mua photobook
                      </Button>
                    )}
                    <Button onClick={showPopup} className='rounded-[20px] bg-blue-600 w-full'>
                      Kiểm tra giỏ hàng
                    </Button>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}

        {loadedImgs.length < (totalEvents ?? 0) && (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 mt-4'>
            <div className='flex justify-center border-blue-500'>
              <Button
                onClick={handleBackToPage1}
                disabled={currentPage === 1 || isLoadingMore}
                className='bg-transparent hover:bg-blue-600 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                {isLoadingMore ? <Spin className='mr-2' /> : 'Back to Page 1'}
              </Button>
            </div>
            <div className='flex justify-center border-blue-500'>
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoadingMore}
                className='bg-transparent hover:bg-blue-600 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                {isLoadingMore ? <Spin className='mr-2' /> : 'Previous'}
              </Button>

              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoadingMore}
                className='bg-transparent hover:bg-blue-600 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
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
        isFree={event.is_album_free}
        albumId={event.id}
        price={event.album_image_price}
        albumPrice={event.album_price}
        fileSearch={fileName || ''}
        isBuyAll={isBuyAll}
      />
    </React.Fragment>
  )
}

export default Event

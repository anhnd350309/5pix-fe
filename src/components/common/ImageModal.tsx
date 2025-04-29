import React, { useRef, useEffect, useState } from 'react'
import { Modal, Carousel, Button, Card, notification } from 'antd'
import { DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { AlbumImageItemResponse, AlbumImageItemResponsePublic } from '@/schemas'
import { useRouter } from 'next/router'
import AddToCartModal from './AddToCartModal'
import { addImageImageCollectionAddImagePost } from '@/services/image-collection/image-collection'
interface ImageModalProps {
  visible: boolean
  onCancel: () => void
  images: AlbumImageItemResponsePublic[] | AlbumImageItemResponse[]
  selectedImageIndex: number
  setSelectedImageIndex: (index: number) => void
  bibNum?: string
  albumSlug?: string
  isFree?: number
  albumId: number
  price?: number
  fileSearch?: string
  isBuyAll?: boolean
}

const ImageModal: React.FC<ImageModalProps> = ({
  visible,
  onCancel,
  images,
  selectedImageIndex,
  setSelectedImageIndex,
  bibNum,
  albumSlug,
  isFree,
  albumId,
  price,
  fileSearch,
  isBuyAll,
}) => {
  console.log(fileSearch, bibNum)
  if (isFree === null) isFree = 1
  const router = useRouter()
  const carouselRef = useRef<any>(null)
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(selectedImageIndex, true)
    }
  }, [selectedImageIndex])
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href =
      images[selectedImageIndex]?.s3_image_url || images[selectedImageIndex]?.cdn_image_url || ''
    link.setAttribute('download', images[selectedImageIndex]?.image_name || 'download')
    link.setAttribute('target', '_blank')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.gtag('event', 'download', {
      event_category: 'image',
      event_label: images[selectedImageIndex]?.image_name,
    })
  }
  const handleGetResult = async () => {
    const currentImage =
      images[selectedImageIndex]?.s3_image_url || images[selectedImageIndex]?.cdn_image_url
    window.open(`/events/${albumSlug}/result?image=${currentImage}&bibNum=${bibNum}`, '_blank')
    // try {
    //   const data = await genCertificateThumbnailImagePubAlbumsGenCertificateThumbnailImagePost({
    //     album_slug: 'chay-vi-hanh-tinh-xanh',
    //     bib_number: '28828',
    //   })
    //   console.log(data)
    // } catch (err) {
    //   console.log(err)
    // }
  }
  const getCurrentImageUrl = () => {
    return images[selectedImageIndex]?.s3_image_url || '/assets/images/DetailEvent.png'
  }

  const [isDisabled, setIsDisabled] = useState(false)
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
  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isDisabled) return // nếu đang disabled thì không làm gì

    setIsDisabled(true) // khóa nút
    carouselRef.current?.next()

    setTimeout(() => {
      setIsDisabled(false) // mở lại sau 500ms
    }, 500)
  }
  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (isDisabled) return // nếu đang disabled thì không làm gì

    setIsDisabled(true) // khóa nút
    carouselRef.current?.prev()

    setTimeout(() => {
      setIsDisabled(false) // mở lại sau 500ms
    }, 3000)
  }
  const buyPhotobook = () => {
    try {
      addImageImageCollectionAddImagePost({
        album_id: albumId,
        queries: [
          {
            keyword: bibNum === '' ? fileSearch : bibNum,
            keyword_type: 'bib_number',
          },
        ],
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
      setIsPopupVisible(true)
    }
  }
  const showPopup = () => {
    try {
      addImageImageCollectionAddImagePost({
        album_id: albumId,
        image_ids: [images[selectedImageIndex]?.id as number],
      }).then((res) => {
        if (res.id) {
          openNotificationWithIcon('success', 'Thành công', 'Đã thêm ảnh vào giỏ hàng.')
        } else {
          openNotificationWithIcon('error', 'Thất bại', 'Có lỗi xảy ra khi thêm ảnh vào giỏ hàng.')
          console.error('Error adding to cart:', res)
        }
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsPopupVisible(true)
    }
  }

  const hidePopup = () => {
    setIsPopupVisible(false)
  }
  return (
    <>
      {contextHolder}
      <style>
        {`
          .custom-modal .ant-modal-content {
            background-color: rgba(0,0,0,0.8) !important;
            height: 100vh;
            width: 100%;
            margin: 0;
            position: fixed !important;
            top: 0;
            left: 0;
          }
          .custom-modal .ant-modal-close {
            color: white !important;
          }
          .ant-modal-close-x {
            font-size: 25px !important;
          }
        `}
      </style>
      <Modal
        open={visible}
        onCancel={onCancel}
        footer={null}
        width='100%'
        className='custom-modal overflow-hidden'
        bodyStyle={{
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
        }}
        mask={false}
      >
        <div className='w-full relative' onClick={onCancel} style={{ cursor: 'pointer' }}>
          <Carousel
            ref={carouselRef}
            initialSlide={selectedImageIndex || 0}
            afterChange={(current) => setSelectedImageIndex(current)}
            dots={false}
          >
            {images.map((image, index) => (
              <div className='flex justify-center items-center h-[85dvh]' key={index}>
                <img
                  src={image.s3_image_url || image.cdn_image_url}
                  alt={`Image ${index}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80dvh',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </Carousel>

          {/* Nút chuyển ảnh trái */}
          <Button
            onClick={handlePrev}
            disabled={isDisabled}
            className='absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full flex items-center justify-center'
            style={{ width: '60px', height: '60px' }}
            icon={<LeftOutlined />}
          />

          <Button
            onClick={handleNext}
            disabled={isDisabled}
            className='absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full flex items-center justify-center'
            style={{ width: '60px', height: '60px' }}
            icon={<RightOutlined />}
          />
        </div>
        <div
          style={{
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            gap: '16px',
          }}
          className='ejehhhe'
        >
          {isFree === 1 ? (
            <Button type='primary' icon={<DownloadOutlined />} onClick={handleDownload}>
              Tải về
            </Button>
          ) : (
            <>
              {isBuyAll && (
                <Button type='primary' onClick={buyPhotobook}>
                  Mua photobook
                </Button>
              )}

              <Button type='primary' onClick={showPopup}>
                Mua hình ảnh
              </Button>
            </>
          )}

          {bibNum && isFree === 1 && (
            <Button type='primary' onClick={handleGetResult}>
              Lấy ảnh kèm kết quả
            </Button>
          )}
        </div>
      </Modal>
      <AddToCartModal
        isPopupVisible={isPopupVisible}
        hidePopup={hidePopup}
        slug={albumSlug as string}
        imageId={images[selectedImageIndex]?.id as number}
        imgName={images[selectedImageIndex]?.image_name}
        albumId={albumId}
        price={price}
      />
    </>
  )
}

export default ImageModal

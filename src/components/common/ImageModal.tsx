import React, { useRef, useEffect } from 'react'
import { Modal, Carousel, Button } from 'antd'
import { DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { AlbumImageItemResponse } from '@/schemas'
import { useRouter } from 'next/router'
interface ImageModalProps {
  visible: boolean
  onCancel: () => void
  images: AlbumImageItemResponse[]
  selectedImageIndex: number
  setSelectedImageIndex: (index: number) => void
  bibNum?: string
  albumSlug?: string
}

const ImageModal: React.FC<ImageModalProps> = ({
  visible,
  onCancel,
  images,
  selectedImageIndex,
  setSelectedImageIndex,
  bibNum,
  albumSlug,
}) => {
  const router = useRouter()
  const carouselRef = useRef<any>(null)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.goTo(selectedImageIndex, true)
    }
  }, [selectedImageIndex])
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = images[selectedImageIndex]?.s3_image_url || '/assets/images/DetailEvent.png'
    link.setAttribute('download', images[selectedImageIndex]?.image_name || 'download')
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
      images[selectedImageIndex]?.s3_image_url || '/assets/images/DetailEvent.png'
    window.open(`/events/${albumSlug}/result?image=${currentImage}&bibNum=${bibNum}`)
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
  return (
    <>
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
        mask={false} // Tắt mask để tự xử lý sự kiện đóng modal
      >
        <div
          className='w-full relative'
          onClick={onCancel} // Đóng modal khi nhấp vào nền
          style={{ cursor: 'pointer' }}
        >
          <Carousel
            ref={carouselRef}
            initialSlide={selectedImageIndex || 0}
            afterChange={(current) => setSelectedImageIndex(current)}
            dots={false}
          >
            {images.map((image, index) => (
              <div className='flex justify-center items-center h-[90vh]' key={index}>
                <img
                  src={image?.s3_image_url || '/assets/images/DetailEvent.png'}
                  alt={`Image ${index}`}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                  }}
                />
              </div>
            ))}
          </Carousel>

          {/* Nút chuyển ảnh trái */}
          <Button
            onClick={(e) => {
              e.stopPropagation() // Ngăn sự kiện lan truyền
              carouselRef.current?.prev()
            }}
            className='absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-gray-500 text-white rounded-full flex items-center justify-center'
            style={{ width: '60px', height: '60px' }}
            icon={<LeftOutlined />}
          />

          {/* Nút chuyển ảnh phải */}
          <Button
            onClick={(e) => {
              e.stopPropagation() // Ngăn sự kiện lan truyền
              carouselRef.current?.next()
            }}
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
          <Button type='primary' icon={<DownloadOutlined />} onClick={handleDownload}>
            Tải về
          </Button>
          {bibNum && (
            <Button type='primary' onClick={handleGetResult}>
              Lấy ảnh kèm kết quả
            </Button>
          )}
        </div>
      </Modal>
    </>
  )
}

export default ImageModal

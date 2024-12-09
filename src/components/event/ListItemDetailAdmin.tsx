import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { Button, Carousel, Input, Modal, Popover, Spin } from 'antd' // Thêm import Popover từ Ant Design
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { AlbumImageItemResponse, BodyGetAlbumImagesPost, GetAlbumImagesPostParams } from '@/schemas'
import { getAlbumImagesPost } from '@/services/images/images'
import { processImageAlbumsAlbumIdProcessImagePut } from '@/services/album/album'
export interface ListItemDetailAdminProps {
  id: number | string
}
const ListEventsDetailAdmin = ({ id }: ListItemDetailAdminProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [curLoading, setCurLoading] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisibleImage, setIsModalVisibleImage] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [totalEvents, setTotalEvents] = useState<number | null>(null)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponse[]>([])
  const [isShowLabel, setIsShowLabel] = useState(true)

  const carouselRef = useRef<any>(null) // Create a ref to access the Carousel

  const showModal = () => {
    setIsModalVisible(true) // Show upload modal
  }

  const showModalFullImage = () => {
    setIsModalVisibleImage(true) // Show full image modal
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const handleCancelImage = () => {
    setIsModalVisibleImage(false)
  }

  useEffect(() => {
    const fetchEvents = async () => {
      if (currentPage === 1) setCurLoading(true)
      // setError(null)

      try {
        if (id) {
          const body: BodyGetAlbumImagesPost = {
            avatar_file: '',
          }
          const params: GetAlbumImagesPostParams = {
            album_id: Number(id),
            search_type: 'all',
            page: currentPage,
            page_size: 100,
            sort_by: 'id',
            order: 'desc',
          }
          const imgs = await getAlbumImagesPost(body, params)
          console.log(imgs)
          setLoadedImgs(imgs.data)
          setTotalEvents(imgs?.metadata.total_items ?? null)
          setTotalPages(Math.ceil(imgs?.metadata.total_items / 100))
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

  const images = Array(25).fill({
    cdn_image_url: '/assets/images/DetailEvent.png',
    image_name: 'Detail Event',
    s3_image_url: '/assets/images/DetailEvent.png',
  })
  const indexAlbum = () => {
    // Index album
    processImageAlbumsAlbumIdProcessImagePut(Number(id))
  }
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
  const handleBackToPage1 = () => {
    setCurrentPage(1)
  }

  const [hiddenImages, setHiddenImages] = useState<number[]>([])

  const handleOptionClick = (action: string, imageIndex: number) => {
    console.log('Action:', action, 'Image index:', imageIndex)
    if (action === 'hide') {
      setHiddenImages((prev) => [...prev, imageIndex])
    } else if (action === 'view') {
      window.open(images[imageIndex]?.s3_image_url, '_blank')
    } else if (action === 'find') {
      // Handle find action if necessary
    } else if (action === 'open') {
      setSelectedImageIndex(imageIndex)
      setIsModalVisibleImage(true)
    }
  }

  const content = (index: any) => (
    <div className='flex flex-col justify-start'>
      <Button
        type='link'
        className='flex gap-2 items-center text-start font-bold text-black hover:bg-[#D0D5DD] hover:underline'
        onClick={() => handleOptionClick('hide', index)}
      >
        <Image src='/assets/icons/template/icon_hidden.svg' alt='Logo' height={15} width={15} />
        Ẩn đi
      </Button>
      <Button
        type='link'
        className='flex gap-2 items-center text-start font-bold text-black hover:bg-[#D0D5DD] hover:underline'
        onClick={() => handleOptionClick('view', index)}
      >
        <Image src='/assets/icons/template/icon_image.svg' alt='Logo' height={15} width={15} />
        Xem ảnh gốc
      </Button>
      <Button
        type='link'
        className='flex gap-2 items-center text-start font-bold text-black hover:bg-[#D0D5DD] hover:underline'
        onClick={() => handleOptionClick('find', index)}
      >
        <Image src='/assets/icons/template/icon_link.svg' alt='Logo' height={15} width={15} />
        Tìm ảnh giống
      </Button>
    </div>
  )

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-[#475467] breadcrumb flex gap-2'>
        <Link href='/admin/home'>Trang chủ</Link>
        <div> &gt; </div>
        <Link href='/admin/home'>Danh sách sự kiện</Link>
        <div> &gt; </div>
        <Link href='/admin/home'>Tà Năng Trail Challenge 2025</Link>
        <div> &gt; </div>
        <Link href='/admin/home'>Album ảnh</Link>
      </div>
      <div className='flex justify-between'>
        <p className='text-2xl'>Tà Năng Trail Challenge 2025</p>
        <div className='flex gap-2'>
          <Button size='large' className='bg-[#C7DBFF] text-black font-bold' onClick={indexAlbum}>
            Start Index
          </Button>
          <Button size='large' className='bg-[#275FC1] text-white font-bold' onClick={showModal}>
            + Tải ảnh lên
          </Button>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Input
            size='large'
            className='w-[600px]'
            placeholder='Tên theo BIB/text'
            prefix={<SearchOutlined />}
          />
          <Button size='large' className='bg-[#275FC1] text-white font-bold'>
            Tìm ảnh
          </Button>
          <Button size='large' className='bg-[#C7DBFF] text-black font-bold'>
            Tìm kiếm bằng hình ảnh
          </Button>
        </div>
        <Button
          size='large'
          className='flex  gap-2 items-center bg-[#E4E7EC] text-[#344054] font-bold'
          onClick={() => setIsShowLabel(!isShowLabel)}
        >
          <Image
            src={
              isShowLabel
                ? '/assets/icons/template/icon_hidden.svg'
                : '/assets/icons/template/icon_show.svg'
            }
            alt='Logo'
            height={20}
            width={20}
          />
          {isShowLabel ? 'Ẩn nhãn' : 'Hiện nhãn'}
        </Button>
      </div>
      <Modal open={isModalVisible} onCancel={handleCancel} footer={null}>
        <div>
          <p className='text-center text-lg mb-2'>Tải ảnh vào album Tà Năng Challange 2025</p>
          <div className='flex flex-col items-center p-16 gap-4 border-dashed border-2 rounded-2xl'>
            <Image
              src='/assets/icons/template/drag_image_here.svg'
              className=''
              alt='Logo'
              height={80}
              width={80}
            />
            <p className='text-lg'>Kéo ảnh vào đây hoặc</p>
            <div className=''>
              <Button size='large' className='bg-[#275FC1] text-white flex items-center gap-2'>
                <Image
                  src='/assets/icons/template/upload_image.svg'
                  className=''
                  alt='Logo'
                  height={16}
                  width={16}
                />
                Tải ảnh lên
              </Button>
            </div>
            <p className='text-[#98A2B3] text-lg'>-------- jpeg, jpg, png, zip -------- </p>
          </div>
          <p className='text-center m-2'>Hoặc tải lên từ dịch vụ của bên thứ 3</p>
          <div className='flex justify-center'>
            <Image
              src='/assets/images/DriveThumbnail.png'
              className=''
              alt='Drive'
              height={110}
              width={140}
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={isModalVisibleImage}
        onCancel={() => setIsModalVisibleImage(false)}
        footer={null}
        width='80%'
      >
        <div>
          <Carousel
            ref={carouselRef}
            initialSlide={selectedImageIndex || 0}
            afterChange={(current) => setSelectedImageIndex(current)}
          >
            {loadedImgs.map((image, index) => (
              <div className='flex justify-center' key={index}>
                <img
                  src={image?.s3_image_url || '/assets/images/DetailEvent.png'}
                  alt={`Image ${index}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </Carousel>

          <div className='flex justify-between mt-4'>
            <Button onClick={() => carouselRef.current?.prev()} className='bg-[#275FC1] text-white'>
              Previous
            </Button>
            <Button onClick={() => carouselRef.current?.next()} className='bg-[#275FC1] text-white'>
              Next
            </Button>
          </div>
        </div>
      </Modal>
      <div className='grid grid-cols-5 gap-4'>
        {loadedImgs.map(
          (image, index) =>
            !hiddenImages.includes(index) && (
              <div key={index} className='relative w-full'>
                <Image
                  src={image?.cdn_image_url || '/assets/images/DetailEvent.png'}
                  alt='Logo'
                  height={80}
                  width={300}
                />
                <Popover content={content(index)} trigger='click' placement='bottomRight'>
                  <Image
                    src='/assets/icons/template/icon_option.svg'
                    className='absolute top-1 right-1 cursor-pointer'
                    alt='Logo'
                    height={30}
                    width={30}
                  />
                </Popover>
                {isShowLabel && (
                  <div
                    style={{
                      transition: 'transform 0.3s',
                      width: 'calc(100% - 12px)',
                      position: 'absolute',
                      backgroundColor: '#10182880',
                      padding: '2px',
                      height: '24px',
                      bottom: '0',
                    }}
                  >
                    <div className='absolute text-white text-xs whitespace-nowrap overflow-hidden text-ellipsis w-full'>
                      {image.image_metadata}
                    </div>
                  </div>
                )}
              </div>
            ),
        )}
      </div>
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
  )
}

export default ListEventsDetailAdmin

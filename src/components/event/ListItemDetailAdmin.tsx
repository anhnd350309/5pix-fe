import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Input, Popover, Spin } from 'antd' // Thêm import Popover từ Ant Design
import { SearchOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { AlbumImageItemResponse, BodyGetAlbumImagesPost, GetAlbumImagesPostParams } from '@/schemas'
import { getAlbumImagesPost } from '@/services/images/images'
export interface ListItemDetailAdminProps {
  id: number | string
}
const ListEventsDetailAdmin = ({ id }: ListItemDetailAdminProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [curLoading, setCurLoading] = useState(false)

  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [totalPages, setTotalPages] = useState(1)

  const [totalEvents, setTotalEvents] = useState<number | null>(null)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponse[]>([])
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
  const handleOptionClick = (action: any, imageIndex: any) => {
    if (action === 'hide') {
      setHiddenImages((prev) => [...prev, imageIndex])
    } else if (action === 'view') {
      window.open(images[imageIndex]?.s3_image_url, '_blank')
    } else if (action === 'find') {
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
          <Button size='large' className='bg-[#C7DBFF] text-black font-bold'>
            Start Index
          </Button>
          <Button size='large' className='bg-[#275FC1] text-white font-bold'>
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
          className='flex gap-2 items-center bg-[#E4E7EC] text-[#344054] font-bold'
        >
          <Image src='/assets/icons/template/icon_hidden.svg' alt='Logo' height={20} width={20} />
          Ẩn Label
        </Button>
      </div>
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
                <div
                  style={{
                    transition: 'transform 0.3s',
                    width: 'calc(100% - 16px)',
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

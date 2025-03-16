import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Popover } from 'antd'
import Image from 'next/image'
import { AlbumImageItemResponse } from '@/schemas'
import { getAlbumImagesPost } from '@/services/images/images'
import ImageModal from '@/components/common/ImageModal'
import ExpandableText from '../../common/ExpandableText'
import { EyeInvisibleOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons'

export interface ListItemDetailAdminProps {
  id: number | string
}

const ListEventsDetailAdmin = ({ id }: ListItemDetailAdminProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponse[]>([])
  const [isModalVisibleImage, setIsModalVisibleImage] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imgs = await getAlbumImagesPost(
          {
            avatar_file: '',
          },
          {
            album_id: Number(id),
            search_type: 'all',
            page: currentPage,
            page_size: 100,
            sort_by: 'id',
            order: 'desc',
          },
        )

        setLoadedImgs(imgs.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchImages()
  }, [id, currentPage])

  const handleOptionClick = (action: string, imageIndex: number) => {
    if (action === 'open') {
      setSelectedImageIndex(imageIndex)
      setIsModalVisibleImage(true) // Mở modal khi nhấn vào ảnh
    }
  }

  const popoverContent = (
    <div className='flex flex-col p-0'>
      <div className='flex items-center gap-2 cursor-pointer pb-2 border-b border-[#E0E0E0]'>
        <EyeInvisibleOutlined />
        <span>Ẩn đi</span>
      </div>
      <div className='flex items-center gap-2 cursor-pointer  pb-2 border-b border-[#E0E0E0] '>
        <EyeOutlined />
        <span>Xem ảnh gốc</span>
      </div>
      <div className='flex items-center gap-2 cursor-pointer pb-2 '>
        <LinkOutlined />
        <span>Tìm ảnh giống</span>
      </div>
    </div>
  )

  return (
    <div className='flex flex-col gap-4'>
      <div className='grid grid-cols-5 gap-4'>
        {loadedImgs.map((image, index) => (
          <div key={index} className='relative w-full'>
            <img
              loading='lazy'
              src={image?.cdn_image_url || '/assets/images/DetailEvent.png'}
              alt='Logo'
              className='w-full'
              onClick={() => handleOptionClick('open', index)} // Mở modal khi nhấn vào ảnh
            />
            <Popover content={popoverContent} trigger='click' placement='bottomRight'>
              <Image
                src='/assets/icons/template/icon_option.svg'
                className='absolute top-1 right-1 cursor-pointer'
                alt='Options'
                height={30}
                width={30}
              />
            </Popover>
            <div className='transition-transform flex items-center duration-300 w-full absolute bg-[#10182880] bottom-0'>
              <div className='w-full p-1'>
                <ExpandableText text={image.image_metadata || ''} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <ImageModal
        visible={isModalVisibleImage}
        onCancel={() => setIsModalVisibleImage(false)}
        images={loadedImgs}
        selectedImageIndex={selectedImageIndex || 0}
        setSelectedImageIndex={setSelectedImageIndex}
      />
    </div>
  )
}

export default ListEventsDetailAdmin

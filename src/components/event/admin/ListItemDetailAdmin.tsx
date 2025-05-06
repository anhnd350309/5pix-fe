import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button, Modal, Popover, Spin } from 'antd'
import Image from 'next/image'
import { AlbumImageItemResponse } from '@/schemas'
import {
  getAlbumImagesGet,
  setImageMetadataAlbumImagesSetImageMetadataPut,
} from '@/services/images/images'
import ImageModal from '@/components/common/ImageModal'
import ExpandableText from '../../common/ExpandableText'
import { EyeInvisibleOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons'

export interface ListItemDetailAdminProps {
  id: number | string
  searchKey: string
}

const ListEventsDetailAdmin = ({ id, searchKey }: ListItemDetailAdminProps) => {
  console.log('id', searchKey)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadedImgs, setLoadedImgs] = useState<AlbumImageItemResponse[]>([])
  const [isModalVisibleImage, setIsModalVisibleImage] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [totalEvents, setTotalEvents] = useState<number | null>(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null)
  const [editingMetadata, setEditingMetadata] = useState('')

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imgs = await getAlbumImagesGet({
          album_id: Number(id),
          page: currentPage,
          page_size: 100,
          sort_by: 'id',
          order: 'desc',
          ...(searchKey !== '' && { bib_number: searchKey }),
        })

        setLoadedImgs(imgs.data)
        setTotalEvents(imgs?.metadata.total_items ?? null)
        setTotalPages(Math.ceil(imgs?.metadata.total_items / 100))
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingMore(false)
      }
    }
    console.log('searchKey', searchKey)
    fetchImages()
  }, [id, currentPage, searchKey])

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setIsLoadingMore(true)
      setCurrentPage((prevPage) => prevPage - 1)
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

  const handleOptionClick = (action: string, imageIndex: number) => {
    if (action === 'open') {
      setSelectedImageIndex(imageIndex)
      setIsModalVisibleImage(true) // Mở modal khi nhấn vào ảnh
    } else if (action === 'edit') {
      setEditingImageIndex(imageIndex)
      setEditingMetadata(loadedImgs[imageIndex]?.image_metadata || '')
      setIsEditModalVisible(true)
      // add close popover
      const popover = document.querySelector('.ant-popover')
      if (popover) {
        popover.classList.add('hidden')
      }
    }
  }

  const popoverContent = (imageIndex: number) => (
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
      <div
        className='flex items-center gap-2 cursor-pointer pb-2 '
        onClick={() => handleOptionClick('edit', imageIndex)}
      >
        <LinkOutlined />
        <span>Cập nhật index</span>
      </div>
    </div>
  )

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {loadedImgs.map((image, index) => (
          <div key={index} className='relative w-full'>
            <img
              loading='lazy'
              src={image?.cdn_image_url || '/assets/images/DetailEvent.png'}
              alt='Logo'
              className='w-full'
              onClick={() => handleOptionClick('open', index)} // Mở modal khi nhấn vào ảnh
            />
            <Popover content={popoverContent(index)} trigger='click' placement='bottomRight'>
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
      <ImageModal
        visible={isModalVisibleImage}
        onCancel={() => setIsModalVisibleImage(false)}
        images={loadedImgs}
        selectedImageIndex={selectedImageIndex || 0}
        setSelectedImageIndex={setSelectedImageIndex}
        albumId={Number(id)}
        isFree={1}
      />
      <Modal
        title='Cập nhật metadata'
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingImageIndex(null)
        }}
        onOk={() => {
          if (editingImageIndex !== null) {
            const updatedImages = [...loadedImgs]
            updatedImages[editingImageIndex].image_metadata = editingMetadata
            setImageMetadataAlbumImagesSetImageMetadataPut({
              image_id: loadedImgs[editingImageIndex].id,
              image_metadata: editingMetadata,
            })
            setLoadedImgs(updatedImages)
          }
          setIsEditModalVisible(false)
          setEditingImageIndex(null)
        }}
      >
        <textarea
          value={editingMetadata}
          onChange={(e) => setEditingMetadata(e.target.value)}
          className='w-full p-2 border rounded'
          rows={4}
          placeholder='Nhập metadata mới'
        />
      </Modal>
    </div>
  )
}

export default ListEventsDetailAdmin

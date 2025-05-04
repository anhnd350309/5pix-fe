import React, { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlbumItemResponsePublic,
  BodyUploadToGetCdnBasePost,
  SearchPubImagesPostParams,
} from '@/schemas'

import SvgDate from '../icons/icons/Date'
import SvgImage from '../icons/icons/Image'
import SvgSearch from '../icons/icons/Search'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import UploadImageComponent from '@/components/common/UploadImageComponent'
import { searchPubImagesGet } from '@/services/public-images/public-images'
import { uploadToGetCdnBasePost } from '@/services/base/base'

export interface BannerEventProps {
  event: AlbumItemResponsePublic
  id: number | string
  setShowTotal: any
  bibNum: string
  setBibNum: any
  fileName?: string
  setFileName?: any
  setCurrentPage?: any
  type?: string
  setLoadedImgs: any
  setTotalEvents: any
  setTotalPages: any
  setIsBuyAll?: any
}

export const BannerEvent: React.FC<BannerEventProps> = ({
  event,
  id,
  setShowTotal,
  bibNum: bibNumber,
  setBibNum: setBibNumber,
  fileName,
  setFileName,
  setCurrentPage,
  type,
  setLoadedImgs,
  setTotalEvents,
  setTotalPages,
  setIsBuyAll,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  console.log(event.is_find_all_image)
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const body: BodyUploadToGetCdnBasePost = {
        file_data: file,
      }
      try {
        const response = await uploadToGetCdnBasePost(body, { image_for_search: 1 })
        if (response.data) {
          setFileName(response.data.file_name)
          console.log(response.data.file_name)
          // setUrl(response.data.url)
          // form.setFieldsValue({ album_image_url: response.data.url })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleDone = () => {
    setIsDialogOpen(false)
    handleSubmit()
  }

  const handleSubmit = async () => {
    // if (!selectedFile && !bibNumber) {
    //   alert('Please enter a BIB number or upload an image!')
    //   return
    // }
    setCurrentPage(1)
    const body = {}
    const params: SearchPubImagesPostParams = {
      album_id: typeof id === 'string' ? parseInt(id, 10) : id,

      slug: event.album_slug,
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }
    if (bibNumber) {
      params.bib_number = bibNumber
    }
    try {
      if (fileName !== '') {
        params.image_name = fileName || ''
        setShowTotal(true)
        setIsBuyAll(true)
      } else if (bibNumber) {
        setBibNumber(bibNumber)
        setIsBuyAll(true)
      } else {
        setShowTotal(false)
      }

      console.log('parammmmm', params, fileName)
      const newImgs = await searchPubImagesGet(params)
      if (event.is_find_all_image === 1) {
        setLoadedImgs(newImgs.data)
        setTotalEvents(newImgs?.metadata.total_items ?? null)
        setTotalPages(Math.ceil(newImgs?.metadata.total_items / 100))
      }
    } catch (error) {
      console.log('Error:', error)
      alert(`An error occurred. Please try again.${error}`)
    } finally {
      setFileName('')
      // setBibNumber('')
    }
  }

  return (
    <div className='bg-white flex flex-col items-start gap-8 mx-auto mb-20 rounded-lg text-gray-800 max-w-[100vw]'>
      {/* Banner */}
      <div className='relative w-[99vw] aspect-[16/6] overflow-hidden '>
        <Image
          src={event.album_image_url}
          alt={event.album_name}
          fill
          className='object-cover object-center'
          priority
          style={{ objectFit: 'cover' }}
        />

        {/* Overlay nội dung */}
        {/* <div className='absolute inset-0 bg-black/40 flex flex-col justify-center px-6 sm:px-16 text-white'>
          <h1 className='font-bold text-2xl sm:text-4xl mb-2'>{event.album_name}</h1>
          <div className='flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 text-sm sm:text-base'>
            <div className='flex items-center gap-2'>
              <SvgDate width={16} />
              <span>{new Date(event.event_date || '').toLocaleDateString('en-GB')}</span>
            </div>
            <div className='flex items-center gap-2'>
              <SvgImage width={16} />
              <span>{event.total_image?.toLocaleString()} Ảnh</span>
            </div>
          </div>
        </div> */}
      </div>

      {!type && event.is_find_all_image === 1 && (
        <div className='flex flex-col items-center space-y-4 sm:bg-white shadow p-2 rounded-full w-full  sm:mx-32  max-w-4xl'>
          <div className='flex sm:flex-row flex-col sm:justify-between gap-4 rounded-full w-full'>
            <div className='bg-white border-l-2 rounded-full w-full'>
              <Input
                placeholder='Nhập số BIB'
                value={bibNumber}
                onChange={(e) => setBibNumber(e.target.value)} // Update BIB state
                className='!ml-0 border-none w-full sm:w-64 !important text-black'
              />
            </div>
            <div className='flex gap-1 w-full sm:w-auto'>
              <Button
                onClick={handleSubmit}
                className='flex items-center bg-blue-500 rounded-full w-3/4 sm:w-[200px] text-white'
              >
                <SvgSearch width={16} stroke='white' /> Tìm ảnh
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                {' '}
                {/* Điều khiển mở dialog */}
                <DialogTrigger asChild>
                  <Button
                    className='flex items-center bg-blue-100 rounded-full w-full sm:w-[220px] text-blue-600'
                    onClick={() => setIsDialogOpen(true)} // Mở dialog khi nhấn nút
                  >
                    <SvgImage width={16} stroke='#2563EB' /> Tìm kiếm bằng hình ảnh
                  </Button>
                </DialogTrigger>
                <DialogContent className='sm:max-w-[700px]'>
                  <UploadImageComponent onFileChange={handleFileChange} onDone={handleDone} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

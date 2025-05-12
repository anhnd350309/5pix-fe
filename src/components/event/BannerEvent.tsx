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
import { Spin } from 'antd'

export interface BannerEventProps {
  event: AlbumItemResponsePublic
  id: number | string
  setShowTotal: any
  bibNum: string
  setBibNum: any
  fileName?: string
  setFileName?: any
  setUrlSearch?: any
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
  setUrlSearch,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setIsLoading] = useState(false)
  const [searching, setIsSearching] = useState(false)
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const body: BodyUploadToGetCdnBasePost = {
        file_data: file,
      }
      try {
        setIsLoading(true)
        const response = await uploadToGetCdnBasePost(body, { image_for_search: 1 })
        if (response.data) {
          setFileName(response.data.file_name)
          setUrlSearch(response.data.url)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleDone = () => {
    setIsDialogOpen(false)
    handleSubmit()
  }

  const handleSubmit = async () => {
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
        setShowTotal(true)
        setIsBuyAll(true)
      } else {
        setShowTotal(false)
      }
      setIsSearching(true)
      const newImgs = await searchPubImagesGet(params)
      if (event.is_find_all_image === 1) {
        setLoadedImgs(newImgs.data)
        setTotalEvents(newImgs?.metadata.total_items ?? null)
        setTotalPages(Math.ceil(newImgs?.metadata.total_items / 100))
      }
    } catch (error) {
      alert(`An error occurred. Please try again.${error}`)
    } finally {
      setIsSearching(false)
    }
  }
  const renderSearchForm = () => (
    <div className='flex sm:flex-row flex-col sm:justify-between gap-4 rounded-full w-full sm:w-[60%] mx-auto'>
      <div className='bg-white border-l-2 rounded-full w-full'>
        <Input
          placeholder='Nhập số BIB'
          value={bibNumber}
          onChange={(e) => setBibNumber(e.target.value)}
          className='!ml-0 border-none !w-full sm:w-64 !important text-black'
        />
      </div>
      <div className='flex gap-1 w-full sm:w-auto'>
        <Button
          onClick={handleSubmit}
          className='flex items-center bg-blue-600 rounded-full w-3/4 sm:w-[200px] text-white'
        >
          {searching ? <Spin className='' /> : <SvgSearch width={16} stroke='white' />}
          Tìm ảnh
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className='flex items-center bg-blue-100 rounded-full w-full sm:w-[220px] text-blue-600'
              onClick={() => setIsDialogOpen(true)}
            >
              <SvgImage width={16} stroke='#2563EB' /> Tìm kiếm bằng hình ảnh
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[700px]'>
            <UploadImageComponent
              onFileChange={handleFileChange}
              onDone={handleDone}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
  return (
    <div
      className='bg-white flex flex-col items-start gap-6 mx-auto rounded-lg text-gray-800 max-w-[100vw] font-sans'
      style={{ background: 'linear-gradient(to bottom, #FFFFFF, #E1F4FF)' }}
    >
      {/* Banner */}
      <div className='relative w-[99vw] h-full aspect-[16/6] overflow-hidden '>
        <div className='relative h-full inset-0 bg-gradient-to-b from-transparent to-[#E1F4FF]'>
          <img
            src={event.album_image_url}
            alt={event.album_name}
            className='object-cover object-center h-full w-full'
            style={{ objectFit: 'cover' }}
          />
          <div className='absolute bottom-0 w-full h-24 bg-gradient-to-b from-transparent to-[#FFFFFF] hidden sm:block'></div>
        </div>

        {!type && event.is_find_all_image === 1 && (
          <div className='absolute -bottom-10 sm:bottom-0 left-0 w-full py-20 bg-gradient-to-t from-[#FFFFFF] to-transparent hidden sm:block'>
            {renderSearchForm()}
          </div>
        )}
      </div>

      {!type && event.is_find_all_image === 1 && (
        <div className='block sm:hidden w-full px-4'>{renderSearchForm()}</div>
      )}
    </div>
  )
}

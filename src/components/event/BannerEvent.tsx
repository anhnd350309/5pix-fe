import React, { useState } from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AlbumItemResponsePublic } from '@/schemas'

import SvgDate from '../icons/icons/Date'
import SvgImage from '../icons/icons/Image'
import SvgSearch from '../icons/icons/Search'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import UploadImageComponent from '@/components/common/UploadImageComponent'
import { searchPubImagesPost } from '@/services/public-images/public-images'
import { ImageSearchType } from '@/services/5pixBackend'

export interface BannerEventProps {
  event: AlbumItemResponsePublic
  id: number | string
  mutate?: any
  setShowTotal: any
  bibNum: string
  setBibNum: any
  setFile?: any
  setCurrentPage?: any
  type?: string
}

export const BannerEvent: ({
  event,
  id,
  mutate,
  setShowTotal,
  bibNum,
  setBibNum,
  setFile,
  setCurrentPage,
  type,
}: BannerEventProps) => JSX.Element = ({
  event,
  id,
  mutate,
  setShowTotal,
  bibNum: bibNumber,
  setBibNum: setBibNumber,
  setFile,
  setCurrentPage,
  type,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  console.log(event.is_find_all_image)
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
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
    const body = {
      avatar_file: selectedFile || '',
    }
    const params = {
      album_id: id,
      bib_number: bibNumber,
      slug: event.album_slug,
      search_type: 'all' as ImageSearchType,
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }

    try {
      if (body.avatar_file) {
        setFile(body.avatar_file)
        params.search_type = 'index_face'
        setShowTotal(true)
        setBibNumber('')
      } else if (bibNumber) {
        setFile(null)
        setBibNumber(bibNumber)
        params.search_type = 'metadata'
        setShowTotal(true)
      } else {
        setFile(null)
        params.search_type = 'all'
        setShowTotal(false)
        setBibNumber('')
      }
      mutate({
        data: {
          avatar_file: body.avatar_file,
        },
        params: params,
      })
      setSelectedFile(null)
      // console.log('reset file', selectedFile)
      // const response = await searchPubImagesPost(body, params)
      // console.log('Search Results:', response.data)
      // alert('Search successful!')
    } catch (error) {
      console.log('Error:', error)
      alert('An error occurred. Please try again.{error}')
    }
  }

  return (
    <div className='bg-white flex flex-col items-start gap-8 mx-auto mb-20 rounded-lg max-w-4xl text-gray-800'>
      {/* Banner */}
      <div className='flex items-center gap-4 w-full'>
        <div className='relative flex-1 w-full max-w-sm aspect-video'>
          <Image
            src={event.album_image_url}
            alt={event.album_name}
            fill
            className='rounded-md object-cover'
          />
        </div>
        <div className='flex flex-col flex-1 gap-2'>
          <h1 className='font-bold text-xl sm:text-2xl'>{event.album_name}</h1>
          <div className='sm:flex items-center gap-6 text-gray-800'>
            <div className='flex items-center gap-1'>
              <SvgDate width={16} />
              <span>{new Date(event.event_date || '').toLocaleDateString('en-GB')}</span>
            </div>
            <div className='flex items-center gap-1'>
              <SvgImage width={16} />
              <span>{event.total_image?.toLocaleString()} Ảnh</span>
            </div>
          </div>
        </div>
      </div>
      {!type && event.is_find_all_image === 1 && (
        <div className='flex flex-col items-center space-y-4 sm:bg-white shadow p-2 rounded-full w-full'>
          <div className='flex sm:flex-row flex-col sm:justify-between gap-4 rounded-full w-full'>
            <div className='bg-white border-l-2 rounded-full w-full sm:w-80'>
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

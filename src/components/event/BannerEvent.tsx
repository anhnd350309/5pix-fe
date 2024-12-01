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

export interface BannerEventProps {
  event: AlbumItemResponsePublic
  id: number | string
}

export const BannerEvent: ({ event: { album_image_url, album_name, event_date, total_image }, id }: {
  event: { album_image_url: any; album_name: any; event_date: any; total_image: any };
  id: any
}) => JSX.Element = ({ event: { album_image_url, album_name, event_date, total_image }, id, }) => {
  const [bibNumber, setBibNumber] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile && !bibNumber) {
      alert('Please enter a BIB number or upload an image!')
      return
    }

    const body = {
      avatar_file: selectedFile,
    }
    const params = {
      album_id: id,
      bib_number: bibNumber,
      search_type: 'all',
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }

    try {
      const response = await searchPubImagesPost(body, params)
      console.log('Search Results:', response.data)
      alert('Search successful!')
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred. Please try again.')
    }
  }

  return (
    <div className='flex flex-col items-start mb-20 bg-gradient-to-r rounded-lg text-white max-w-4xl mx-auto gap-8'>
      {/* Banner */}
      <div className='flex items-center gap-4 w-full'>
        <div className='relative flex-1 w-full max-w-sm aspect-video'>
          <Image src={album_image_url} alt={album_name} fill className='rounded-md object-cover' />
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <h1 className='text-xl sm:text-2xl font-bold'>{album_name}</h1>
          <div className='items-center gap-6 text-gray-300 sm:flex'>
            <div className='flex items-center gap-1'>
              <SvgDate width={16} />
              <span>{event_date}</span>
            </div>
            <div className='flex items-center gap-1'>
              <SvgImage width={16} />
              <span>{total_image?.toLocaleString()} Ảnh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className='flex w-full flex-col p-2 items-center space-y-4 sm:bg-white shadow rounded-full'>
        <div className='flex flex-col gap-4 sm:flex-row rounded-full w-full sm:justify-between'>
          <div className='bg-white w-full sm:w-80 border-l-2 rounded-full'>
            <Input
              placeholder='Nhập số BIB'
              value={bibNumber}
              onChange={(e) => setBibNumber(e.target.value)} // Update BIB state
              className='w-full sm:w-64 !ml-0 border-none !important'
            />
          </div>
          <div className='flex w-full sm:w-auto gap-1'>
            <Button
              onClick={handleSubmit}
              className='bg-blue-500 w-3/4 sm:w-[200px] text-white flex items-center rounded-full'
            >
              <SvgSearch width={16} stroke='white' /> Tìm ảnh
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='bg-blue-100 w-full sm:w-[220px] text-blue-600 flex items-center rounded-full'>
                  <SvgImage width={16} stroke='#2563EB' /> Tìm kiếm bằng hình ảnh
                </Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <UploadImageComponent onFileChange={handleFileChange} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

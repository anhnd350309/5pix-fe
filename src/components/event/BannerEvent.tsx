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
}

export const BannerEvent: ({
  event: { album_image_url, album_name, event_date, total_image },
  id,
  mutate,
}: {
  event: { album_image_url: any; album_name: any; event_date: any; total_image?: any }
  id: any
  mutate?: any
}) => JSX.Element = ({
  event: { album_image_url, album_name, event_date, total_image },
  id,
  mutate,
}) => {
  const [bibNumber, setBibNumber] = useState<string>('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleDone = () => {
    setIsDialogOpen(false)
  }

  const handleSubmit = async () => {
    if (!selectedFile && !bibNumber) {
      alert('Please enter a BIB number or upload an image!')
      return
    }

    const body = {
      avatar_file: selectedFile || '',
    }
    const params = {
      album_id: id,
      bib_number: bibNumber,
      search_type: 'all' as ImageSearchType,
      page_size: 100,
      page: 1,
      sort_by: 'id',
      order: 'desc',
    }

    try {
      if (body.avatar_file) {
        params.search_type = 'index_face'
      } else {
        params.search_type = 'metadata'
      }
      mutate({
        data: {
          avatar_file: body.avatar_file,
        },
        params: params,
      })
      // const response = await searchPubImagesPost(body, params)
      // console.log('Search Results:', response.data)
      // alert('Search successful!')
    } catch (error) {
      console.log('Error:', error)
      alert('An error occurred. Please try again.{error}')
    }
  }

  return (
    <div className='flex flex-col items-start gap-8 bg-gradient-to-r mx-auto mb-20 rounded-lg max-w-4xl text-white'>
      {/* Banner */}
      <div className='flex items-center gap-4 w-full'>
        <div className='relative flex-1 w-full max-w-sm aspect-video'>
          <Image src={album_image_url} alt={album_name} fill className='rounded-md object-cover' />
        </div>
        <div className='flex flex-col flex-1 gap-2'>
          <h1 className='font-bold text-xl sm:text-2xl'>{album_name}</h1>
          <div className='sm:flex items-center gap-6 text-gray-300'>
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
    </div>
  )
}

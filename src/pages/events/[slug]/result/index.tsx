'use client'
import ResultImage from '@/components/event/ResultImage'
import { genCertificateThumbnailImagePubAlbumsGenCertificateThumbnailImagePost } from '@/services/public-album/public-album'
import { DownloadOutlined } from '@ant-design/icons'
import { fr } from '@faker-js/faker/.'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import React, { use, useEffect, useState } from 'react'

type ResultPageType = React.FC & { getLayout?: (page: React.ReactNode) => React.ReactNode }

const ResultPage: ResultPageType = () => {
  const [frameData, setFrameData] = useState('')
  const router = useRouter()
  const { query } = router
  const { image, bibNum } = query
  console.log('image:', image, 'bibnumber:', bibNum)

  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  useEffect(() => {
    const handlerGetResult = async () => {
      try {
        const data = await genCertificateThumbnailImagePubAlbumsGenCertificateThumbnailImagePost({
          album_slug: 'chay-vi-hanh-tinh-xanh',
          bib_number: '28828',
        })
        const blob = new Blob([data as any], { type: 'image/png' })
        convertBlobToBase64(blob)
        // fileURL.split(':').slice(1).join(':')
        // setFrameData(base64)
      } catch (err) {
        console.log(err)
      }
    }
    handlerGetResult()
  }, [])
  const handleCrop = (croppedData: string) => {
    setCroppedImage(croppedData) // Save the cropped image
    console.log('Cropped image:', croppedData)
  }
  const downloadImage = () => {
    if (croppedImage) {
      const link = document.createElement('a')
      link.href = croppedImage
      link.download = 'cropped-image.png'
      link.click()
    }
  }
  const convertBlobToBase64 = (blob: Blob) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      setFrameData(reader.result as string)
    }
    reader.readAsDataURL(blob)
  }
  return (
    <div className='flex flex-col items-center w-screen text-center h-[80vh] justify-center'>
      <h1>Image Cropper with Frame</h1>
      {!croppedImage && (
        <ResultImage
          imagePath='/assets/images/preview.webp' // Main image
          frameUrl='/assets/images/frame.png' // Frame image
          onSave={handleCrop}
          frameData={frameData}
          // viewportWidth={600}
          // viewportHeight={600}
        />
      )}
      {croppedImage && (
        <div className='flex flex-col items-center gap-4'>
          <h2>Cropped Image:</h2>
          <img loading='lazy' src={croppedImage} alt='Cropped' />
          <div className='flex flex-row gap-4'>
            <Button type='primary' icon={<DownloadOutlined />} onClick={downloadImage}>
              Tải về
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultPage
export const getLayout = (page: React.ReactNode) => <div>{page}</div>
ResultPage.getLayout = getLayout

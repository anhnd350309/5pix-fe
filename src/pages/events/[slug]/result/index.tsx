'use client'
import ResultImage from '@/components/event/ResultImage'
import { genCertificateThumbnailImagePubAlbumsGenCertificateThumbnailImagePost } from '@/services/public-album/public-album'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import useRouter from 'next/router'
import React, { use, useEffect, useState } from 'react'

type ResultPageType = React.FC & { getLayout?: (page: React.ReactNode) => React.ReactNode }

const ResultPage: ResultPageType = () => {
  const [frameData, setFrameData] = useState('')
  const router = useRouter()
  const { slug } = router.query
  const { query } = router
  const { image, bibNum } = query

  const [croppedImage, setCroppedImage] = useState<string | null>(null)
  useEffect(() => {
    const handlerGetResult = async () => {
      try {
        const data = await genCertificateThumbnailImagePubAlbumsGenCertificateThumbnailImagePost({
          album_slug: Array.isArray(slug) ? slug[0] : slug,
          bib_number: Array.isArray(bibNum) ? bibNum[0] : bibNum,
        })
        const blob = new Blob([data as any], { type: 'image/png' })
        convertBlobToBase64(blob)
      } catch (err) {
        console.log(err)
      }
    }
    if (slug && bibNum) {
      handlerGetResult()
    }
  }, [slug, bibNum])
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
      <h1>Lấy hình ảnh kèm kết quả</h1>
      {!croppedImage && (
        <ResultImage
          imagePath={
            typeof image === 'string'
              ? image
              : 'https://d206ocdtskenxb.cloudfront.net/6/20241222_062420_691676_c2f0576d-4d0a-442a-b6e6-bbf6e24e04fe.jpg'
          } // Main image
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

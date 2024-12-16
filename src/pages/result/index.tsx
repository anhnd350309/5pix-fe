import ResultImage from '@/components/event/ResultImage'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useState } from 'react'

type ResultPageType = React.FC & { getLayout?: (page: React.ReactNode) => React.ReactNode }

const ResultPage: ResultPageType = () => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

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
  return (
    <div className='flex flex-col items-center w-screen text-center h-[80vh] justify-center'>
      <h1>Image Cropper with Frame</h1>
      {!croppedImage && (
        <ResultImage
          imagePath='/assets/images/preview.webp' // Main image
          frameUrl='/assets/images/frame.png' // Frame image
          onSave={handleCrop}
          // viewportWidth={600}
          // viewportHeight={600}
        />
      )}
      {croppedImage && (
        <div className='flex flex-col items-center gap-4'>
          <h2>Cropped Image:</h2>
          <img loading='lazy' src={croppedImage} alt='Cropped' style={{ maxWidth: '1000px' }} />
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

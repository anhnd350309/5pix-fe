import ResultImage from '@/components/event/ResultImage'
import React, { useState } from 'react'

type ResultPageType = React.FC & { getLayout?: (page: React.ReactNode) => React.ReactNode }

const ResultPage: ResultPageType = () => {
  const [croppedImage, setCroppedImage] = useState<string | null>(null)

  const handleCrop = (croppedData: string) => {
    setCroppedImage(croppedData) // Save the cropped image
    console.log('Cropped image:', croppedData)
  }

  return (
    <div className='w-full text-center h-full'>
      <h1>Image Cropper with Frame</h1>
      {!croppedImage && (
        <ResultImage
          imagePath='/assets/images/preview.jpg' // Main image
          frameUrl='/assets/images/frame.png' // Frame image
          onSave={handleCrop}
          // viewportWidth={600}
          // viewportHeight={600}
        />
      )}
      {croppedImage && (
        <div className='flex flex-col items-center'>
          <h2>Cropped Image:</h2>
          <img src={croppedImage} alt='Cropped' style={{ maxWidth: '1000px' }} />
        </div>
      )}
    </div>
  )
}

export default ResultPage
export const getLayout = (page: React.ReactNode) => <div>{page}</div>
ResultPage.getLayout = getLayout

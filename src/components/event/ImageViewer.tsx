import React, { useState } from 'react'
import { Button } from 'antd'
import {
  LeftOutlined,
  RightOutlined,
  DownloadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons'

interface ImageViewerProps {
  src: string
  alt: string
  fileName: string
  format: string
  size: string
  dimensions: string
  extra?: string
  // onPrevious?: () => void
  // onNext?: () => void
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  src,
  alt,
  fileName,
  format,
  size,
  dimensions,
  extra,
  // onPrevious,
  // onNext,
}) => {
  const [zoom, setZoom] = useState(1)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3)) // Max zoom level: 3
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 1)) // Min zoom level: 1

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-50'>
      {/* Header Section */}
      <div className='flex justify-between items-center w-full px-10 py-4 bg-white shadow-md'>
        <div>
          <h2 className='text-lg font-bold'>{fileName}</h2>
          <div className='flex gap-4 text-sm text-gray-500'>
            <span>Định dạng: {format}</span>
            <span>Dung lượng: {size}</span>
            <span>Kích thước: {dimensions}</span>
          </div>
        </div>
        <Button
          type='primary'
          icon={<DownloadOutlined />}
          href={extra}
          download={fileName}
          size='large'
        >
          Tải về
        </Button>
      </div>

      {/* Image Viewer */}
      <div className='flex items-center justify-center flex-grow relative w-full'>
        {/* Left Navigation */}
        {/* {onPrevious && (
          <button
            className='absolute left-5 text-gray-600 hover:text-black bg-white p-2 rounded-full shadow-md'
            onClick={onPrevious}
          >
            <LeftOutlined />
          </button>
        )} */}

        {/* Image Container */}
        <div className='relative flex items-center justify-center overflow-hidden'>
          <img
            src={extra}
            alt={alt}
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s',
              maxWidth: '90%',
              maxHeight: '80%',
            }}
          />
        </div>

        {/* Right Navigation */}
        {/* {onNext && (
          <button
            className='absolute right-5 text-gray-600 hover:text-black bg-white p-2 rounded-full shadow-md'
            onClick={onNext}
          >
            <RightOutlined />
          </button>
        )} */}
      </div>

      {/* Zoom Controls */}
      <div className='flex items-center justify-center gap-4 py-4'>
        <button
          className='p-2 bg-white border rounded-full shadow-md text-gray-600 hover:text-black'
          onClick={handleZoomOut}
        >
          <ZoomOutOutlined />
        </button>
        <button
          className='p-2 bg-white border rounded-full shadow-md text-gray-600 hover:text-black'
          onClick={handleZoomIn}
        >
          <ZoomInOutlined />
        </button>
      </div>
    </div>
  )
}

export default ImageViewer

import { Modal, Button } from 'antd'
import { useState } from 'react'

interface ImageViewerProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  extra: string
}

export default function ImageViewer({
  src,
  alt,
  width,
  height,
  className,
  extra,
}: ImageViewerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpen = () => setIsModalOpen(true)
  const handleClose = () => setIsModalOpen(false)

  return (
    <>
      {/* Thumbnail */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={handleOpen}
        className={`cursor-pointer ${className}`}
        style={{ objectFit: 'cover' }}
      />

      {/* Fullscreen Modal */}
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        centered
        width='80%'
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
          padding: '0',
        }}
      >
        <img
          src={extra}
          alt={alt}
          style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
        />
        <div style={{ marginTop: '15px' }}>
          <Button href={extra} download type='primary'>
            Download
          </Button>
        </div>
      </Modal>
    </>
  )
}

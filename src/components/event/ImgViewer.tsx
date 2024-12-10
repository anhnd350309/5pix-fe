import { DownloadOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons'
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
  const [zoom, setZoom] = useState(1)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => {
    setIsModalOpen(false)
    setZoom(1) // Reset zoom when modal is closed
  }
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = extra
    link.setAttribute('download', alt || 'download')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.dataLayer.push('event', 'download', {
      event_category: 'image',
      event_label: alt,
    })
  }
  const zoomIn = () => setZoom((prevZoom) => Math.min(prevZoom + 0.2, 3)) // Max zoom level
  const zoomOut = () => setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1)) // Min zoom level

  return (
    <>
      {/* Thumbnail */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        onClick={openModal}
        className={`cursor-pointer ${className}`}
        style={{ objectFit: 'cover' }}
      />

      {/* Fullscreen Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width='100%'
        bodyStyle={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          padding: '0',
        }}
        closeIcon={<span style={{ fontSize: '18px', color: '#fff' }}>✕</span>}
        style={{ padding: '0' }}
        modalRender={(modal) => <div className='custom-modal-content'>{modal}</div>}
      >
        <div className='relative'>
          <img
            src={extra}
            alt={alt}
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s',
              maxWidth: '100%',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
          />
          <div
            style={{
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s',
              width: '100%',
              position: 'absolute',
              backgroundColor: '#10182880',
              padding: '10px',
              height: '50px',
              bottom: '0',
            }}
          >
            <div style={{ left: '50%', transform: 'translateX(-50%)', position: 'absolute' }}>
              <Button
                shape='circle'
                icon={<ZoomOutOutlined />}
                onClick={zoomOut}
                disabled={zoom <= 1}
                style={{ marginRight: '10px' }}
              />
              <Button
                shape='circle'
                icon={<ZoomInOutlined />}
                onClick={zoomIn}
                disabled={zoom >= 3}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
          }}
          className='ejehhhe'
        >
          <Button type='primary' icon={<DownloadOutlined />} onClick={handleDownload}>
            Tải về
          </Button>
        </div>
      </Modal>
      <style jsx global>{`
        .custom-modal-content .ant-modal-content {
          background-color: transparent !important;
          border-radius: 10px;
          padding: 0 !important;
        }
      `}</style>
    </>
  )
}

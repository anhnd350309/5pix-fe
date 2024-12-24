import { Button } from '@/components/ui/button'
import React, { useRef, useState } from 'react'

interface UploadImageComponentProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDone: () => void
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({ onFileChange, onDone }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [dragging, setDragging] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null) // Lưu trữ ảnh đã chọn
  const [imageDetails, setImageDetails] = useState<{
    name: string
    type: string
    size: number
    width: number
    height: number
  } | null>(null)

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    if (event.dataTransfer?.files?.[0]) {
      const file = event.dataTransfer.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
        setImageDetails({
          name: file.name,
          type: file.type,
          size: file.size,
          width: 0,
          height: 0,
        })
        onFileChange({
          target: {
            files: [file],
          } as any,
        } as React.ChangeEvent<HTMLInputElement>)
        const img = new Image()
        img.onload = () => {
          setImageDetails((prev) => ({
            ...prev!,
            width: img.width,
            height: img.height,
          }))
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDone = () => {
    onDone()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result as string)
        setImageDetails({
          name: file.name,
          type: file.type,
          size: file.size,
          width: 0,
          height: 0,
        })
        onFileChange(event)
        const img = new Image()
        img.onload = () => {
          setImageDetails((prev) => ({
            ...prev!,
            width: img.width,
            height: img.height,
          }))
        }
        img.src = reader.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='w-full'>
      {imageSrc ? (
        <>
          {imageDetails && (
            <div className='flex w-[95%] justify-between items-center mb-2'>
              <div className='flex flex-col gap-2'>
                <div className='text-xl'>
                  <strong>
                    {imageDetails.name.length > 30
                      ? `${imageDetails.name.substring(0, 20)}...${imageDetails.name.substring(imageDetails.name.lastIndexOf('.'))}`
                      : imageDetails.name}
                  </strong>
                </div>
                {/* <div className='text-sm flex gap-4'>
                  <div className='flex'>
                    <strong>Định dạng:</strong>
                    {imageDetails.type}
                  </div>
                  <div className='flex'>
                    <strong>Dung lượng:</strong>
                    {(imageDetails.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                  <div className='flex'>
                    <strong>Kích thước:</strong>
                    {imageDetails.width} x {imageDetails.height} px
                  </div>
                </div> */}
              </div>
              <Button className='w-28 bg-[#2563EB] rounded-full' onClick={handleDone}>
                Hoàn thành
              </Button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className='text-center text-2xl font-bold'>Tìm kiếm bằng gương mặt</div>
          <div className='text-center text-sm'>
            Hãy chọn ảnh rõ mặt để kết quả tìm kiếm được chính xác nhất
          </div>
        </>
      )}
      {imageSrc ? (
        <div className='flex justify-center'>
          <img
            loading='lazy'
            src={imageSrc}
            alt='Uploaded'
            className='w-auto max-h-96 object-cover mb-4'
          />
        </div>
      ) : (
        <div
          className={`border flex flex-col p-10 items-center gap-4 ${
            dragging ? 'bg-blue-100' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img
            loading='lazy'
            src='/assets/icons/template/upload_img.svg'
            className='w-auto'
            alt='Upload Illustration'
          />
          <div className='text-sm font-bold text-center'>Kéo thả ảnh vào hoặc</div>
          <Button className='w-28 bg-[#2563EB] rounded-full' onClick={handleFileSelect}>
            Chọn tệp tải lên
          </Button>

          <input
            ref={fileInputRef}
            type='file'
            accept='image/jpeg, image/jpg, image/png'
            onChange={handleInputChange}
            className='hidden'
          />
        </div>
      )}
      {!imageSrc && (
        <>
          <div className='text-center text-sm'>
            JPEG, JPG, PNG / Dung lượng tối đa 10MB / Kích thước tối thiểu 200px x 200px
          </div>
        </>
      )}
    </div>
  )
}

export default UploadImageComponent

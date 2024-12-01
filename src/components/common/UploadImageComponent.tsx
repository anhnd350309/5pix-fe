import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

interface UploadImageComponentProps {
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({ onFileChange }) => {
  return (
    <div>
      <div className='text-center text-2xl font-bold'>Tìm kiếm bằng gương mặt</div>
      <div className='text-center text-sm'>
        Hãy chọn ảnh rõ mặt để kết quả tìm kiếm được chính xác nhất
      </div>
      <div className='border flex flex-col p-10 items-center gap-4'>
        <img
          src='/assets/icons/template/upload_img.svg'
          className='w-auto'
          alt='Upload Illustration'
        />
        <div className='text-sm font-bold text-center'>Kéo thả ảnh vào hoặc</div>
        <label htmlFor='upload-file' className='cursor-pointer'>
          <Button className='w-28 bg-[#2563EB] rounded-full'>Chọn tệp tải lên</Button>
        </label>
        <Input
          id='upload-file'
          type='file'
          accept='image/jpeg, image/jpg, image/png'
          onChange={onFileChange}
        />
      </div>
      <div className='text-center text-sm'>
        JPEG, JPG, PNG / Dung lượng tối đa 10MB / Kích thước tối thiểu 200px x 200px
      </div>
    </div>
  )
}

export default UploadImageComponent

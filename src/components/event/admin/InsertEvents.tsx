import React, { useRef, useState } from 'react'
import { Button, Form, Input, DatePicker, Switch, Select } from 'antd'
import { AlbumCreateRequest, BodyUploadToGetCdnBasePost } from '@/schemas'
import { uploadToGetCdnBasePost } from '@/services/base/base'
import moment from 'moment'
import { createAlbumsPost } from '@/services/album/album'
interface InsertEventsProps {
  onChange?: (value: string) => void
  setEventData?: (value: AlbumCreateRequest) => void
}
const { Option } = Select

const InsertEvents = ({ onChange, setEventData }: InsertEventsProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [form] = Form.useForm()
  const [url, setUrl] = useState('')
  const handleSubmit = (values: any) => {
    //conver time to yyyy-mm-dd format
    values.event_date = moment(values.event_date).format('YYYY-MM-DD')
    setEventData?.(values)
    onChange?.('businessConfig')
    console.log('Form values: ', values)
    //
    // Xử lý gửi dữ liệu form ở đây
    // createAlbumsPost(values)
  }
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }
  const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const body: BodyUploadToGetCdnBasePost = {
        file_data: file,
      }
      console.log('eeee')
      try {
        const response = await uploadToGetCdnBasePost(body)
        console.log(response)
        if (response.data) {
          setUrl(response.data.url)
          form.setFieldsValue({ album_image_url: response.data.url })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='p-4 flex flex-col gap-6'>
      <div>
        <div className='font-bold mb-2'>Ảnh bìa sự kiện</div>
        <div className='flex justify-between items-center'>
          <div
            className='bg-[#E4E7EC] flex gap-2 flex-col justify-center items-center'
            style={{ width: '700px', height: '300px' }}
          >
            {url ? (
              <div className='flex justify-center'>
                <img
                  loading='lazy'
                  src={url}
                  alt='Uploaded'
                  className='w-auto max-h-[300px] object-cover'
                />
              </div>
            ) : (
              <>
                <Button
                  size='large'
                  className='bg-[#E4E7EC] border-2 border-black font-bold'
                  onClick={handleFileSelect}
                >
                  + Tải ảnh bìa lên
                </Button>
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/jpeg, image/jpg, image/png'
                  onChange={handleInputChange}
                  className='hidden'
                />
                <p>Kích thước tối ưu 1440x570px (Tối đa 3MB)</p>
              </>
            )}
          </div>
          <svg
            width='2'
            height='268'
            viewBox='0 0 2 268'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <line x1='1.20581' y1='-2.18557e-08' x2='1.20582' y2='268' stroke='#E4E7EC' />
          </svg>
          <div
            className='bg-[#E4E7EC] flex gap-2 flex-col justify-center items-center'
            style={{ width: '300px', height: '300px' }}
          >
            <Button size='large' className='bg-[#E4E7EC] border-2 border-black font-bold'>
              + Water Mark
            </Button>
            <p>Kích thước tối ưu 1440x570px (Tối đa 3MB)</p>
          </div>
        </div>
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
        autoComplete='off'
        layout='horizontal'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelWrap
        labelAlign='left'
      >
        <div className='w-1/2 shadow-lg shadow-gray-500/50 p-4 rounded-2xl'>
          <div className='mb-2 font-bold'>Thông tin chung</div>

          <Form.Item
            name='album_name'
            label='Tên sự kiện'
            rules={[{ required: true, message: 'Vui lòng nhập tên sự kiện!' }]}
          >
            <Input placeholder='Nhập tên sự kiện' />
          </Form.Item>
          <Form.Item
            name='event_type'
            label='Loại sự kiện'
            rules={[{ required: true, message: 'Vui lòng chọn loại sự kiện!' }]}
          >
            <Select placeholder='Chọn loại sự kiện'>
              <Option value='Road Running - Chạy bộ'>Road Running - Chạy bộ</Option>
              <Option value='Trail Running - Chạy địa hình'>Trail Running - Chạy địa hình</Option>
              <Option value='PickerBall'>PickerBall</Option>
              <Option value='Golf'>Golf</Option>
              <Option value='Badminton - Cầu lông'>Badminton - Cầu lông</Option>
              <Option value='Soccer - Đá bóng'>Soccer - Đá bóng</Option>
              <Option value='Cycling - Đạp xe'>Cycling - Đạp xe</Option>
              <Option value='Basketball - Bóng chuyền'>Basketball - Bóng chuyền</Option>
              <Option value='Other - Khác'>Other - Khác</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='album_slug'
            label='Slug sự kiện'
            rules={[{ required: true, message: 'Vui lòng nhập slug sự kiện!' }]}
          >
            <Input placeholder='Nhập slug sự kiện' />
          </Form.Item>
          <Form.Item
            name='event_date'
            label='Thời gian diễn ra'
            rules={[{ required: true, message: 'Vui lòng chọn thời gian!' }]}
            getValueProps={(value) => ({ value })}
          >
            <DatePicker placeholder='Chọn thời gian diễn ra' style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name='location'
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm!' }]}
            label='Địa điểm diễn ra'
          >
            <Input placeholder='Nhập vào địa điểm sự kiện' />
          </Form.Item>
        </div>
        <div className='flex justify-end gap-2'>
          <Button
            size='large'
            className='bg-white text-[#275FC1] border-[#275FC1] border-2 font-bold'
            htmlType='submit'
          >
            Lưu lại
          </Button>
          <Button
            size='large'
            className='bg-[#275FC1] text-white border-[#275FC1] border-2 font-bold'
            htmlType='submit'
          >
            Tiếp tục
          </Button>
        </div>
        <Form.Item name='album_image_url'></Form.Item>
      </Form>
    </div>
  )
}

export default InsertEvents

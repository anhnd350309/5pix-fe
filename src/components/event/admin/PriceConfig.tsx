import { useState } from 'react'
import { Radio, Input, Button, Select, message, notification } from 'antd'
import { AlbumCreateRequest, AlbumItemResponse } from '@/schemas'
import { createAlbumsPost, updateAlbumsAlbumIdPut } from '@/services/album/album'
import { useRouter } from 'next/router'

const { Option } = Select
interface PriceConfigProps {
  type: string
  event?: AlbumItemResponse
  setIsModalVisible: (value: boolean) => void
  setCurrentPage: (page: number) => void
}
const PriceConfig = ({ event, setIsModalVisible, setCurrentPage, type }: PriceConfigProps) => {
  const router = useRouter()
  const [paymentType, setPaymentType] = useState(event?.is_album_free ? 'free' : 'charge')
  const [price, setPrice] = useState(event?.album_image_price ? event?.album_image_price : 0)
  const [photobookPrice, setPhotobookPrice] = useState(event?.album_price ? event?.album_price : 0)
  const [bank, setBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountHolder, setAccountHolder] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('auto')
  const handleSubmit = async () => {
    if (paymentType === 'charge') {
      if (!price) {
        message.error('Vui lòng nhập giá bán lẻ!')
        return
      }
      if (!photobookPrice) {
        message.error('Vui lòng nhập giá Photobook!')
        return
      }
      if (paymentMethod === 'manual') {
        if (!bank || !accountNumber || !accountHolder) {
          message.error('Vui lòng nhập đầy đủ thông tin tài khoản ngân hàng!')
          return
        }
      }
    }
    const data = {
      paymentType,
      price,
      photobookPrice,
      bank,
      accountNumber,
      accountHolder,
      paymentMethod,
    }
    console.log('hehe', data)
    if (type === 'add') {
      await handleAdd(data)
    } else {
      await handleSave(data)
    }
  }
  const handleAdd = async (priceData: any) => {
    if (!event || !priceData) {
      console.error('Missing event or price data')
      return
    }

    const payload: AlbumCreateRequest = {
      ...event,
      album_image_price: priceData.price as number,
      album_price: priceData.photobookPrice as number,
      is_album_free: priceData.paymentType === 'charge' ? 0 : 1,
    } as AlbumCreateRequest
    try {
      const response = await createAlbumsPost(payload)
      if (response.code !== '000') {
        message.error('error')
        return
      }
      notification.success({ message: 'Success create' })
      console.log('Event created successfully:', response)
    } catch (error) {
      message.error('error')
    }
    setIsModalVisible(false)
    setCurrentPage(1)
    router.push('/')
  }
  const handleSave = async (priceData: any) => {
    if (!event || !priceData) {
      console.error('Missing event or price data')
      return
    }

    const payload: AlbumCreateRequest = {
      ...event,
      album_image_price: priceData.price as number,
      album_price: priceData.photobookPrice as number,
      is_album_free: priceData.paymentType === 'charge' ? 0 : 1,
    } as AlbumCreateRequest
    updateAlbumsAlbumIdPut(event.id, payload).then(() => {
      notification.success({ message: 'Success update' })
    })

    setIsModalVisible(false)
    setCurrentPage(1)
    router.push('/')
  }
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Phương thức thanh toán</h3>
        <Radio.Group
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className='flex space-x-6'
        >
          <Radio value='charge' className='text-gray-700'>
            Thu phí
          </Radio>
          <Radio value='free' className='text-gray-700'>
            Miễn phí
          </Radio>
        </Radio.Group>
      </div>

      {paymentType === 'charge' && (
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Thiết lập giá bán</h3>
          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Giá bán lẻ/ánh + VND <span className='text-red-500'>*</span>
              </label>
              <Input
                type='number'
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
                placeholder='Nhập giá bán 0 nếu miễn phí'
                className='w-full rounded-md'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Giá/Photobook + VND <span className='text-red-500'>*</span>
              </label>
              <Input
                type='number'
                value={photobookPrice}
                onChange={(e) => setPhotobookPrice(parseFloat(e.target.value) || 0)}
                placeholder='Nhập số lượng 0 nếu không bán Photobook'
                className='w-full rounded-md'
              />
            </div>
            <p className='text-xs text-gray-500 mt-1'>
              Photobook được tính dựa trên giá 1 Photobook, không bao gồm các chi phí khác (nếu có)
              trong trường hợp này.
            </p>
          </div>
        </div>
      )}

      {paymentType === 'charge' && (
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Phương thức nhận thanh toán</h3>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='flex flex-col space-y-4'
          >
            <Radio value='auto' className='text-gray-700'>
              Tự động xác nhận qua 5PIX
            </Radio>
            <Radio value='manual' className='text-gray-700'>
              Thanh toán qua tài khoản cá nhân
            </Radio>
          </Radio.Group>
          {paymentMethod === 'manual' && (
            <div className='mt-4 space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Ngân hàng</label>
                <Select
                  value={bank}
                  onChange={(value) => setBank(value)}
                  placeholder='Chọn ngân hàng'
                  className='w-full rounded-md'
                >
                  <Option value='Vietcombank'>Vietcombank</Option>
                  <Option value='Techcombank'>Techcombank</Option>
                  <Option value='BIDV'>BIDV</Option>
                  <Option value='Vietinbank'>Vietinbank</Option>
                </Select>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Số tài khoản</label>
                <Input
                  type='text'
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder='Nhập số tài khoản'
                  className='w-full rounded-md'
                />
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Chủ tài khoản tài khoản
                </label>
                <Input
                  type='text'
                  value={accountHolder}
                  onChange={(e) => setAccountHolder(e.target.value)}
                  placeholder='Nhập tên chủ tài khoản'
                  className='w-full rounded-md'
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className='flex justify-end space-x-4'>
        <Button onClick={handleSubmit} className='border-blue-600 text-blue-600 hover:bg-blue-50'>
          Lưu lại
        </Button>
        <Button type='primary' className='bg-blue-600 hover:bg-blue-700' onClick={handleSubmit}>
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}

export default PriceConfig

import { useState } from 'react'
import { Radio, Input, Button, Select, message } from 'antd'
import { AlbumItemResponse } from '@/schemas'

const { Option } = Select
interface PriceConfigProps {
  onSavePrice: (value: any) => void
  onFinish: () => void
  event?: AlbumItemResponse
}
const PriceConfig = ({ onSavePrice, onFinish, event }: PriceConfigProps) => {
  const [paymentType, setPaymentType] = useState(event?.is_album_free ? 'free' : 'charge')
  const [price, setPrice] = useState(event?.album_image_price ? event?.album_image_price : '')
  const [photobookPrice, setPhotobookPrice] = useState(event?.album_price ? event?.album_price : '')
  const [bank, setBank] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [accountHolder, setAccountHolder] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('auto')
  const handleSave = () => {
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

    onSavePrice(data)
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
                onChange={(e) => setPrice(e.target.value)}
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
                onChange={(e) => setPhotobookPrice(e.target.value)}
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
        <Button onClick={handleSave} className='border-blue-600 text-blue-600 hover:bg-blue-50'>
          Lưu lại
        </Button>
        <Button
          type='primary'
          className='bg-blue-600 hover:bg-blue-700'
          onClick={() => {
            handleSave()
            onFinish()
          }}
        >
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}

export default PriceConfig

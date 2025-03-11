import { useState } from 'react'
import { Radio, Input, Button } from 'antd'

const PriceConfig = () => {
  const [paymentType, setPaymentType] = useState('charge')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg shadow-md'>
      <div className='mb-6'>
        <h3 className='text-lg font-semibold mb-2'>Phương thức thanh toán</h3>
        <Radio.Group
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className='flex space-x-6'
        >
          <Radio value='free' className='text-gray-700'>
            Miễn phí
          </Radio>
          <Radio value='charge' className='text-gray-700'>
            Thu phí
          </Radio>
        </Radio.Group>
      </div>

      {paymentType === 'charge' && (
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-2'>Thiệt lập giá bán</h3>
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
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
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

      <div className='flex justify-end space-x-4'>
        <Button className='border-blue-600 text-blue-600 hover:bg-blue-50'>Lưu lại</Button>
        <Button type='primary' className='bg-blue-600 hover:bg-blue-700'>
          Hoàn thành
        </Button>
      </div>
    </div>
  )
}

export default PriceConfig

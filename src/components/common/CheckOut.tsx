import React, { useEffect } from 'react'
import { Form, Input, Select, Checkbox, Table, Card } from 'antd'

/**
 * Dữ liệu demo cho bảng "Sản phẩm"
 * Bạn có thể thay thế bằng data động (từ server hoặc state).
 */
import type { ColumnsType } from 'antd/es/table'
import { getImageCollectionCollectionItemGet } from '@/services/image-collection/image-collection'
import { set } from 'react-hook-form'

const columns: ColumnsType<{
  key: string
  product: { image: string; name: string; description: string }
  price: string
  quantity: string
  total: string
}> = [
  {
    title: 'Sản phẩm',
    dataIndex: 'product',
    key: 'product',
    render: (product: any) => (
      <div className='flex items-center'>
        <img
          src={product.image}
          alt={product.name}
          className='w-16 h-16 object-cover rounded-md mr-3'
        />
        <div>
          <p className='font-medium'>{product.name}</p>
          <p className='text-xs text-gray-400'>{product.description}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
  },
  {
    title: 'Tổng',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
  },
]

const data = [
  {
    key: '1',
    product: {
      image: 'https://via.placeholder.com/100x60?text=Photo1',
      name: 'Toàn bộ ảnh của số BIB 70011',
      description: 'Cúc Phương Jungle Path 2023',
    },
    price: '1.000.000 đ',
    quantity: 'x1',
    total: '1.000.000 đ',
  },
  {
    key: '2',
    product: {
      image: 'https://via.placeholder.com/100x60?text=Photo2',
      name: 'CRP1324325',
      description: 'Cúc Phương Jungle Path 2023',
    },
    price: '15.000 đ',
    quantity: 'x1',
    total: '15.000 đ',
  },
  {
    key: '3',
    product: {
      image: 'https://via.placeholder.com/100x60?text=Photo3',
      name: 'CRP1324325',
      description: 'Cúc Phương Jungle Path 2023',
    },
    price: '15.000 đ',
    quantity: 'x1',
    total: '15.000 đ',
  },
]

interface CheckoutInfoProps {
  isLoading: boolean
}
export default function CheckoutInfo({ isLoading }: CheckoutInfoProps) {
  const [form] = Form.useForm()

  // Tạo prefix cho số điện thoại (mã vùng), ví dụ +84
  const prefixSelector = (
    <Form.Item name='prefix' noStyle initialValue='+84'>
      <Select style={{ width: 70 }}>
        <Select.Option value='+84'>+84</Select.Option>
        <Select.Option value='+1'>+1</Select.Option>
        <Select.Option value='+86'>+86</Select.Option>
        {/* Thêm các mã vùng khác nếu cần */}
      </Select>
    </Form.Item>
  )

  return (
    <div className='max-w-3xl w-full '>
      <Card className='shadow rounded-lg'>
        <h2 className='text-lg font-semibold mb-4'>Sản phẩm</h2>
        <hr className='mb-4 border-gray-200' />
        <div className='overflow-x-auto'>
          <Table
            scroll={{ x: 'max-content' }}
            columns={columns}
            dataSource={data}
            pagination={false}
            className='antd-table-custom'
            loading={isLoading}
          />
        </div>
      </Card>
    </div>
  )
}

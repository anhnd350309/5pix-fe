import React from 'react'
import { Form, Table, Card } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ItemResponse } from '@/schemas'

interface Product {
  album_image_url: string
  name: string
  price: number
  album_name?: string
  key: string
}

const columns: ColumnsType<Product> = [
  {
    title: 'Hình ảnh',
    dataIndex: 'album_image_url',
    key: 'album_image_url',
    render: (album_image_url: string) => (
      <img src={album_image_url} alt='Product' className='w-16 h-16 object-cover rounded-md' />
    ),
  },
  {
    title: 'Tên sản phẩm',
    dataIndex: 'name',
    key: 'name',
  },
  // {
  //   title: 'Tên album',
  //   dataIndex: 'album_name',
  //   key: 'album_name',
  // },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: (price: number) => `${price.toLocaleString('vi-VN')} đ`,
  },
]

interface CheckoutInfoProps {
  isLoading: boolean
  price?: number
  items?: ItemResponse[]
  album_name?: string
}
export default function CheckoutInfo({ isLoading, price, items, album_name }: CheckoutInfoProps) {
  const [form] = Form.useForm()
  const data: Product[] = isLoading
    ? [
        {
          album_image_url: '',
          name: '',
          price: 0,
          album_name: '',
          key: 'loading', // Important: Provide a key
        },
      ]
    : items
        ?.map((item, index) => ({
          album_image_url: item.album_image_url || '',
          name: item.album_image_name || '',
          price: price || 0,
          album_name: album_name || '',
          key: String(index),
        }))
        .filter((item) => item.album_image_url && item.name) || []
  // Tạo prefix cho số điện thoại (mã vùng), ví dụ +84
  // const prefixSelector = (
  //   <Form.Item name='prefix' noStyle initialValue='+84'>
  //     <Select style={{ width: 70 }}>
  //       <Select.Option value='+84'>+84</Select.Option>
  //       <Select.Option value='+1'>+1</Select.Option>
  //       <Select.Option value='+86'>+86</Select.Option>
  //       {/* Thêm các mã vùng khác nếu cần */}
  //     </Select>
  //   </Form.Item>
  // )

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

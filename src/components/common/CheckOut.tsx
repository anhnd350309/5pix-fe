import React from 'react'
import { Form, Table, Card } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CollectionImageWithQueryResponseImageQueries, ItemResponse } from '@/schemas'

interface Product {
  album_image_url: string
  name: string
  price: number
  album_name?: string
  key: string
  type: string
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
    render: (name: string) => <>{`${name.slice(0, 14)}...${name.slice(-10)}`}</>,
  },
  {
    title: 'Loại sản phẩm',
    dataIndex: 'type',
    key: 'type',
  },
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
  albums?: CollectionImageWithQueryResponseImageQueries
  album_price: number
}
export default function CheckoutInfo({
  isLoading,
  price,
  items,
  album_name,
  albums,
  album_price,
}: CheckoutInfoProps) {
  const [form] = Form.useForm()
  console.log(albums)
  const data: Product[] = isLoading
    ? [
        {
          album_image_url: '',
          name: '',
          price: 0,
          album_name: '',
          key: 'loading',
          type: 'Ảnh đơn',
        },
      ]
    : [
        ...(Array.isArray(albums)
          ? albums.map((album, index) => ({
              album_image_url: '/assets/images/FormMerchant.png',
              name: `Photobook của bib ${album.keyword}`,
              price: album_price || 0,
              album_name: album_name || '',
              key: `album-${index}`,
              type: 'Photobook',
            }))
          : []),
        ...(items || []).map((item, index) => ({
          album_image_url: item.album_image_url || '',
          name: item.album_image_name || '',
          price: price || 0,
          album_name: album_name || '',
          key: `item-${index}`,
          type: 'Ảnh đơn',
        })),
      ].filter((item) => item.name) // Remove filter for album_image_url

  return (
    <div className='max-w-3xl w-full '>
      <Card className='shadow rounded-lg'>
        <h2 className='text-lg font-semibold mb-4'>Sản phẩm của album: {album_name}</h2>
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

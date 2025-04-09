import React from 'react'
import { List, Button } from 'antd'
import SvgNoCart from '@/components/icons/icons/NoCart'
import { useRouter } from 'next/router'

/**
 * Ví dụ mảng dữ liệu giỏ hàng.
 * Bạn có thể lấy dữ liệu thực tế từ server hoặc state trong ứng dụng của mình.
 */
const cartData = [
  {
    id: 1,
    title: 'Photofull',
    subTitle: 'Toàn bộ ảnh của sự kiện BIB 70011',
    eventName: 'Cúc Phương Jungle Path 2023',
    price: '1.000.000 đ',
    imageUrl: 'https://via.placeholder.com/120x80?text=Photo+1', // Thay link ảnh thật
  },
  {
    id: 2,
    title: 'Ảnh đơn',
    subTitle: 'CRP1324325',
    eventName: 'Cúc Phương Jungle Path 2023',
    price: '15.000 đ',
    imageUrl: 'https://via.placeholder.com/120x80?text=Photo+2', // Thay link ảnh thật
  },
  {
    id: 3,
    title: 'Ảnh đơn',
    subTitle: 'CRP1324325',
    eventName: 'Cúc Phương Jungle Path 2023',
    price: '15.000 đ',
    imageUrl: 'https://via.placeholder.com/120x80?text=Photo+3', // Thay link ảnh thật
  },
]

// Giả sử tổng tiền là 1.030.000 đ.
// Tất nhiên, bạn có thể tính động dựa trên các item trong giỏ hàng.
const total = '1.030.000 đ'

/**
 * Component CartPage (ví dụ)
 */
export default function CartPage() {
  const router = useRouter()
  return (
    <div
      className=' py-8 px-4 w-[100vw]'
      style={{ background: 'linear-gradient(to bottom, #FFFFFF, #E1F4FF)' }}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Tiêu đề trang giỏ hàng */}
        <h1 className='text-xl font-semibold mb-6'>Giỏ hàng</h1>
        <hr className='mb-4 border-gray-200' />
        {/* Danh sách sản phẩm trong giỏ */}
        <List
          itemLayout='horizontal'
          dataSource={cartData}
          renderItem={(item) => (
            <List.Item className='mb-4 bg-white rounded-lg shadow p-4 items-center'>
              <List.Item.Meta
                // Phần avatar hiển thị ảnh
                avatar={
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className='w-24 h-24 object-cover rounded-md'
                  />
                }
                // Phần title (Photofull / Ảnh đơn, ...)
                title={<span className='text-blue-500 text-base font-medium'>{item.title}</span>}
                // Phần description
                description={
                  <div>
                    <p className='text-sm text-gray-700'>{item.subTitle}</p>
                    <p className='text-sm text-gray-400'>{item.eventName}</p>
                  </div>
                }
              />

              {/* Giá tiền */}
              <div className='flex flex-col justify-center items-end'>
                <p className='text-blue-500 font-bold'>{item.price}</p>
              </div>
            </List.Item>
          )}
          locale={{
            emptyText: (
              <div className='flex flex-col text-center py-8 items-center gap-3'>
                <SvgNoCart width={128} />
                <p className='text-gray-500'>Chưa có sản phẩm trong giỏ hàng</p>
                <Button type='primary' className='rounded-full'>
                  Tìm kiếm ảnh ngay
                </Button>
              </div>
            ),
          }}
        />

        {/* Khối tổng tiền + nút thanh toán */}
        <div className='bg-white rounded-lg shadow p-4 flex justify-between items-center'>
          <div>
            <p className='text-sm text-gray-500'>Tổng tiền</p>
            <p className='text-xl font-bold text-blue-500'>{total}</p>
            <p className='text-xs text-gray-400 mt-1'>
              (Không có mã khuyến mại, bạn có thể áp dụng ở trang thanh toán)
            </p>
          </div>
          <Button
            type='primary'
            className='rounded-full px-8 py-2'
            onClick={() => router.push('/checkout/pay')}
          >
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  )
}

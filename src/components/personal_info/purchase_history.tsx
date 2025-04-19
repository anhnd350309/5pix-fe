import { CreateOrderResponse, ItemResponse } from '@/schemas'
import { listOrdersOrderListGet } from '@/services/order/order'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Card, Pagination, Tag, Spin } from 'antd'
import { use, useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { getImageCollectionCollectionItemGet } from '@/services/image-collection/image-collection'
import router from 'next/router'
import dayjs from 'dayjs'
import useCurrency from '@/hooks/useCurrency'
interface Transaction {
  id: string
  event: string
  code: string
  time: string
  date: string
  photos: string[]
  prices: number[]
  total: number
  status: 'success' | 'pending'
}

interface Transactions {
  order: CreateOrderResponse
  data: ItemResponse[]
}

const statusMap = {
  NEW: { text: 'Mới', color: 'blue' },
  WAIT_FOR_PAYMENT: { text: 'Chờ thanh toán', color: 'orange' },
  PROCESSING: { text: 'Đang xử lý', color: 'geekblue' },
  PAY_GATE_FAIL: { text: 'Thanh toán thất bại', color: 'red' },
  COMPLETE: { text: 'Hoàn thành', color: 'green' },
  CANCELLED: { text: 'Đã hủy', color: 'gray' },
}

export const PurchaseHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [transactions, setTransactions] = useState<Transactions[]>([]) // Changed state type
  const [totalTransactions, setTotalTransactions] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const pageSize = 5
  const formatter = useCurrency('đ')
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const orderListData = await listOrdersOrderListGet({
          page: currentPage,
          page_size: pageSize,
        })
        console.log('orderListData', orderListData)
        if (orderListData?.data) {
          setTotalTransactions(orderListData.metadata.total_items)

          const transactionsPromises = orderListData.data.map(async (order) => {
            try {
              const imageCollectionData = await getImageCollectionCollectionItemGet({
                collection_id: order.first_line_collection_id,
              })

              return {
                order: order,
                data: imageCollectionData, // Assuming imageCollectionData.data is the ItemResponse[]
              }
            } catch (error) {
              console.error(`Error fetching image collection for order ${order.id}:`, error)
              return {
                order: order,
                data: [], // Return empty array in case of error
              }
            }
          })

          const transactionsWithImages = await Promise.all(transactionsPromises)
          console.log('transactionsWithImages', transactionsWithImages)
          setTransactions(transactionsWithImages)
        }
      } catch (error) {
        console.error('Error fetching order list:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [currentPage, pageSize])

  return (
    <div className='space-y-4 font-sans'>
      {/* Header */}
      <Card className='flex justify-between items-center shadow'>
        <div className='flex items-center gap-2 text-lg font-semibold'>
          <ShoppingCartOutlined style={{ fontSize: '24px', color: '#2563EB' }} />
          Lịch sử mua hàng
        </div>
      </Card>
      {totalTransactions > 0 ? (
        <div className='text-sm text-gray-500'>Tổng số giao dịch: {totalTransactions}</div>
      ) : (
        <div className='text-sm text-gray-500'>Chưa có giao dịch nào.</div>
      )}

      {loading ? (
        <div className='flex justify-center items-center h-32'>
          <Spin size='large' />
        </div>
      ) : (
        <div className='space-y-4'>
          {transactions.map((tx, idx) => {
            const status = statusMap[tx.order.internal_status as keyof typeof statusMap] || {
              text: 'Không xác định',
              color: 'default',
            }
            const price = (tx.order.line_items?.[0]?.line_price ?? 0) / (tx.data.length || 1)
            return (
              <Card
                key={idx}
                className='shadow border border-gray-100 font-sans'
                onClick={() => {
                  router.push(`/orders/${tx.order.id}`)
                }}
              >
                <div className='flex justify-between items-start'>
                  <div className='flex flex-col space-y-1'>
                    <span className='font-semibold'>{tx.data[0].name}</span>
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-gray-500 pr-10'>{tx.order.name}</span>
                      <span className='text-xs text-gray-500'>
                        {dayjs(tx.order.updated_at).format('HH:mm • DD/MM/YYYY')}
                      </span>
                    </div>
                  </div>
                  <Tag color={status.color}>{status.text}</Tag>
                </div>

                {/* Giá và tổng tiền */}

                <div className='border-t mt-4 pt-2 text-sm'>
                  <div className='text-sm mt-2'>
                    {tx.data.map((photo, idx) => (
                      <div className='flex items-center justify-between' key={idx}>
                        <div key={idx} className='text-gray-600'>
                          {photo.album_image_name}
                        </div>
                        <div key={idx} className='text-gray-600'>
                          {formatter(price)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='font-bold text-green-600 text-base mt-1 text-right'>
                    Tổng tiền:{' '}
                    {tx.order.line_items?.[0]?.line_price?.toLocaleString('vi-VN') ?? '0'} VND
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Pagination */}
      <div className='flex justify-center mt-4'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalTransactions}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

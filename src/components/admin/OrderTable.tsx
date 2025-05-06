import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Tabs, Input, DatePicker, Space, Spin } from 'antd'
import { UserOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons'
import { listOrdersOrderListGet } from '@/services/order/order'
import {
  CollectionImageWithQueryResponse,
  CreateOrderResponse,
  GetMerchantsGetParams,
  ListOrdersOrderListGetParams,
} from '@/schemas'
import moment from 'moment'
import { statusOrderMapping } from '@/constants/mapping'
import useCurrency from '@/hooks/useCurrency'
import { getImageCollectionCollectionItemGet } from '@/services/image-collection/image-collection'
const { RangePicker } = DatePicker
const { TabPane } = Tabs

interface OrderDetail {
  orderCreationTime: string
  paymentTime: string
  email: string
  subtotal: string
  discount: string
  totalAmount: string
  note: string
}

interface OrderData {
  key: string
  orderId: string
  purchaseDate: string
  customer: string
  username: string
  album: string
  totalAmount: string
  status: string
  details?: OrderDetail
}

const OrderTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [searchText, setSearchText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loadedOrders, setLoadedPOrders] = useState<CreateOrderResponse[]>([])
  const formatter = useCurrency('đ')
  const [detailOrder, setDetailOrder] = useState<CollectionImageWithQueryResponse | null>(null)
  const [totalOrders, setTotalOrders] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingDetail, setIsLoadingDetail] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string) => {
        return moment(text).format('HH:mm • DD/MM/YYYY')
      },
    },
    {
      title: 'Username',
      dataIndex: 'owner_email',
      key: 'owner_email',
    },
    {
      title: 'Album',
      dataIndex: 'first_line_album_id',
      key: 'first_line_album_id',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      render: (_: unknown, record: any) => {
        const totalPrice = record.line_items?.reduce(
          (sum: number, item: any) => sum + item.line_price,
          0,
        )
        return `${formatter(totalPrice)} `
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'internal_status',
      key: 'internal_status',
      render: (text: string) => {
        const status = statusOrderMapping[text] || { text: 'Không xác định', color: 'default' }
        return <Tag color={status.color}>{status.text}</Tag>
      },
    },
  ]

  const expandedRowRender = (record: CreateOrderResponse) => {
    if (isLoadingDetail) {
      return <Spin />
    }

    if (!detailOrder) {
      return <div>Không có thông tin chi tiết.</div>
    }
    console.log(detailOrder)
    const imageGroups = detailOrder.image_queries ?? {}
    const images = detailOrder.images ?? []
    return (
      <div className='p-6 bg-white shadow-md rounded-lg border border-gray-200 relative'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
          <div className='flex items-center space-x-2'>
            <span className='font-sans font-bold text-[14px] leading-[20px] tracking-[-0.2%] text-blue-600'>
              Information
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-20 mb-6'>
          <div className='flex flex-col space-y-4 col-span-2'>
            <p className='font-sans font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong> Order ID:</strong> {record.id}
            </p>
            <p className='font-sans font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Order Creation Time:</strong> {record.created_at}
            </p>
            <p className='font-sans font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Payment Time:</strong> {record.updated_at}
            </p>
            <p className='font-sans font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Email:</strong> {record.owner_email}
            </p>
          </div>

          <div className='flex flex-col space-y-4 col-span-3'>
            <p className='font-sans font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Order Status:</strong>
              <Tag color={statusOrderMapping[record.internal_status ?? 'unknown']?.color}>
                {statusOrderMapping[record.internal_status ?? 'unknown']?.text || 'Không xác định'}
              </Tag>
            </p>
          </div>
        </div>
        <div className='space-y-4'>
          {images.map((item, index) => (
            <div
              key={index}
              className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'
            >
              <div className='flex items-center'>
                <img
                  src={item.album_image_url}
                  alt={item.album_image_name}
                  className='w-12 h-12 rounded-lg object-cover mr-4'
                />
                <div>
                  <div className='font-semibold'>{item.album_image_name}</div>
                  <div className='text-sm text-gray-500 truncate w-[200px]'>Ảnh đơn</div>
                </div>
              </div>
              <div className='font-semibold whitespace-nowrap'>
                {formatter(record.line_items?.[0]?.album_image_price ?? 0)}
              </div>
            </div>
          ))}
          {Object.entries(imageGroups).map(([key, images]) => (
            <div
              key={key}
              className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'
            >
              <div>
                <div className='font-semibold'>{images[0].album_name}</div>
                <div className='text-sm text-gray-500 truncate w-[200px]'>
                  {/* {image.album_image_name} */}
                  Photobook của số bib {key}
                </div>
              </div>
              <div className='font-semibold whitespace-nowrap'>
                {formatter(record.line_items?.[0]?.album_price ?? 0)}
              </div>
              {/* {images.map((image) => (
                <div
                  key={image.id}
                  className='flex items-center justify-between bg-white p-4 rounded-lg shadow-sm'
                >
                  <div className='flex items-center'>
                    <img
                      src={image.album_image_url}
                      alt={image.album_image_name}
                      className='w-12 h-12 rounded-lg object-cover mr-4'
                    />
                    <div>
                      <div className='font-semibold'>{image.album_name}</div>
                      <div className='text-sm text-gray-500 truncate w-[200px]'>
                        {image.album_image_name}
                      </div>
                    </div>
                  </div>
                  <div className='font-semibold whitespace-nowrap'>
                    {formatter(record.line_items?.[0]?.album_price ?? 0)}
                  </div>
                </div>
              ))} */}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleTabChange = (key: string) => {
    setActiveTab(key)
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  const fetchOrders = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params: ListOrdersOrderListGetParams = {
        page: currentPage,
        page_size: 10,
        ...(activeTab !== 'all' ? { internal_statues: activeTab } : {}),
      }
      const response = await listOrdersOrderListGet(params)
      const orders = response.data
      console.log(orders)
      setLoadedPOrders(orders)
      setTotalOrders(response.metadata.total_items)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchOrders()
  }, [currentPage, activeTab])
  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!selectedRow) {
        setDetailOrder(null)
        return
      }

      setIsLoadingDetail(true)
      setError(null)

      try {
        const response = await getImageCollectionCollectionItemGet({
          collection_id: parseInt(selectedRow, 10),
        })
        const detail = response
        if (detail) {
          setDetailOrder(detail)
        } else {
          setDetailOrder(null)
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setIsLoadingDetail(false)
      }
    }

    fetchUserDetail()
    console.log('Selected row:', selectedRow)
  }, [selectedRow])
  return (
    <div className='container mx-auto p-4'>
      <Tabs defaultActiveKey='all' onChange={handleTabChange}>
        <TabPane tab='Tất cả' key='' />
        <TabPane tab='Hoàn thành' key='COMPLETE' />
        <TabPane tab='Đang xử lý' key='PROCESSING' />
        <TabPane tab='Chờ xác nhận thanh toán' key='WAIT_FOR_PAYMENT' />
        <TabPane tab='Thanh toán lỗi' key='PAY_GATE_FAIL' />
        <TabPane tab='Đã hủy' key='CANCELLED' />
      </Tabs>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center my-4 gap-4'>
        <Input
          placeholder='Order ID, Email, Customer Name, Phone Number'
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          className='w-full sm:w-1/2'
        />
        <Space className='w-full sm:w-auto flex flex-col sm:flex-row gap-4'>
          <RangePicker showTime format='HH:mm:ss - DD/MM/YYYY' className='w-full sm:w-auto' />
          <Button className='w-full sm:w-auto'>Reset</Button>
        </Space>
      </div>
      <Table
        scroll={{ x: 'max-content' }}
        rowKey={(record) =>
          record.first_line_collection_id?.toString() ?? `temp-key-${Math.random()}`
        }
        loading={isLoading}
        bordered
        columns={columns}
        dataSource={loadedOrders}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
          onExpand: (expanded: boolean, record: CreateOrderResponse) =>
            setSelectedRow(expanded ? record.first_line_collection_id?.toString() || null : null),
          expandedRowKeys: selectedRow ? [selectedRow] : [],
        }}
        pagination={{
          current: currentPage,
          onChange: (page) => {
            setCurrentPage(page)
          },
          pageSize: 10,
          total: totalOrders ?? 0,
          showSizeChanger: false,
        }}
        className='shadow-md rounded-lg custom-table'
      />
    </div>
  )
}

export default OrderTable

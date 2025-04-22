import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Tabs, Input, DatePicker, Space } from 'antd'
import { UserOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons'
import { listOrdersOrderListGet } from '@/services/order/order'
import { CreateOrderResponse, GetMerchantsGetParams, ListOrdersOrderListGetParams } from '@/schemas'
import moment from 'moment'
import { statusOrderMapping } from '@/constants/mapping'
import useCurrency from '@/hooks/useCurrency'
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
  const [totalOrders, setTotalOrders] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
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

  const expandedRowRender = (record: OrderData) => {
    if (!record.details) return null
    return (
      <div className='p-6 bg-white shadow-md rounded-lg border border-gray-200 relative'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4'>
          <div className='flex items-center space-x-2'>
            <span className='font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%] text-blue-600'>
              Information
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-20 mb-6'>
          <div className='flex flex-col space-y-4 col-span-2'>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong> Order ID:</strong> {record.orderId}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Order Creation Time:</strong> {record.details.orderCreationTime}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Payment Time:</strong> {record.details.paymentTime}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Email:</strong> {record.details.email}
            </p>
          </div>

          <div className='flex flex-col space-y-4 col-span-3'>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Order Status:</strong>
              <Tag color='green' className='font-inter font-medium text-[14px] w-24 col-span-3'>
                {record.status}
              </Tag>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Album:</strong>{' '}
              <div className='col-span-3'>{record.album}</div>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Note:</strong>{' '}
              <div className='col-span-3'>{record.details.note}</div>
            </p>
          </div>
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
        loading={isLoading}
        bordered
        columns={columns}
        dataSource={loadedOrders}
        // expandable={{
        //   expandedRowRender,
        //   expandRowByClick: true,
        //   onExpand: (expanded: boolean, record: OrderData) =>
        //     setSelectedRow(expanded ? record.key : null),
        //   expandedRowKeys: selectedRow ? [selectedRow] : [],
        // }}
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

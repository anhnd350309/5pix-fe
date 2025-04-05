import React, { useState } from 'react'
import { Table, Tag, Button, Tabs, Input, DatePicker, Space } from 'antd'
import { UserOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons'

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

  const dataSource: OrderData[] = [
    {
      key: '1',
      orderId: 'SBIB00001',
      purchaseDate: '10h03 - 15/04/2023',
      customer: 'Minh Danny',
      username: 'MinhDanny@gmail.com',
      album: '10km Coros',
      totalAmount: '12,000,000 đ',
      status: 'Hoàn thành',
    },
    {
      key: '2',
      orderId: 'SBIB00002',
      purchaseDate: '10h03 - 15/04/2023',
      customer: 'Minh Danny',
      username: 'MinhDanny@gmail.com',
      album: '10km Coros',
      totalAmount: '12,000,000 đ',
      status: 'Hoàn thành',
    },
    {
      key: '3',
      orderId: 'SBIB-RJ-0001',
      purchaseDate: '12:23:00 - 15/04/2023',
      customer: 'Anh đan',
      username: 'minhth@gmail.com',
      album: 'Marathon Quốc Tế Mekong Delta',
      totalAmount: '9,000,000 đ',
      status: 'Hoàn thành',
      details: {
        orderCreationTime: '12:23:00 - 15/04/2023',
        paymentTime: '13:00:00 - 15/04/2023',
        email: 'minhth@gmail.com',
        subtotal: '18,000,000 đ',
        discount: '18,000,000 đ',
        totalAmount: '18,000,000 đ',
        note: 'Lorem ipsum dolor sit amet consectetur. Varius accumsan sem nunc lectus viverra. Ut efficitur mauris ut sagittis.',
      },
    },
  ]

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Album',
      dataIndex: 'album',
      key: 'album',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: string) => (
        <Tag color={text === 'Hoàn thành' ? 'green' : 'default'}>{text}</Tag>
      ),
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

  return (
    <div className='container mx-auto p-4'>
      <Tabs defaultActiveKey='all' onChange={handleTabChange}>
        <TabPane tab='Tất cả' key='all' />
        <TabPane tab='Hoàn thành' key='completed' />
        <TabPane tab='Chờ xác nhận thanh toán' key='pending' />
        <TabPane tab='Đã đóng' key='closed' />
        <TabPane tab='Đã hủy' key='cancelled' />
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
        bordered
        columns={columns}
        dataSource={dataSource
          .filter((item) => {
            if (activeTab === 'all') return true
            if (activeTab === 'completed' && item.status === 'Hoàn thành') return true
            if (activeTab === 'pending' && item.status === 'Pending Payment Confirmation')
              return true
            if (activeTab === 'closed' && item.status === 'Closed') return true
            if (activeTab === 'cancelled' && item.status === 'Cancelled') return true
            return false
          })
          .filter((item) => {
            return (
              item.orderId.includes(searchText) ||
              item.customer.includes(searchText) ||
              item.username.includes(searchText)
            )
          })}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
          onExpand: (expanded: boolean, record: OrderData) =>
            setSelectedRow(expanded ? record.key : null),
          expandedRowKeys: selectedRow ? [selectedRow] : [],
        }}
        pagination={{
          pageSize: 10,
          total: 200,
          showSizeChanger: false,
        }}
        className='shadow-md rounded-lg custom-table'
      />
    </div>
  )
}

export default OrderTable

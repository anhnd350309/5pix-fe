import React, { useState } from 'react'
import { Table, Tag, Button, Tabs, Input, DatePicker, Space } from 'antd'
import { UserOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker
const { TabPane } = Tabs

interface UserDetail {
  birthDate: string
  email: string
  socialMediaLink: string
  demoFolderLink: string
  teamsParticipated: string
  platformFee: string
  creditDiscount: string
  experienceYears: string
}

interface UserData {
  key: string
  customer: string
  username: string
  phone: string
  type: string
  status: string
  details?: UserDetail
}

const UserTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [searchText, setSearchText] = useState<string>('')

  const dataSource: UserData[] = [
    {
      key: '1',
      customer: 'Minh Danny',
      username: 'MinhDanny@gmail.com',
      phone: '0123456789',
      type: 'Doanh nghiệp',
      status: 'Hoàn thành',
      details: {
        birthDate: '12:23:00 - 15/04/2023',
        email: 'minhnb@gmail.com',
        socialMediaLink: 'https://www.facebook.com/DannyMNB',
        demoFolderLink:
          'https://drive.google.com/drive/u/3/folders/1lSN2Tq6Tl0X6zLneYVvrVK_CNpxfdM6Q',
        teamsParticipated: '5PIX',
        platformFee: '25%',
        creditDiscount: '0%',
        experienceYears: '1 năm',
      },
    },
    {
      key: '2',
      customer: 'Anh Đan',
      username: 'AnhDan@gmail.com',
      phone: '0987654321',
      type: 'Cá nhân',
      status: 'Chờ xác nhận thanh toán',
      details: {
        birthDate: '10:00:00 - 01/01/2023',
        email: 'anhdan@gmail.com',
        socialMediaLink: 'https://www.facebook.com/AnhDan',
        demoFolderLink:
          'https://drive.google.com/drive/u/3/folders/1lSN2Tq6Tl0X6zLneYVvrVK_CNpxfdM6Q',
        teamsParticipated: 'Team A',
        platformFee: '20%',
        creditDiscount: '5%',
        experienceYears: '2 năm',
      },
    },
    {
      key: '3',
      customer: 'Nguyễn Văn A',
      username: 'NguyenVanA@gmail.com',
      phone: '0912345678',
      type: 'Cá nhân',
      status: 'Đã đóng',
      details: {
        birthDate: '08:00:00 - 20/05/2022',
        email: 'nguyenvana@gmail.com',
        socialMediaLink: 'https://www.facebook.com/NguyenVanA',
        demoFolderLink:
          'https://drive.google.com/drive/u/3/folders/1lSN2Tq6Tl0X6zLneYVvrVK_CNpxfdM6Q',
        teamsParticipated: 'Team B',
        platformFee: '15%',
        creditDiscount: '10%',
        experienceYears: '3 năm',
      },
    },
  ]

  const columns = [
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
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Loại hình đăng ký',
      dataIndex: 'type',
      key: 'type',
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

  const expandedRowRender = (record: UserData) => {
    if (!record.details) return null
    return (
      <div className='relative'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center space-x-2'>
            <span className='font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%] text-blue-600'>
              Information
            </span>
          </div>
        </div>
        <div className='p-6 grid grid-cols-2 gap-4 bg-white border border-gray-200 shadow-md rounded-lg'>
          <div className='flex flex-col space-y-2'>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Họ và tên:</strong> {record.customer}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Ngày sinh:</strong> {record.details.birthDate}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Email:</strong> {record.details.email}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>SDT:</strong> {record.phone}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Loại hình đăng ký:</strong> {record.type}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Số năm kinh nghiệm:</strong> {record.details.experienceYears}
            </p>
          </div>
          <div className='flex flex-col space-y-2'>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Link social media:</strong>
              <a
                href={record.details.socialMediaLink}
                target='_blank'
                rel='noopener noreferrer'
                className='col-span-2'
              >
                {record.details.socialMediaLink}
              </a>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Link thư mục demo:</strong>
              <a
                href={record.details.demoFolderLink}
                target='_blank'
                rel='noopener noreferrer'
                className='col-span-3'
              >
                {record.details.demoFolderLink}
              </a>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Các team từng tham gia:</strong>
              <div className='col-span-3'>{record.details.teamsParticipated}</div>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Trạng thái đơn hàng:</strong>
              <Tag color='green' className='w-24 col-span-3'>
                {record.status}
              </Tag>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Phí nền tảng:</strong>{' '}
              <div className='col-span-3'>{record.details.platformFee}</div>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Giảm giá credit:</strong>
              <div className='col-span-3'>{record.details.creditDiscount}</div>
            </p>
          </div>
        </div>
        <div className='flex justify-end mt-4'>
          <Button className='mr-2' type='default'>
            Vô hiệu
          </Button>
          <Button type='primary'>Chỉnh sửa</Button>
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
      <div className='flex justify-between items-center my-4'>
        <Input
          placeholder='Order ID, Email, Customer Name, Phone Number'
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={handleSearch}
          className='w-1/2'
        />
        <Space>
          <RangePicker showTime format='HH:mm:ss - DD/MM/YYYY' />
          <Button>Reset</Button>
        </Space>
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource
          .filter((item) => {
            if (activeTab === 'all') return true
            if (activeTab === 'completed' && item.status === 'Hoàn thành') return true
            if (activeTab === 'pending' && item.status === 'Chờ xác nhận thanh toán') return true
            if (activeTab === 'closed' && item.status === 'Đã đóng') return true
            if (activeTab === 'cancelled' && item.status === 'Đã hủy') return true
            return false
          })
          .filter((item) => {
            return (
              item.customer.includes(searchText) ||
              item.username.includes(searchText) ||
              item.phone.includes(searchText)
            )
          })}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
          onExpand: (expanded: boolean, record: UserData) =>
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

export default UserTable

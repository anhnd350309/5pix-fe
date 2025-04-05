import React, { useEffect, useState } from 'react'
import { Table, Tag, Button, Tabs, Input, DatePicker, Space, Spin } from 'antd'
import { UserOutlined, MailOutlined, SearchOutlined } from '@ant-design/icons'
import { GetMerchantsGetParams, MerchantDetailResponse, MerchantItemResponse } from '@/schemas'
import { detailMerchantsMerchantIdGet, getMerchantsGet } from '@/services/merchants/merchants'
import { merchantTypeMapping, statusMapping } from '@/constants/mapping'

const { RangePicker } = DatePicker
const { TabPane } = Tabs

interface UserTableProps {
  // Các props khác nếu có
}

const UserTable: React.FC<UserTableProps> = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState<string>('all')
  const [searchText, setSearchText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loadedUsers, setLoadedUsers] = useState<MerchantItemResponse[]>([])
  const [detailUser, setDetailUser] = useState<MerchantDetailResponse | null>(null)
  const [isLoadingDetail, setIsLoadingDetail] = useState(false) // State riêng cho loading detail

  const [totalUsers, setTotalUsers] = useState<number | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const params: GetMerchantsGetParams = {
          page: currentPage,
          page_size: 10,
          merchant_active_status: activeTab !== 'all' ? activeTab : undefined,
        }
        const response = await getMerchantsGet(params)
        const newUsers = response.data
        setLoadedUsers(newUsers)
        setTotalUsers(response.metadata.total_items)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [currentPage, activeTab])

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!selectedRow) {
        setDetailUser(null) // Reset detailUser khi không có selectedRow
        return
      }

      setIsLoadingDetail(true)
      setError(null)

      try {
        const response = await detailMerchantsMerchantIdGet(selectedRow)
        const detail = response.data
        if (detail) {
          setDetailUser(detail)
        } else {
          setDetailUser(null)
        }
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setIsLoadingDetail(false)
      }
    }

    fetchUserDetail()
  }, [selectedRow])

  const columns = [
    {
      title: 'Khách hàng',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Username',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: 'Loại hình đăng ký',
      dataIndex: 'merchant_type',
      key: 'merchant_type',
      render: (text: string) => {
        const merchantTypeText = merchantTypeMapping[text] || 'Không xác định'
        return <span>{merchantTypeText}</span>
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'merchant_active_status',
      key: 'merchant_active_status',
      render: (text: string) => {
        const status = statusMapping[text] || { text: 'Không xác định', color: 'default' }
        return <Tag color={status.color}>{status.text}</Tag>
      },
    },
  ]

  const expandedRowRender = (record: MerchantDetailResponse) => {
    console.log(record)
    if (isLoadingDetail) {
      return <Spin /> // Hiển thị loading khi đang tải detail
    }

    if (!detailUser || detailUser.id !== record.id) {
      return <div>Không có thông tin chi tiết.</div> // Hoặc một thông báo khác
    }

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
              <strong>Họ và tên:</strong> {detailUser.full_name}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Ngày sinh:</strong> {detailUser.date_of_birth}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Email:</strong> {detailUser.email}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>SDT:</strong> {detailUser.phone_number}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Loại hình đăng ký:</strong> {merchantTypeMapping[detailUser.merchant_type]}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Số năm kinh nghiệm:</strong> {detailUser.years_of_experience}
            </p>
          </div>
          <div className='flex flex-col space-y-2'>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Link social media:</strong>
              <a
                href={detailUser.social_media_link}
                target='_blank'
                rel='noopener noreferrer'
                className='col-span-2'
              >
                {detailUser.social_media_link}
              </a>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Link thư mục demo:</strong>
              <a
                href={detailUser.sample_photo_link}
                target='_blank'
                rel='noopener noreferrer'
                className='col-span-3'
              >
                {detailUser.sample_photo_link}
              </a>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Các team từng tham gia:</strong>
              <div className='col-span-3'>{detailUser.events_attended}</div>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Trạng thái đơn hàng:</strong>
              <Tag
                color={statusMapping[detailUser.merchant_active_status ?? 'unknown']?.color}
                className='w-fit col-span-3'
              >
                {statusMapping[detailUser.merchant_active_status ?? 'unknown']?.text ||
                  'Không xác định'}
              </Tag>
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

  const onExpand = (expanded: boolean, record: MerchantItemResponse) => {
    setSelectedRow(expanded ? record.id : null)
  }

  return (
    <div className='container mx-auto p-4'>
      <Tabs defaultActiveKey='all' onChange={handleTabChange}>
        <TabPane tab='Tất cả' key='all' />
        <TabPane tab='Đang hoạt động' key='approved' />
        <TabPane tab='Chờ duyệt' key='waiting_for_approve' />
        <TabPane tab='Vô hiệu' key='rejected' />
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
        scroll={{ x: 'max-content' }}
        rowKey={(record) => record.id}
        loading={isLoading}
        bordered
        columns={columns}
        dataSource={loadedUsers}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
          onExpand: (expanded: boolean, record: MerchantDetailResponse) =>
            setSelectedRow(expanded ? record.id : null),
          expandedRowKeys: selectedRow ? [selectedRow] : [],
        }}
        pagination={{
          current: currentPage,
          onChange: (page) => {
            setCurrentPage(page)
          },
          pageSize: 10,
          total: totalUsers ?? 0,
          showSizeChanger: false,
        }}
        className='shadow-md rounded-lg custom-table'
      />
    </div>
  )
}

export default UserTable

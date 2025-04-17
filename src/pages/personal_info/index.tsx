import React, { useState } from 'react'
import { Card, Avatar, Menu, Pagination, Tag, Modal } from 'antd'
import type { MenuProps } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { signOut, useSession } from 'next-auth/react'

// Định nghĩa type cho các mục menu
type MenuItem = Required<MenuProps>['items'][number]

// Mảng menu items
const menuItems: MenuItem[] = [
  { label: 'Tài khoản', key: 'account', icon: <UserOutlined /> },
  { label: 'Lịch sử mua hàng', key: 'history', icon: <ShoppingCartOutlined /> },
  { label: 'Thông tin chung', key: 'info', icon: <InfoCircleOutlined /> },
  { label: 'Đăng xuất', key: 'logout', icon: <LogoutOutlined />, danger: true },
]

// Các component con hiển thị nội dung tương ứng với từng menu

const AccountInfo: React.FC = () => {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2'>Tài khoản</h2>
      <p>Nội dung thông tin chi tiết tài khoản của bạn</p>
    </div>
  )
}

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

const transactionsMock: Transaction[] = Array.from({ length: 13 }, (_, i) => ({
  id: `${i + 1}`,
  event: 'Cúc Phương Jungle Path 2023',
  code: '#5PX2DNCLJ9BZTLQH',
  time: '20:00',
  date: '17/09/2023',
  photos: ['Album ảnh của số BIB 2100', 'SPkuQe87t-JPEG'],
  prices: [1200000, 1200000],
  total: 5000000,
  status: 'success',
}))

const PurchaseHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pageSize = 5

  const pagedData = transactionsMock.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className='space-y-4'>
      {/* Header */}
      <Card className='flex justify-between items-center shadow'>
        <div className='flex items-center gap-2 text-lg font-semibold'>
          <ShoppingCartOutlined style={{ fontSize: '24px', color: '#2563EB' }} />
          Lịch sử mua hàng
        </div>
      </Card>

      <div className='text-sm text-gray-500'>Tổng số giao dịch: {transactionsMock.length}</div>

      {/* Danh sách giao dịch */}
      <div className='space-y-4'>
        {pagedData.map((tx) => (
          <Card key={tx.id} className='shadow border border-gray-100'>
            <div className='flex justify-between items-start'>
              <div className='flex flex-col space-y-1'>
                <span className='font-semibold'>{tx.event}</span>
                <div className='flex items-center justify-between'>
                  <span className='text-xs text-gray-500 pr-10'>{tx.code}</span>
                  <span className='text-xs text-gray-500'>
                    {tx.time} • {tx.date}
                  </span>
                </div>
              </div>
              <Tag color='blue'>Thanh toán thành công</Tag>
            </div>

            {/* Giá và tổng tiền */}

            <div className='border-t mt-4 pt-2 text-sm'>
              <div className='text-sm mt-2'>
                {tx.photos.map((photo, idx) => (
                  <div className='flex items-center justify-between' key={idx}>
                    <div key={idx} className='text-gray-600'>
                      {photo}
                    </div>
                    <div key={idx} className='text-gray-600'>
                      1.200.000
                    </div>
                  </div>
                ))}
              </div>
              <div className='font-bold text-green-600 text-base mt-1 text-right'>
                Tổng tiền: {tx.total.toLocaleString('vi-VN')} VND
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center mt-4'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={transactionsMock.length}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  )
}

const GeneralInfo: React.FC = () => {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2'>Thông tin chung</h2>
      <p>Một số thông tin chung, hướng dẫn, cài đặt, v.v.</p>
    </div>
  )
}

// Component render nội dung bên phải dựa trên menuKey
interface RenderRightContentProps {
  menuKey: string
}

const RenderRightContent: React.FC<RenderRightContentProps> = ({ menuKey }) => {
  switch (menuKey) {
    case 'account':
      return <AccountInfo />
    case 'history':
      return <PurchaseHistory />
    case 'info':
      return <GeneralInfo />
    default:
      return <AccountInfo />
  }
}

// Định nghĩa kiểu cho thông tin người dùng
interface UserInfo {
  name: string
  image?: string
  email: string
}

const ProfilePage: React.FC = () => {
  // Khởi tạo state cho menu đã chọn
  const [selectedKey, setSelectedKey] = useState<string>('history')
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false) // State cho modal
  const { data: session, status } = useSession()
  console.log('session', session)
  const userInfo: UserInfo = session?.user as UserInfo

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  const showLogoutConfirm = () => {
    setIsLogoutModalVisible(true)
  }

  const hideLogoutConfirm = () => {
    setIsLogoutModalVisible(false)
  }

  // Xử lý sự kiện khi click vào menu
  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      showLogoutConfirm()
    } else {
      setSelectedKey(e.key)
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-6'>
      <div className='grid grid-cols-12 gap-4'>
        {/* Card bên trái chứa thông tin cơ bản và menu */}
        <div className='col-span-12 md:col-span-3'>
          <Card className='mb-4 shadow'>
            {/* Thông tin người dùng */}
            <div className='flex flex-col items-center justify-center mb-4'>
              {status === 'loading' ? (
                <Avatar size={80} className='mb-2' icon={<UserOutlined />} />
              ) : (
                <>
                  <Avatar src={userInfo.image} size={80} className='mb-2' icon={<UserOutlined />} />
                  <h3 className='text-base font-semibold'>{userInfo.name}</h3>
                  <p className='text-sm text-gray-500'>{userInfo.email}</p>
                </>
              )}
            </div>
            {/* Menu lựa chọn */}
            <Menu
              items={menuItems}
              onClick={onMenuClick}
              selectedKeys={[selectedKey]}
              mode='inline'
            />
          </Card>
        </div>

        {/* Card bên phải hiển thị nội dung tương ứng theo menu đã chọn */}
        <div className='col-span-12 md:col-span-9'>
          <RenderRightContent menuKey={selectedKey} />
        </div>
      </div>

      {/* Modal xác nhận đăng xuất */}
      <Modal
        title='Xác nhận đăng xuất'
        open={isLogoutModalVisible}
        onOk={handleLogout}
        onCancel={hideLogoutConfirm}
        okText='Đăng xuất'
        cancelText='Hủy'
      >
        Bạn có chắc chắn muốn đăng xuất?
      </Modal>
    </div>
  )
}

export default ProfilePage

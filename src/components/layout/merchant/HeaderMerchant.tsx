import React, { useState } from 'react'
import { Layout, Avatar, Space, Divider, Dropdown, Menu, Card, MenuProps, Modal } from 'antd'
import {
  BellOutlined,
  FileImageOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import SvgUser from '@/components/icons/icons/User'

const { Header } = Layout
interface UserInfo {
  name: string
  image?: string
  email: string
}
type MenuItem = Required<MenuProps>['items'][number]
const HeaderMerchant = () => {
  const { data: session } = useSession()

  const router = useRouter()
  console.log(session)
  const menuItems: MenuItem[] = [
    { label: 'Tài khoản', key: 'account', icon: <UserOutlined /> },
    { label: 'Lịch sử mua hàng', key: 'history', icon: <ShoppingCartOutlined /> },
    { label: 'Ảnh của tôi', key: 'images', icon: <FileImageOutlined /> },
    { label: 'Thông tin chung', key: 'info', icon: <InfoCircleOutlined /> },
    { label: 'Đăng xuất', key: 'logout', icon: <LogoutOutlined />, danger: true },
  ]
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false)

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  const showLogoutConfirm = () => {
    setIsLogoutModalVisible(true)
  }

  const hideLogoutConfirm = () => {
    setIsLogoutModalVisible(false)
  }
  const onMenuClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'logout') {
      showLogoutConfirm()
    } else {
      router.push(`/personal_info/${e.key}`)
    }
  }
  const userInfo: UserInfo = session?.user as UserInfo
  const partnerMenu = (
    <Card className='mb-4  rounded-lg'>
      <div className='flex flex-col items-center justify-center p-6'>
        {status === 'loading' ? (
          <Avatar size={80} className='mb-2' icon={<UserOutlined />} />
        ) : (
          <>
            <Avatar src={userInfo?.image} size={80} className='mb-2' icon={<UserOutlined />} />
            <h3 className='text-lg font-semibold'>{userInfo?.name}</h3>
            <p className='text-sm text-gray-500'>{userInfo?.email}</p>
          </>
        )}
      </div>

      <Menu
        mode='inline'
        onClick={onMenuClick}
        className='border-t pt-2'
        style={{
          borderInlineEnd: 'none',
        }}
        items={menuItems}
      />
    </Card>
  )
  return (
    <Header className='h-[80px] bg-white flex justify-between items-center px-8  '>
      <Link href='/'>
        <Image
          className='h-8 w-auto'
          src='/assets/images/Logo.svg'
          alt='Logo'
          height={30}
          width={100}
        />
      </Link>
      <Space size={24}>
        <Space size={16}>
          <div className='text-[#1D2939] flex flex-col items-end'>
            <p className='font-bold text-sm'>{session?.user.email}</p>
            <p className='text-sm'>Nhiếp ảnh gia</p>
          </div>
          <Dropdown overlay={partnerMenu} trigger={['click']}>
            <SvgUser width={24} />
          </Dropdown>
          {/* <Avatar
            size={32}
            icon={<UserOutlined />}
            className='bg-[#E0EAFF] text-[#3538CD]'
            onClick={() => router.push('/personal_info')}
          /> */}
        </Space>
        <Divider type='vertical' className='h-10 m-0 bg-[#EAECF0]' />
        <BellOutlined className='text-xl text-[#667085] cursor-pointer' />
      </Space>
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
    </Header>
  )
}

export default HeaderMerchant

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
import { PurchaseHistory } from '@/components/personal_info/purchase_history'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'

type MenuItem = Required<MenuProps>['items'][number]

const menuItems: MenuItem[] = [
  { label: 'Tài khoản', key: 'account', icon: <UserOutlined /> },
  { label: 'Lịch sử mua hàng', key: 'history', icon: <ShoppingCartOutlined /> },
  { label: 'Thông tin chung', key: 'info', icon: <InfoCircleOutlined /> },
  { label: 'Đăng xuất', key: 'logout', icon: <LogoutOutlined />, danger: true },
]

const AccountInfo: React.FC = () => {
  return (
    <div>
      <h2 className='text-lg font-semibold mb-2'>Tài khoản</h2>
      <p>Nội dung thông tin chi tiết tài khoản của bạn</p>
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

interface UserInfo {
  name: string
  image?: string
  email: string
}
type Props = {}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})
interface ProfilePageProps extends React.FC {
  requireAuth?: boolean
  requiredRoles?: string[]
  getLayout?: (page: React.ReactNode) => React.ReactNode
}

const ProfilePage: ProfilePageProps = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [selectedKey, setSelectedKey] = useState<string>('history')
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false)
  const { data: session, status } = useSession()
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
        <div className='col-span-12 md:col-span-3'>
          <Card className='mb-4 shadow'>
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
            <Menu
              items={menuItems}
              onClick={onMenuClick}
              selectedKeys={[selectedKey]}
              mode='inline'
            />
          </Card>
        </div>

        <div className='col-span-12 md:col-span-9'>
          <RenderRightContent menuKey={selectedKey} />
        </div>
      </div>

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

// export default ProfilePage
ProfilePage.requireAuth = true
ProfilePage.requiredRoles = ['admin']

export default ProfilePage
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
ProfilePage.getLayout = getLayout

import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import SvgListAlbums from '../../icons/icons/ListAlbums'
import SvgListUser from '@/components/icons/icons/ListUser'

const NavbarAdmin = () => {
  const router = useRouter()

  const menuItems = [
    {
      key: '/dashboard',
      icon: <AppstoreOutlined className='text-lg' />,
      label: 'Tổng quan',
    },
    {
      key: '/home',
      icon: <SvgListAlbums width={16} height={16} className='text-lg' />,
      label: 'Danh sách album',
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined className='text-lg' />,
      label: 'Quản lí đơn hàng',
    },
    {
      key: '/users',
      icon: <SvgListUser width={16} height={16} className='text-lg' />,
      label: 'Danh sách đối tác',
    },
  ]
  const selectedKey = router.pathname.replace(/^\/admin/, '') || '/dashboard'
  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key)
  }
  return (
    <nav className='w-[200px]  bg-white font-sans'>
      <Menu
        mode='inline'
        selectedKeys={[selectedKey]}
        items={menuItems}
        onClick={handleMenuClick}
        className='h-full pt-6 border-r-0'
        style={{
          backgroundColor: 'transparent',
          fontSize: '14px',
        }}
        theme='light'
      />
      <style jsx global>{`
        .ant-menu-item {
          height: 48px !important;
          line-height: 48px !important;
          margin: 4px 8px !important;
          border-radius: 8px !important;
        }
        .ant-menu-item:hover {
          background-color: #f5f8ff !important;
          color: #1d2939 !important;
        }
        .ant-menu-item-selected {
          background-color: #f5f8ff !important;
          color: #1d2939 !important;
          font-weight: 700 !important;
          border-left: 4px solid #36bffa !important;
          padding-left: 12px !important;
        }
        .ant-menu-item-selected::after {
          display: none !important;
        }
        .ant-menu-item .anticon {
          color: #667085;
        }
        .ant-menu-item:hover .anticon,
        .ant-menu-item-selected .anticon {
          color: #1d2939 !important;
        }
        .ant-menu-inline {
          border-inline-end: none !important;
        }
      `}</style>
    </nav>
  )
}

export default NavbarAdmin

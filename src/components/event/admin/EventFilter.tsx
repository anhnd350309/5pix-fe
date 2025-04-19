import React, { useState } from 'react'
import { Input, Button, Dropdown, Menu, notification } from 'antd'
import Link from 'next/link'
import {
  CloudUploadOutlined,
  DownOutlined,
  FileZipOutlined,
  GoogleOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  indexImageAlbumsAlbumIdIndexImagePost,
  loadImageAlbumsAlbumIdLoadImagePost,
} from '@/services/album/album'
import { AlbumDetailResponse } from '@/schemas'
import JsonDetailModal from '@/components/common/JsonDetailModal'

interface DetailEventFilterProps {
  eventName: string
  id: number
  event?: AlbumDetailResponse
}

const DetailEventFilter: React.FC<DetailEventFilterProps> = ({ eventName, id, event }) => {
  const [api, contextHolder] = notification.useNotification()
  const [isJsonModalVisible, setIsJsonModalVisible] = useState(false)
  const openNotificationWithIcon = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    description?: string,
  ) => {
    api[type]({
      message: message,
      description: description,
      placement: 'topRight',
    })
  }
  const menu = (
    <Menu className='border border-[#2563EB] rounded-md'>
      <Menu.Item
        key='1'
        icon={<UploadOutlined />}
        className='hover:bg-[#E0F2FE] text-[#2563EB] font-bold'
      >
        Tải hình ảnh từ thiết bị
      </Menu.Item>
      <Menu.Item
        key='2'
        icon={<GoogleOutlined />}
        className='hover:bg-[#E0F2FE] text-[#2563EB] font-bold'
      >
        Tải hình ảnh từ Google Drive
      </Menu.Item>
      <Menu.Item
        key='3'
        icon={<FileZipOutlined />}
        className='hover:bg-[#E0F2FE] text-[#2563EB] font-bold'
      >
        Import hình ảnh bằng file ZIP
      </Menu.Item>
      <Menu.Item
        key='4'
        icon={<CloudUploadOutlined />}
        className='hover:bg-[#E0F2FE] text-[#2563EB] font-bold'
        onClick={() => setIsJsonModalVisible(true)}
      >
        Tải hình ảnh bằng FTP
      </Menu.Item>
    </Menu>
  )
  const handleLoadAlbum = () => {
    loadImageAlbumsAlbumIdLoadImagePost(id).then((res) => {
      if (res?.code === '000') {
        openNotificationWithIcon(
          'success',
          'Load album thành công',
          'Album đã được load thành công.',
        )
      } else {
        openNotificationWithIcon('error', 'Load album thất bại', 'Có lỗi xảy ra khi load album.')
      }
    })
  }
  const handleIndexImage = () => {
    indexImageAlbumsAlbumIdIndexImagePost(id).then((res) => {
      if (res?.code === '000') {
        openNotificationWithIcon('success', 'Xử lý ảnh thành công', 'Ảnh đang được xử lý.')
      } else {
        openNotificationWithIcon('error', 'Xử lý ảnh thất bại', 'Có lỗi xảy ra khi xử lý ảnh.')
      }
    })
  }
  return (
    <div className='p-4'>
      {contextHolder}
      <div className='text-[#475467] breadcrumb flex gap-2 pb-6'>
        <Link href='/home'>Trang chủ</Link>
        <div> &gt; </div>
        <Link href='/home'>Danh sách sự kiện</Link>
        <div> &gt; </div>
        <Link href='/home'>{eventName}</Link>
        <div> &gt; </div>
        <Link href='/home'>Album ảnh</Link>
      </div>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4'>
        <h1 className='font-inter font-medium text-[24px] leading-[100%] tracking-[0%] mb-2 sm:mb-0'>
          {eventName}
        </h1>
        <div className='flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0'>
          <Button
            className='bg-[#C7DBFF] font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%] w-full sm:w-auto'
            onClick={handleLoadAlbum}
          >
            Load album
          </Button>
          <Button
            className='bg-[#C7DBFF] font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%] w-full sm:w-auto'
            onClick={handleIndexImage}
          >
            Xử lý ảnh và gửi duyệt
          </Button>
          <Dropdown overlay={menu}>
            <Button
              type='primary'
              className='bg-[#2563EB] text-white w-full sm:w-[250px] flex justify-between font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%]'
            >
              Tải ảnh lên <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </div>
      <div className='flex flex-col sm:flex-row items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0 mb-4'>
        <Input placeholder='Tên theo BIB/text' className='w-full sm:w-[40%]' />
        <Button className='text-white bg-black font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%] w-full sm:w-auto'>
          Tìm ảnh
        </Button>
        <Button className='bg-[#C7DBFF] font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%] w-full sm:w-auto'>
          Tìm kiếm bằng hình ảnh
        </Button>
      </div>
      <div className='bg-white shadow-lg rounded-xl p-6 w-full text-center'>
        <div className='grid grid-cols-2 gap-4 text-gray-700'>
          <div className='text-sm'>
            📸 Tổng số ảnh: <span className='font-semibold'>{event?.total_image}</span>
          </div>
          <div className='text-sm'>
            🔎 Đang nhận dạng: <span className='font-semibold'>{event?.indexing}</span>
          </div>
          <div className='text-sm'>
            ✅ Ảnh đã load thành công: <span className='font-semibold'>{event?.loaded}</span>
          </div>
          <div className='text-sm'>
            🏁 Đã nhận dạng thành công:{' '}
            <span className='font-semibold'>{event?.index_complete}</span>
          </div>
        </div>
      </div>
      <JsonDetailModal
        open={isJsonModalVisible}
        onClose={() => setIsJsonModalVisible(false)}
        rawJson={event?.album_ftp_account || ''}
      />
    </div>
  )
}

export default DetailEventFilter

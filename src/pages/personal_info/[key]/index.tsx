import React, { useEffect, useState } from 'react'
import { Card, Avatar, Menu, Pagination, Tag, Modal, Spin, Button } from 'antd'
import type { MenuProps } from 'antd'
import {
  UserOutlined,
  ShoppingCartOutlined,
  InfoCircleOutlined,
  LogoutOutlined,
  FileImageOutlined,
} from '@ant-design/icons'
import { signOut, useSession } from 'next-auth/react'
import { PurchaseHistory } from '@/components/personal_info/purchase_history'
import { getOwnedImagesImageCollectionOwnedImagesGet } from '@/services/image-collection/image-collection'
import { GetOwnedImagesImageCollectionOwnedImagesGetParams, OwnedImageResponse } from '@/schemas'
import ImageViewer from '@/components/event/ImgViewer'
import ImageModal from '@/components/common/ImageModal'
import { useRouter } from 'next/router'

type MenuItem = Required<MenuProps>['items'][number]

const menuItems: MenuItem[] = [
  { label: 'Tài khoản', key: 'account', icon: <UserOutlined /> },
  { label: 'Lịch sử mua hàng', key: 'history', icon: <ShoppingCartOutlined /> },
  { label: 'Ảnh của tôi', key: 'images', icon: <FileImageOutlined /> },
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
const MyImages: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [totalPages, setTotalPages] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadedImages, setLoadedImages] = useState<OwnedImageResponse[]>([])
  const [totalImages, setTotalImages] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [groupedImages, setGroupedImages] = useState<Record<number, OwnedImageResponse[]>>({})
  const [expandedAlbumId, setExpandedAlbumId] = useState<number | null>(null)

  const toggleAlbum = (albumId: number) => {
    setExpandedAlbumId((prev) => (prev === albumId ? null : albumId))
  }
  const groupImagesByAlbum = (images: OwnedImageResponse[]) => {
    const grouped: Record<number, OwnedImageResponse[]> = {}

    images.forEach((image) => {
      const albumId = image.album_id
      if (!grouped[albumId]) {
        grouped[albumId] = []
      }
      grouped[albumId].push(image)
    })

    return grouped
  }
  const fetchImages = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params: GetOwnedImagesImageCollectionOwnedImagesGetParams = {
        page: currentPage,
        page_size: 100,
      }
      const response = await getOwnedImagesImageCollectionOwnedImagesGet(params)
      const images = response.data
      setLoadedImages(images)
      console.log(images)
      setGroupedImages(groupImagesByAlbum(images))
      setTotalImages(response.metadata.total_items)
      setTotalPages(Math.ceil(response?.metadata.total_items / 100))
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
      setIsLoadingMore(false)
    }
  }

  useEffect(() => {
    fetchImages()
  }, [currentPage])
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setIsLoadingMore(true)
      setCurrentPage((prevPage) => prevPage - 1)
      // handleLoadMore(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setIsLoadingMore(true)
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handleBackToPage1 = () => {
    setIsLoadingMore(true)
    setCurrentPage(1)
  }
  return (
    <div>
      <div className='w-full space-y-5   mt-4 center pb-[40px]'>
        {isLoading ? (
          <Spin className='flex justify-center items-center h-24' />
        ) : (
          <React.Fragment>
            <div className='flex flex-col xl:flex-row gap-4'>
              {/* Phần grid ảnh (giữ nguyên code của bạn) */}
              <div className='flex-1'>
                {loadedImages.length === 0 ? (
                  <span className='flex justify-center items-center w-full'>
                    Không tìm thấy hình ảnh nào của bạn
                  </span>
                ) : (
                  <div className='w-full'>
                    {Object.entries(groupedImages).map(([albumId, images]) => (
                      <div key={albumId} className='border p-4 rounded-md mb-4'>
                        <div
                          className='flex justify-between items-center cursor-pointer'
                          onClick={() => toggleAlbum(Number(albumId))}
                        >
                          <h3 className='text-lg font-semibold'>Album {albumId}</h3>
                          <span>{expandedAlbumId === Number(albumId) ? '▲' : '▼'}</span>
                        </div>

                        {expandedAlbumId === Number(albumId) && (
                          <div className='gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mt-4'>
                            {images.map((image, idx) => (
                              <ImageViewer
                                key={idx}
                                src={image?.cdn_image_url || 'assets/images/DetailEvent.png'}
                                alt='image'
                                extra={image?.s3_image_url || image?.cdn_image_url || ''}
                                width={600}
                                height={400}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        )}

        {loadedImages.length < (totalImages ?? 0) && (
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 mt-4'>
            <div className='flex justify-center border-blue-500'>
              <Button
                onClick={handleBackToPage1}
                disabled={currentPage === 1 || isLoadingMore}
                className='bg-transparent hover:bg-blue-600 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                {isLoadingMore ? <Spin className='mr-2' /> : 'Back to Page 1'}
              </Button>
            </div>
            <div className='flex justify-center border-blue-500'>
              <Button
                onClick={handlePreviousPage}
                disabled={currentPage === 1 || isLoadingMore}
                className='bg-transparent hover:bg-blue-600 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                {isLoadingMore ? <Spin className='mr-2' /> : 'Previous'}
              </Button>

              <Button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || isLoadingMore}
                className='bg-transparent hover:bg-blue-600 mb-8 border border-blue-500 rounded-full text-blue-500 hover:text-white flex items-center'
              >
                {isLoadingMore ? <Spin className='mr-2' /> : 'Next'}
              </Button>
            </div>
            <div className='flex justify-center border-blue-500'>
              <span className='mx-4'>
                Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        )}
      </div>
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
    case 'images':
      return <MyImages />
    default:
      return <AccountInfo />
  }
}

interface UserInfo {
  name: string
  image?: string
  email: string
}

const ProfilePage: React.FC = () => {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false)
  const { data: session, status } = useSession()
  const userInfo: UserInfo = session?.user as UserInfo
  const router = useRouter()
  const { key } = router.query
  console.log(String(key))
  const [selectedKey, setSelectedKey] = useState<string>(key ? String(key) : 'order')
  useEffect(() => {
    if (!router.isReady) return
    setSelectedKey(key ? String(key) : 'order')
    console.log('change key')
  }, [key, router.isReady])
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

export default ProfilePage

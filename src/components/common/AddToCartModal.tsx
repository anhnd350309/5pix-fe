import React from 'react'
import { Modal, Button, Card, notification } from 'antd'
import { useRouter } from 'next/router'
import { addImageImageCollectionAddImagePost } from '@/services/image-collection/image-collection'

interface AddToCartModalProps {
  isPopupVisible: boolean
  hidePopup: () => void
  slug: string
  imageId: number
  albumId?: number
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isPopupVisible,
  hidePopup,
  slug,
  imageId,
  albumId,
}) => {
  const [api, contextHolder] = notification.useNotification()
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
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const addCart = () => {
    try {
      setIsLoading(true)
      addImageImageCollectionAddImagePost({
        album_id: albumId,
        image_ids: [imageId],
      }).then((res) => {
        if (res.id) {
          openNotificationWithIcon('success', 'Thành công', 'Đã thêm ảnh vào giỏ hàng.')
        } else {
          openNotificationWithIcon('error', 'Thất bại', 'Có lỗi xảy ra khi thêm ảnh vào giỏ hàng.')
          console.error('Error adding to cart:', res)
        }
      })
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsLoading(false)

      hidePopup()
    }
  }
  return (
    <>
      {contextHolder}
      <Modal
        title='Thêm vào giỏ hàng'
        open={isPopupVisible}
        onCancel={hidePopup}
        footer={[
          <Button
            key='back'
            className='rounded-[20px]'
            onClick={() => router.push(`/events/${slug}/checkout`)}
          >
            Kiểm tra giỏ hàng
          </Button>,
          <Button key='submit' className='rounded-[20px]' type='primary' onClick={addCart}>
            {isLoading ? 'Đang thêm vào giỏ hàng...' : 'Thêm vào giỏ hàng'}
          </Button>,
        ]}
      >
        <Card>
          <p>Đây là thông tin chi tiết về photobook.</p>
        </Card>
      </Modal>
    </>
  )
}

export default AddToCartModal

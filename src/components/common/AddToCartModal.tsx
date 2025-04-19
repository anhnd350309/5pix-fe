import React from 'react'
import { Modal, Button, Card, notification } from 'antd'
import { useRouter } from 'next/router'
import { addImageImageCollectionAddImagePost } from '@/services/image-collection/image-collection'
import useCurrency from '@/hooks/useCurrency'

interface AddToCartModalProps {
  isPopupVisible: boolean
  hidePopup: () => void
  slug: string
  imageId: number
  albumId?: number
  imgName?: string
  price?: number
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({
  isPopupVisible,
  hidePopup,
  slug,
  imageId,
  albumId,
  imgName,
  price,
}) => {
  const formatter = useCurrency('đ')
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
        open={isPopupVisible}
        onCancel={hidePopup}
        footer={null}
        // centered
        closable
        className=' top-[10%] rounded-2xl [&_.ant-modal-content]:rounded-2xl p-4'
      >
        <div className='text-center'>
          <h2 className='text-xl font-semibold mb-6'>Thêm vào giỏ hàng của bạn</h2>

          <div className='text-left space-y-4 mb-6'>
            <div className='flex justify-between'>
              <span className='inline-block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap'>
                {imgName}
              </span>
              <span>{formatter(price || 0)}</span>
            </div>

            <div className='border-t pt-4 flex justify-between font-bold text-base'>
              <span>Tổng</span>
              <span>{formatter(price || 0)}</span>
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <Button
              type='primary'
              className='h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold'
              onClick={() => router.push(`/events/${slug}/checkout`)}
              block
            >
              Thanh toán ngay
            </Button>
            <Button
              className='h-12 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 text-base font-semibold border-none'
              onClick={addCart}
              block
            >
              {isLoading ? 'Đang thêm vào giỏ hàng...' : 'Tiếp tục mua hàng'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default AddToCartModal

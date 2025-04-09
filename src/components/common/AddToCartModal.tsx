import React from 'react'
import { Modal, Button, Card } from 'antd'
import { useRouter } from 'next/router'

interface AddToCartModalProps {
  isPopupVisible: boolean
  hidePopup: () => void
}

const AddToCartModal: React.FC<AddToCartModalProps> = ({ isPopupVisible, hidePopup }) => {
  const router = useRouter()
  return (
    <Modal
      title='Thêm vào giỏ hàng'
      open={isPopupVisible}
      onCancel={hidePopup}
      footer={[
        <Button key='back' className='rounded-[20px]' onClick={hidePopup}>
          Tiếp tục mua hàng
        </Button>,
        <Button
          key='submit'
          className='rounded-[20px]'
          type='primary'
          onClick={() => router.push('/checkout')}
        >
          Thanh toán ngay
        </Button>,
      ]}
    >
      <Card>
        <p>Đây là thông tin chi tiết về photobook.</p>
      </Card>
    </Modal>
  )
}

export default AddToCartModal

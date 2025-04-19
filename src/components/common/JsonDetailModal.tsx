import { Modal, Descriptions } from 'antd'
import { useEffect, useState } from 'react'

interface JsonDetailModalProps {
  open: boolean
  onClose: () => void
  rawJson: string
}

// Định nghĩa kiểu dữ liệu
type JsonData = Record<string, any>

export default function JsonDetailModal({ open, onClose, rawJson }: JsonDetailModalProps) {
  const [data, setData] = useState<JsonData>({})

  useEffect(() => {
    if (rawJson) {
      try {
        const validJson = rawJson
          .replace(/'/g, '"')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
        const parsed = JSON.parse(validJson)
        setData(parsed)
      } catch (err) {
        console.error('Invalid JSON:', err)
        setData({})
      }
    }
  }, [rawJson])

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title='Thông tin cấu hình'
      centered
      className='rounded-2xl [&_.ant-modal-content]:rounded-2xl p-4'
    >
      <Descriptions column={1} bordered size='small'>
        {Object.entries(data).map(([key, value]) => (
          <Descriptions.Item label={key} key={key}>
            {String(value)}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Modal>
  )
}

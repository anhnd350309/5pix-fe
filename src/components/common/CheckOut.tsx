import React from 'react'
import { Form, Input, Select, Checkbox, Table, Card } from 'antd'

/**
 * Dữ liệu demo cho bảng "Sản phẩm"
 * Bạn có thể thay thế bằng data động (từ server hoặc state).
 */
import type { ColumnsType } from 'antd/es/table'

const columns: ColumnsType<{
  key: string
  product: { image: string; name: string; description: string }
  price: string
  quantity: string
  total: string
}> = [
  {
    title: 'Sản phẩm',
    dataIndex: 'product',
    key: 'product',
    render: (product: any) => (
      <div className='flex items-center'>
        <img
          src={product.image}
          alt={product.name}
          className='w-16 h-16 object-cover rounded-md mr-3'
        />
        <div>
          <p className='font-medium'>{product.name}</p>
          <p className='text-xs text-gray-400'>{product.description}</p>
        </div>
      </div>
    ),
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    align: 'center',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
    align: 'center',
  },
  {
    title: 'Tổng',
    dataIndex: 'total',
    key: 'total',
    align: 'right',
  },
]

const data = [
  {
    key: '1',
    product: {
      image: 'https://via.placeholder.com/100x60?text=Photo1',
      name: 'Toàn bộ ảnh của số BIB 70011',
      description: 'Cúc Phương Jungle Path 2023',
    },
    price: '1.000.000 đ',
    quantity: 'x1',
    total: '1.000.000 đ',
  },
  {
    key: '2',
    product: {
      image: 'https://via.placeholder.com/100x60?text=Photo2',
      name: 'CRP1324325',
      description: 'Cúc Phương Jungle Path 2023',
    },
    price: '15.000 đ',
    quantity: 'x1',
    total: '15.000 đ',
  },
  {
    key: '3',
    product: {
      image: 'https://via.placeholder.com/100x60?text=Photo3',
      name: 'CRP1324325',
      description: 'Cúc Phương Jungle Path 2023',
    },
    price: '15.000 đ',
    quantity: 'x1',
    total: '15.000 đ',
  },
]

export default function CheckoutInfo() {
  const [form] = Form.useForm()

  // Tạo prefix cho số điện thoại (mã vùng), ví dụ +84
  const prefixSelector = (
    <Form.Item name='prefix' noStyle initialValue='+84'>
      <Select style={{ width: 70 }}>
        <Select.Option value='+84'>+84</Select.Option>
        <Select.Option value='+1'>+1</Select.Option>
        <Select.Option value='+86'>+86</Select.Option>
        {/* Thêm các mã vùng khác nếu cần */}
      </Select>
    </Form.Item>
  )

  return (
    <div className='max-w-3xl mx-auto p-4 sm:p-8 space-y-6 rounded'>
      {/* Thông tin người mua */}
      <Card className='shadow'>
        <h2 className='text-lg font-semibold mb-4'>Thông tin người mua</h2>
        <hr className='mb-4 border-gray-200' />
        <Form
          layout='horizontal'
          form={form}
          name='buyerInfo'
          scrollToFirstError
          // className='space-y-3'
        >
          {/* Họ và tên */}
          <Form.Item
            label='Họ và tên'
            name='fullname'
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
          >
            <Input placeholder='Nhập họ và tên' />
          </Form.Item>

          {/* Tên */}
          <Form.Item
            label='Tên'
            name='firstName'
            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
          >
            <Input placeholder='Nhập tên' />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Vui lòng nhập email' },
              { type: 'email', message: 'Email không hợp lệ' },
            ]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
          >
            <Input placeholder='Nhập email' />
          </Form.Item>

          {/* Số điện thoại + mã vùng */}
          <Form.Item
            label='Số điện thoại'
            name='phone'
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 10 }}
          >
            <Input
              addonBefore={prefixSelector}
              placeholder='Nhập số điện thoại'
              style={{ width: '100%' }}
            />
          </Form.Item>

          {/* Checkbox đồng ý điều khoản */}
          <Form.Item
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('Vui lòng đồng ý với điều khoản')),
              },
            ]}
          >
            <Checkbox>
              Tôi đồng ý với việc sử dụng nội dung số (ví dụ như việc cung cấp các liên kết tải
              xuống hình / ảnh), và hiểu những rủi ro, trách nhiệm khi thực hiện thao tác mua nội
              dung số. Thông tin chi tiết:
              <a
                href='#'
                className='text-blue-500 hover:underline ml-1'
                target='_blank'
                rel='noopener noreferrer'
              >
                Điều khoản sử dụng của 5PIX
              </a>
            </Checkbox>
          </Form.Item>
        </Form>
      </Card>

      {/* Danh sách sản phẩm */}
      <Card className='shadow'>
        <h2 className='text-lg font-semibold mb-4'>Sản phẩm</h2>
        <hr className='mb-4 border-gray-200' />
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          className='antd-table-custom'
          // Bạn có thể tuỳ chỉnh thêm className, scroll, style...
        />
      </Card>
    </div>
  )
}

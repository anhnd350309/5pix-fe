import React, { useState } from 'react'
import { Radio, Table } from 'antd'

// Define the interface for the table data
interface CreditData {
  key: string
  credit: number | string
  originalPrice: number
  discount: string
  afterDiscount: number | string
  totalPayment: number | string
}

const CreditSelectionComponent: React.FC = () => {
  const [selectedCredit, setSelectedCredit] = useState<number | string>(2000)

  const columns = [
    {
      title: 'Gói Credit',
      dataIndex: 'credit',
      key: 'credit',
      render: (text: number | string) => (
        <Radio
          value={text}
          checked={selectedCredit === text}
          onChange={() => setSelectedCredit(text)}
        >
          {text}
        </Radio>
      ),
    },
    {
      title: 'Giá gốc',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
    },
    {
      title: 'Chiết khấu',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Sau chiết khấu',
      dataIndex: 'afterDiscount',
      key: 'afterDiscount',
    },
    {
      title: 'Tổng thanh toán',
      dataIndex: 'totalPayment',
      key: 'totalPayment',
    },
  ]

  const data: CreditData[] = [
    {
      key: '1',
      credit: 2000,
      originalPrice: 110,
      discount: '0%',
      afterDiscount: 110,
      totalPayment: 220000,
    },
    {
      key: '2',
      credit: 10000,
      originalPrice: 110,
      discount: '5%',
      afterDiscount: 104.5,
      totalPayment: 1045000,
    },
    {
      key: '3',
      credit: 20000,
      originalPrice: 110,
      discount: '10%',
      afterDiscount: 99,
      totalPayment: 1980000,
    },
    {
      key: '4',
      credit: 50000,
      originalPrice: 110,
      discount: '15%',
      afterDiscount: 93.5,
      totalPayment: 4675000,
    },
    {
      key: '5',
      credit: 'Trên 150.000',
      originalPrice: 110,
      discount: 'Thảo luận',
      afterDiscount: 'Thảo luận',
      totalPayment: 'Liên hệ',
    },
  ]

  return (
    <div className='container mx-auto p-4 max-w-2xl bg-white rounded-lg shadow-lg'>
      <h2 className='text-xl font-bold mb-4'>Gói Credit</h2>
      <Radio.Group
        onChange={(e) => setSelectedCredit(e.target.value)}
        value={selectedCredit}
        className='w-full'
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={() => 'hover:bg-gray-100'}
          className='w-full'
        />
      </Radio.Group>
      <div className='text-center text-gray-500 mt-4'>
        Nhập số lượng credit: <input type='number' className='border p-1 ml-2' value={0} readOnly />
      </div>
    </div>
  )
}

export default CreditSelectionComponent

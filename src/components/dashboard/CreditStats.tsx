import React from 'react'
import { Card, Button, Table } from 'antd'
import { CreditCardOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import SvgCredit from '../icons/icons/Credit'
import { useRouter } from 'next/router'

interface TransactionRecord {
  time: string
  activity: string
  creditChange: string
  currentCredit: string
}

const CreditStats = () => {
  const router = useRouter()
  const columns: ColumnsType<TransactionRecord> = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 200,
    },
    {
      title: 'Hoạt động',
      dataIndex: 'activity',
      key: 'activity',
      width: 500,
    },
    {
      title: 'Số credit',
      dataIndex: 'creditChange',
      key: 'creditChange',
      width: 150,
      render: (text: string) => (
        <span className={text.startsWith('+') ? 'text-[#12B76A]' : 'text-[#F04438]'}>{text}</span>
      ),
    },
    {
      title: 'Số credit hiện có',
      dataIndex: 'currentCredit',
      key: 'currentCredit',
      width: 150,
    },
  ]

  const data: TransactionRecord[] = [
    {
      time: '05:23:00 14/02/2025',
      activity: '5PIX120947215',
      creditChange: '+100.000',
      currentCredit: '109.000',
    },
    {
      time: '05:23:00 14/02/2025',
      activity: 'GIẢI MARATHON QUỐC TẾ MEKONG DELTA MARATHON TỈNH HẬU GIANG LẦN THỨ VI',
      creditChange: '-10.000',
      currentCredit: '9000',
    },
    // Add more sample data as needed
  ]
  const topUp = () => {
    router.push('/admin/credit')
  }
  return (
    <div className='p-8 space-y-8'>
      <Card className='shadow-sm'>
        <div className='flex items-center gap-16'>
          <div className='flex items-center gap-4'>
            <div className='p-3 rounded-lg '>
              <SvgCredit width={48} />
            </div>
            <div>
              <p className='text-[#475467] text-sm'>Tổng số credit hiện có</p>
              <p className='text-[#1D2939] text-2xl font-semibold'>1,500</p>
            </div>
          </div>
          <Button type='primary' className='bg-[#2E90FA] h-10 px-4' onClick={topUp}>
            Nạp credit
          </Button>
        </div>
      </Card>

      <div className='bg-white rounded-lg'>
        <div className='p-4 border-b border-[#EAECF0]'>
          <h2 className='text-lg font-semibold text-[#1D2939]'>Lịch sử giao dịch</h2>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            total: 200,
            pageSize: 10,
            current: 1,
            showTotal: (total, range) => `1-10 trong số ${total}`,
          }}
          className='custom-table'
          bordered
        />
      </div>

      <style jsx global>{`
        .custom-table .ant-table-thead > tr > th {
          background: #f9fafb;
          color: #475467;
          font-weight: 500;
        }
        .custom-table .ant-table-tbody > tr > td {
          color: #475467;
        }
        .custom-table .ant-pagination {
          margin: 16px 24px;
        }
      `}</style>
    </div>
  )
}

export default CreditStats

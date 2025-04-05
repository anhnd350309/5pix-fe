import { useState, useEffect } from 'react'
import { Card, Statistic, DatePicker, Space, Row, Col, Button, Tag, Table } from 'antd'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import dayjs, { Dayjs } from 'dayjs'
import type { RangePickerProps } from 'antd/es/date-picker'
import SvgRevenue from '../icons/icons/Revenue'
import SvgCart from '../icons/icons/Cart'
import SvgCredit from '../icons/icons/Credit'

// Sample data for charts
const lineChartData = [
  { name: '2023/03', 'Doanh thu': 50, 'Don hang': 80 },
  { name: '2023/06', 'Doanh thu': 70, 'Don hang': 60 },
  { name: '2023/09', 'Doanh thu': 30, 'Don hang': 90 },
  { name: '2023/12', 'Doanh thu': 80, 'Don hang': 40 },
  { name: '2024/03', 'Doanh thu': 60, 'Don hang': 70 },
]

const pieChartData = [
  { name: 'Ta Nang Trail...', value: 10000000 },
  { name: 'Ta Nang Trail...', value: 10000000 },
  { name: 'Ta Nang Trail...', value: 10000000 },
  { name: 'Khác', value: 10000000 },
]

const dataTable = [
  {
    key: '1',
    name: 'Đồng hồ Christmas Special Marathon Heritage Race',
    status: 'Đã đăng ký',
    currentStatus: 'Hiển thị',
  },
  {
    key: '2',
    name: 'GẤU HAMAH HON BUỔI TỐI KHONG ĐẾN TÌM MARATHON TINH YÊU GIÁNG LÂM TM-14',
    status: 'Chưa đăng ký',
    currentStatus: 'Ẩn',
  },
  {
    key: '3',
    name: 'Đồng hồ Christmas Special Marathon Heritage Race',
    status: 'Đã huỷ',
    currentStatus: 'Hiển thị',
  },
]

const COLORS = ['#2563EB', '#FF58EE', '#32D583', '#FEC84B']

const DashboardStats = () => {
  const [mounted, setMounted] = useState(false)
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>(null)

  useEffect(() => {
    setMounted(true)
    setDateRange([dayjs('2024-03-04'), dayjs('2025-03-04')])
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className=' sm:p-6 lg:p-8'>
      {/* Statistic Cards */}
      <Card>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} className='p-0 border rounded-[8px] border-gray-300'>
            <Card bodyStyle={{ padding: '12px' }}>
              <div className='flex flex-row justify-center items-center gap-2 h-full'>
                <SvgRevenue width={48} />
                <Statistic
                  title='Tổng doanh thu'
                  value={200000000}
                  suffix='đ'
                  valueStyle={{ color: '#52c41a', fontSize: '16px' }}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} className='p-0 border rounded-[8px] border-gray-300'>
            <Card bodyStyle={{ padding: '12px' }}>
              <div className='flex flex-row justify-center items-center gap-2 h-full'>
                <SvgCart width={48} />
                <Statistic
                  title='Tổng đơn hàng'
                  value={1200}
                  valueStyle={{ color: '#1890ff', fontSize: '16px' }}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} className='p-0 border rounded-[8px] border-gray-300'>
            <Card bodyStyle={{ padding: '12px' }}>
              <div className='flex flex-row justify-center items-center gap-2 h-full'>
                <SvgCredit width={48} />
                <Statistic
                  title='Tổng số credit đã dùng'
                  value={1500}
                  valueStyle={{ color: '#f5222d', fontSize: '16px' }}
                />
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Filters */}
      <Card className='mt-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
          <Space className='w-full sm:w-auto'>
            <span className='text-gray-700'>Thời gian:</span>
            <DatePicker.RangePicker
              value={dateRange}
              onChange={setDateRange}
              format='DD/MM/YYYY'
              className='rounded-md w-full sm:w-auto'
            />
          </Space>
          <Space className='flex flex-wrap gap-2 w-full sm:w-auto'>
            <Button type='primary' ghost className='border flex-1 sm:flex-none'>
              Tất cả
            </Button>
            <Button
              type='text'
              className='text-gray-700 border border-gray-300 flex-1 sm:flex-none'
            >
              Tháng nay
            </Button>
            <Button
              type='text'
              className='text-gray-700 border border-gray-300 flex-1 sm:flex-none'
            >
              Tuần nay
            </Button>
            <Button
              type='text'
              className='text-gray-700 border border-gray-300 flex-1 sm:flex-none'
            >
              Tuần trước
            </Button>
          </Space>
        </div>
      </Card>

      {/* Charts */}
      <Row gutter={[16, 16]} className='mb-6 mt-6'>
        <Col xs={24} md={12}>
          <Card title='Biểu đồ doanh thu theo thời gian' className='font-sans'>
            <div className='overflow-x-auto'>
              <LineChart width={500} height={300} data={lineChartData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Line type='monotone' dataKey='Doanh thu' stroke='#1890ff' />
                <Line type='monotone' dataKey='Don hang' stroke='#f5222d' />
              </LineChart>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title='Biểu đồ hiệu suất bán phẩm' className='font-sans'>
            <div className='flex justify-center'>
              <PieChart width={300} height={300}>
                <Pie
                  data={pieChartData}
                  cx={150}
                  cy={150}
                  labelLine={false}
                  outerRadius={120}
                  fill='#8884d8'
                  dataKey='value'
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className='mt-4 flex flex-col justify-center'>
                {pieChartData.map((entry, index) => (
                  <div key={index} className='flex items-center mb-2'>
                    <div
                      className='w-4 h-4 mr-2'
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span>{entry.name}</span>
                    <span className='ml-2'>{entry.value.toLocaleString()}đ</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Row gutter={[16, 16]} className='mt-4'>
        <Col span={24}>
          <Card title='Danh sách album đang trên hệ thống'>
            <Table
              scroll={{ x: 'max-content' }}
              bordered
              dataSource={dataTable}
              pagination={{
                total: 2555,
                pageSize: 10,
                showSizeChanger: false,
              }}
              columns={[
                {
                  title: 'Tên album',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Trạng thái 5PIX',
                  dataIndex: 'status',
                  key: 'status',
                  align: 'center',
                  render: (status) => (
                    <Tag
                      color={
                        status === 'Đã đăng ký'
                          ? 'success'
                          : status === 'Chưa đăng ký'
                            ? 'warning'
                            : 'error'
                      }
                    >
                      {status}
                    </Tag>
                  ),
                },
                {
                  title: 'Trạng thái hiển thị',
                  dataIndex: 'currentStatus',
                  key: 'currentStatus',
                  align: 'center',
                  render: (status) => (
                    <Tag color={status === 'Hiển thị' ? 'green' : 'default'}>{status}</Tag>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default DashboardStats

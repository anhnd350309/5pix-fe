import React, { useState } from 'react'
import { Table, Tag, Button } from 'antd'
import { UserOutlined, MailOutlined } from '@ant-design/icons'

interface DonationDetail {
  thoiGianTaoDon: string
  thoiGianThanhToan: string
  email: string
  tamTinh: string
  giamGia: string
  tongTienChiTiet: string
  ghiChu: string
}

interface DonationData {
  key: string
  maDonHang: string
  ngayMua: string
  khachHang: string
  username: string
  album: string
  tongTien: string
  trangThai: string
  chiTiet?: DonationDetail
}

const OrderTable: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null)

  const dataSource: DonationData[] = [
    {
      key: '1',
      maDonHang: 'SBIB00001',
      ngayMua: '10h03 - 15/04/2023',
      khachHang: 'Minh Danny',
      username: 'MinhDanny@gmail.com',
      album: '10km Coros',
      tongTien: '12,000,000 đ',
      trangThai: 'Hoàn thành',
    },
    {
      key: '2',
      maDonHang: 'SBIB00002',
      ngayMua: '10h03 - 15/04/2023',
      khachHang: 'Minh Danny',
      username: 'MinhDanny@gmail.com',
      album: '10km Coros',
      tongTien: '12,000,000 đ',
      trangThai: 'Hoàn thành',
    },
    {
      key: '3',
      maDonHang: 'SBIB-RJ-0001',
      ngayMua: '12:23:00 - 15/04/2023',
      khachHang: 'Anh đan',
      username: 'minhth@gmail.com',
      album: 'Marathon Quốc Tế Mekong Delta',
      tongTien: '9,000,000 đ',
      trangThai: 'Hoàn thành',
      chiTiet: {
        thoiGianTaoDon: '12:23:00 - 15/04/2023',
        thoiGianThanhToan: '13:00:00 - 15/04/2023',
        email: 'minhth@gmail.com',
        tamTinh: '18,000,000 đ',
        giamGia: '18,000,000 đ',
        tongTienChiTiet: '18,000,000 đ',
        ghiChu:
          'Lorem ipsum dolor sit amet consectetur. Varius accumsan sem nunc lectus viverra. Ut efficitur mauris ut sagittis.',
      },
    },
  ]

  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'maDonHang',
      key: 'maDonHang',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'ngayMua',
      key: 'ngayMua',
    },
    {
      title: 'Khách hàng',
      dataIndex: 'khachHang',
      key: 'khachHang',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Album',
      dataIndex: 'album',
      key: 'album',
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'tongTien',
      key: 'tongTien',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: (text: string) => (
        <Tag color={text === 'Hoàn thành' ? 'green' : 'default'}>{text}</Tag>
      ),
    },
  ]

  const expandedRowRender = (record: DonationData) => {
    if (!record.chiTiet) return null
    return (
      <div className='p-6 bg-white shadow-md rounded-lg border border-gray-200 relative'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center space-x-2'>
            <span className='font-inter font-bold text-[14px] leading-[20px] tracking-[-0.2%] text-blue-600'>
              Thông tin
            </span>
          </div>
        </div>

        <div className='grid grid-cols-5 gap-20 mb-6'>
          <div className='flex flex-col space-y-4 col-span-2'>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong> Mã đơn hàng:</strong> {record.maDonHang}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Thời gian tạo đơn:</strong> {record.chiTiet.thoiGianTaoDon}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Thời gian thanh toán:</strong> {record.chiTiet.thoiGianThanhToan}
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-2'>
              <strong>Email:</strong> {record.chiTiet.email}
            </p>
          </div>

          <div className='flex flex-col space-y-4 col-span-3'>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Trạng thái đơn hàng:</strong>
              <Tag color='green' className='font-inter font-medium text-[14px] w-24 col-span-3'>
                {record.trangThai}
              </Tag>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Album:</strong>{' '}
              <div className='col-span-3'>{record.album}</div>
            </p>
            <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 grid grid-cols-5'>
              <strong className='col-span-2'>Ghi chú:</strong>{' '}
              <div className='col-span-3'>{record.chiTiet.ghiChu}</div>
            </p>
          </div>
        </div>

        {/* Images Section */}
        <div className='mb-6'>
          <div className='flex items-center space-x-4'>
            <div className='flex flex-col'>
              <div className='w-12 h-12 bg-gray-200 rounded-md'></div>
              <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-900 mt-2'>
                Ảnh đơn
              </p>
              <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600'>
                GIẢI MARATHON QUỐC TẾ MEKONG DELTA...
              </p>
              <p className='font-inter font-bold text-[14px] leading-[20px] text-gray-900'>
                9,000,000 đ
              </p>
            </div>
            <div className='flex flex-col'>
              <div className='w-12 h-12 bg-gray-200 rounded-md'></div>
              <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-900 mt-2'>
                Photoflat
              </p>
              <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600'>
                GIẢI MARATHON QUỐC TẾ MEKONG DELTA...
              </p>
              <p className='font-inter font-bold text-[14px] leading-[20px] text-gray-900'>
                9,000,000 đ
              </p>
            </div>
          </div>
        </div>

        <div className='border-t pt-4'>
          <div className='flex justify-end'>
            <div className='text-right flex flex-col space-y-4'>
              <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 mb-2 flex justify-between'>
                <strong>Tạm tính:</strong> {record.chiTiet.tamTinh}
              </p>
              <p className='font-inter font-medium text-[14px] leading-[20px] text-gray-600 mb-2 flex justify-between'>
                <strong>Giảm giá:</strong> {record.chiTiet.giamGia}
              </p>
              <p className='font-inter font-bold text-[14px] leading-[20px] text-gray-900 flex justify-between'>
                <strong>Tổng tiền:</strong> {record.chiTiet.tongTienChiTiet}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='container mx-auto p-4'>
      <Table
        bordered
        columns={columns}
        dataSource={dataSource}
        expandable={{
          expandedRowRender,
          expandRowByClick: true,
          onExpand: (expanded: boolean, record: DonationData) =>
            setSelectedRow(expanded ? record.key : null),
          expandedRowKeys: selectedRow ? [selectedRow] : [],
        }}
        pagination={{
          pageSize: 10,
          total: 200,
          showSizeChanger: false,
        }}
        className='shadow-md rounded-lg custom-table'
      />
    </div>
  )
}

export default OrderTable

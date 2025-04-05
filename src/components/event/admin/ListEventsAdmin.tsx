import React, { useState } from 'react'
import { Button, Modal, Tabs } from 'antd'
import Link from 'next/link'
import AllEventsAdmin from '@/components/event/admin/AllEventsAdmin'
import InsertEvents from '@/components/event/admin/InsertEvents'
import UpdateEvent from './UpdateEvent'
import { AlbumCreateRequest, AlbumItemResponse } from '@/schemas'
import ToggleSwitch from './ToggleSwitch'
import PriceConfig from './PriceConfig'

const ListEventsAdmin = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [showModalUpdate, setShowModalUpdate] = useState(false)
  const [event, setEvent] = useState<AlbumItemResponse>()
  const [selected, setSelected] = useState('overView')
  const [eventData, setEventData] = useState<AlbumCreateRequest>()
  const options = [
    { label: 'Tổng quan album', value: 'overView' },
    { label: 'Cấu hình kinh doanh', value: 'businessConfig' },
  ]
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div className='text-[#475467] breadcrumb flex gap-2'>
        <Link href='/home'>Trang chủ</Link>
        <div> &gt; </div>
        <Link href='/home'>Danh sách sự kiện</Link>
      </div>

      {/* Header */}
      <div>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div className='text-2xl font-semibold'>Danh sách sự kiện</div>
          <Button
            size='large'
            className='bg-[#0A347D] text-emerald-50 font-bold w-full sm:w-auto'
            onClick={showModal}
          >
            + Sự kiện
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        onChange={onChange}
        items={[
          {
            label: 'Tất cả',
            key: '1',
            children: <AllEventsAdmin setIsModalUpdate={setShowModalUpdate} setEvent={setEvent} />,
          },
          {
            label: 'Nháp',
            key: '2',
            children: <AllEventsAdmin setIsModalUpdate={setShowModalUpdate} setEvent={setEvent} />,
          },
          {
            label: 'Đã xuất bản',
            key: '3',
            children: <AllEventsAdmin setIsModalUpdate={setShowModalUpdate} setEvent={setEvent} />,
          },
        ]}
        className='custom-tabs'
      />

      {/* Modal: Tạo sự kiện */}
      <Modal
        title='Tạo sự kiện'
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className='h-full w-full sm:w-[800px] lg:w-[1150px]'
      >
        <div className='h-full'>
          <div className='flex justify-center'>
            <ToggleSwitch
              onChange={(value) => {
                setSelected(value)
              }}
              selected={selected}
              options={options}
            />
          </div>
          {selected === 'overView' ? (
            <InsertEvents
              onChange={(value) => {
                setSelected(value)
              }}
              setEventData={setEventData}
            />
          ) : (
            <PriceConfig />
          )}
        </div>
      </Modal>

      {/* Modal: Chỉnh sửa sự kiện */}
      <Modal
        title='Chỉnh sửa sự kiện'
        open={showModalUpdate}
        onCancel={() => setShowModalUpdate(false)}
        footer={null}
        className='h-full w-full sm:w-[800px] lg:w-[1150px]'
      >
        <div className='h-full'>
          <div className='flex justify-center'>
            <ToggleSwitch
              onChange={(value) => {
                setSelected(value)
              }}
              selected={selected}
              options={options}
            />
          </div>
          {selected === 'overView' ? (
            <UpdateEvent event={event} setShowModalUpdate={setShowModalUpdate} />
          ) : (
            <PriceConfig />
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ListEventsAdmin

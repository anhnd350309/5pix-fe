import React from 'react';
import { Button, Tabs } from 'antd';
import Link from 'next/link';
import AllEventsAdmin from '@/components/event/AllEventsAdmin'

const ListEventsAdmin = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='breadcrumb flex gap-2'>
        <Link href='/admin/home'>
          Trang chủ
        </Link>
        <div> &gt; </div>
        <Link href='/admin/home'>
          Danh sách sự kiện
        </Link>
      </div>
      <div>
        <div className='flex items-center justify-between'>
          <div className='text-2xl'>Danh sách sự kiện</div>
          <Button className='bg-[#0A347D] text-emerald-50 font-bold'> + Sự kiện</Button>
        </div>
      </div>
      <Tabs
        onChange={onChange}
        items={[
          { label: 'Tất cả', key: '1', children: <AllEventsAdmin /> },
          { label: 'Nháp', key: '2', children: <AllEventsAdmin />},
          { label: 'Đã xuất bản', key: '3', children: <AllEventsAdmin /> },
        ]}
      />
    </div>
  );
}

export default ListEventsAdmin;

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Popover } from 'antd';  // Thêm import Popover từ Ant Design
import { SearchOutlined } from '@ant-design/icons';
import Image from 'next/image';

const ListEventsDetailAdmin = () => {
  const images = Array(25).fill({
    cdn_image_url: '/assets/images/DetailEvent.png',
    image_name: 'Detail Event',
    s3_image_url: '/assets/images/DetailEvent.png'
  });

  const [hiddenImages, setHiddenImages] = useState<number[]>([]);
  const handleOptionClick = (action: any, imageIndex: any) => {
    if (action === 'hide') {
      setHiddenImages(prev => [...prev, imageIndex]);
    } else if (action === 'view') {
      window.open(images[imageIndex]?.s3_image_url, '_blank');
    } else if (action === 'find') {
    }
  };

  const content = (index: any) => (
    <div className="flex flex-col justify-start">
      <Button
        type="link"
        className="flex gap-2 items-center text-start font-bold text-black hover:bg-[#D0D5DD] hover:underline"
        onClick={() => handleOptionClick('hide', index)}
      >
        <Image
          src='/assets/icons/template/icon_hidden.svg'
          alt='Logo'
          height={15}
          width={15}
        />
        Ẩn đi
      </Button>
      <Button
        type="link"
        className="flex gap-2 items-center text-start font-bold text-black hover:bg-[#D0D5DD] hover:underline"
        onClick={() => handleOptionClick('view', index)}
      >
        <Image
          src='/assets/icons/template/icon_image.svg'
          alt='Logo'
          height={15}
          width={15}
        />
        Xem ảnh gốc
      </Button>
      <Button
        type="link"
        className="flex gap-2 items-center text-start font-bold text-black hover:bg-[#D0D5DD] hover:underline"
        onClick={() => handleOptionClick('find', index)}
      >
        <Image
          src='/assets/icons/template/icon_link.svg'
          alt='Logo'
          height={15}
          width={15}
        />
        Tìm ảnh giống
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="text-[#475467] breadcrumb flex gap-2">
        <Link href="/admin/home">
          Trang chủ
        </Link>
        <div> &gt; </div>
        <Link href="/admin/home">
          Danh sách sự kiện
        </Link>
        <div> &gt; </div>
        <Link href="/admin/home">
          Tà Năng Trail Challenge 2025
        </Link>
        <div> &gt; </div>
        <Link href="/admin/home">
          Album ảnh
        </Link>
      </div>
      <div className="flex justify-between">
        <p className="text-2xl">Tà Năng Trail Challenge 2025</p>
        <div className="flex gap-2">
          <Button size="large" className="bg-[#C7DBFF] text-black font-bold">Start Index</Button>
          <Button size="large" className="bg-[#275FC1] text-white font-bold">+ Tải ảnh lên</Button>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Input size="large" className="w-[600px]" placeholder="Tên theo BIB/text" prefix={<SearchOutlined />} />
          <Button size="large" className="bg-[#275FC1] text-white font-bold">Tìm ảnh</Button>
          <Button size="large" className="bg-[#C7DBFF] text-black font-bold">Tìm kiếm bằng hình ảnh</Button>
        </div>
        <Button size="large" className="flex gap-2 items-center bg-[#E4E7EC] text-[#344054] font-bold">
          <Image
            src='/assets/icons/template/icon_hidden.svg'
            alt='Logo'
            height={20}
            width={20}
          />
          Ẩn Label
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          !hiddenImages.includes(index) && (
            <div key={index} className="relative w-full">
              <Image
                src={image?.cdn_image_url || '/assets/images/DetailEvent.png'}
                alt='Logo'
                height={80}
                width={300}
              />
              <Popover
                content={content(index)}
                trigger="click"
                placement="bottomRight"
              >
                <Image
                  src='/assets/icons/template/icon_option.svg'
                  className="absolute top-1 right-1 cursor-pointer"
                  alt='Logo'
                  height={30}
                  width={30}
                />
              </Popover>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ListEventsDetailAdmin;

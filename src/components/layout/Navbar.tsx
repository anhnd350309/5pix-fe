import React, { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='w-[200px] bg-[#0A347D] h-full'> {/* Make the navbar stretch full height */}
      <div className="flex gap-2 bg-[#B0B0B0] text-[#0A347D] border-2 border-black p-2 cursor-pointer" onClick={toggleDropdown}>
        <Image
          className='h-6 w-6 text-white'
          src='/assets/icons/template/icon_list_events.svg'
          alt='phone'
          height={30}
          width={30}
        />
        Danh sách sự kiện
      </div>
      {isDropdownOpen && (
        <div className="bg-[#B0B0B0] text-[#0A347D]">
          <div className="flex gap-2 p-2 cursor-pointer border-b-2 border-r-2 border-l-2 border-black">
            <Image
              className='h-6 w-6 text-white'
              src='/assets/icons/template/icon_update_events.svg'
              alt='phone'
              height={30}
              width={30}
            />
            Cập nhật sự kiện
          </div>
          <div className="flex gap-2 p-2 cursor-pointer border-b-2 border-r-2 border-l-2 border-black">
            <Image
              className='h-6 w-6 text-white'
              src='/assets/icons/template/icon_album.svg'
              alt='phone'
              height={30}
              width={30}
            />
            Album ảnh
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import React from 'react'
import { Layout, Avatar, Space, Divider } from 'antd'
import { BellOutlined, UserOutlined } from '@ant-design/icons'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const { Header } = Layout

const HeaderAdmin = () => {
  const { data: session } = useSession()
  console.log(session)

  const router = useRouter()
  return (
    <Header className='h-[80px] bg-white flex justify-between items-center px-8 font-sans'>
      <Link href='/'>
        <Image
          className='h-8 w-auto'
          src='/assets/images/Logo.svg'
          alt='Logo'
          height={30}
          width={100}
        />
      </Link>
      <Space size={24}>
        <Space size={16}>
          <div className='text-[#1D2939] flex flex-col items-end'>
            <p className='font-bold text-sm'>{session?.user.email}</p>
            <p className='text-sm'>Quản trị viên</p>
          </div>
          <Avatar
            size={32}
            icon={<UserOutlined />}
            className='bg-[#E0EAFF] text-[#3538CD]'
            onClick={() => router.push('/personal_info')}
          />
        </Space>
        <Divider type='vertical' className='h-10 m-0 bg-[#EAECF0]' />
        <BellOutlined className='text-xl text-[#667085] cursor-pointer' />
      </Space>
    </Header>
  )
}

export default HeaderAdmin

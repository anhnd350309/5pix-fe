import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Link as LinkScroll } from 'react-scroll'
import { useSession, signIn } from 'next-auth/react'
import { Dropdown, Menu, Modal, Form, Select, DatePicker, Button } from 'antd' // Import Dropdown, Menu và Modal
import moment from 'moment'
import { createMerchantsPost, getMeMerchantsGetMeGet } from '@/services/merchants/merchants'
import { MerchantType, MerchantYearsOfExperience } from '@/schemas'
import SvgUser from '../icons/icons/User'
import { CheckCircleTwoTone } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { Input } from '../ui/input'
const { Option } = Select

interface RegistrationFormValues {
  merchant_type: string
  full_name: string
  date_of_birth: string
  email: string
  phone_number: string
  address: string
  years_of_experience: string
  events_attended: string
  social_media_link: string
  sample_photo_link: string
}
const Header = ({ bgColor }: { bgColor: string }) => {
  const [activeLink, setActiveLink] = useState<string>('')
  const { data: session } = useSession()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalStep, setModalStep] = useState<'form' | 'success'>('form')
  const [form] = Form.useForm()
  const router = useRouter()
  const navigateManage = () => {
    console.log(process.env.NEXT_PUBLIC_ENV)
    if (session) {
      const userRole = session.role // Assuming `role` is part of the session user object
      if (userRole === 'admin') {
        window.location.assign(
          process.env.NEXT_PUBLIC_ENV === 'dev'
            ? 'https://admin-dev.5pix.org/'
            : 'https://admin.5pix.org/',
        )
      } else if (userRole === 'merchant') {
        window.location.assign(
          process.env.NEXT_PUBLIC_ENV === 'dev'
            ? 'https://merchant-dev.5pix.org/'
            : 'https://doitac.5pix.org/',
        )
      } else {
        console.error('User role is not recognized.')
      }
    } else {
      console.error('User is not logged in.')
    }
  }
  // Menu dành cho dropdown
  const partnerMenu = (
    <Menu>
      <Menu.Item
        key='self'
        onClick={() => {
          router.push('/personal_info')
        }}
      >
        Cá nhân
      </Menu.Item>
      <Menu.Item key='manage' onClick={navigateManage}>
        Quản lý
      </Menu.Item>
    </Menu>
  )

  const onFinish = (values: RegistrationFormValues) => {
    const formattedDate = values.date_of_birth
      ? moment(values.date_of_birth).format('YYYY-MM-DD')
      : ''

    const formData = {
      ...values,
      date_of_birth: formattedDate,
      merchant_type: values.merchant_type as MerchantType, // Ensure correct type
      years_of_experience: values.years_of_experience as MerchantYearsOfExperience, // Ensure correct type
    }
    createMerchantsPost(formData)
    // Handle form submission here
    // setIsModalVisible(false)
    setModalStep('success')
    form.resetFields()
  }
  const onClickMerchant = async () => {
    if (session) {
      try {
        getMeMerchantsGetMeGet().then((res) => {
          console.log('getMeMerchantsGetMeGet', res)
          if (res.data?.merchant_active_status === 'waiting_for_approve') {
            setModalStep('success')
          } else {
            setModalStep('form')
          }
        })
      } catch {
        setModalStep('form')
      }

      setIsModalVisible(true)
    } else {
      // signIn()
      console.log('Chưa đăng nhập')
    }
  }
  return (
    <>
      <header className={`top-0 z-30 w-full bg-transparent transition-all pt-4`}>
        <nav className='container mx-auto grid grid-flow-col px-8 py-3 sm:py-4 xl:px-16 relative z-10'>
          <div className='col-start-1 col-end-2 flex items-center'>
            <Link href='/'>
              <Image
                className='h-8 w-auto'
                src='/assets/images/Logo.svg'
                alt='Logo'
                height={30}
                width={100}
              />
            </Link>
          </div>
          <ul
            className={`col-start-4 col-end-8 hidden items-center ${
              bgColor === 'white' ? 'text-black' : 'text-white'
            } lg:flex`}
          >
            <Link
              href='/'
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'about'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
              onClick={() => {
                setActiveLink('about')
              }}
            >
              Trang chủ
            </Link>
            <Link
              href='/list_events'
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'feature'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
              onClick={() => {
                setActiveLink('feature')
              }}
            >
              Danh sách sự kiện
            </Link>
            {/* <LinkScroll
              activeClass='active'
              to='pricing'
              spy
              smooth
              duration={1000}
              onSetActive={() => {
                setActiveLink('pricing')
              }}
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'pricing'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
            >
              Về 5PIX
            </LinkScroll> */}

            <Link
              href='https://5bib.com/'
              className={`animation-hover mx-2 inline-block cursor-pointer px-4 py-2 relative${
                activeLink === 'buyticket'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
              target='_blank'
              onClick={() => {
                setActiveLink('buyticket')
              }}
            >
              Mua vé sự kiện
            </Link>
            <LinkScroll
              activeClass='active'
              to='preview'
              spy
              smooth
              duration={1000}
              onSetActive={() => {
                setActiveLink('preview')
              }}
              onClick={onClickMerchant}
              className={`animation-hover mx-2 inline-block font-bold  cursor-pointer px-4 py-2 relative${
                activeLink === 'preview'
                  ? ' animation-active text-template-orange-500 '
                  : ` hover:text-template-orange-500 ${
                      bgColor === 'white' ? 'text-black' : 'text-white'
                    }`
              }`}
            >
              Trở thành đối tác của 5PIX
            </LinkScroll>
          </ul>

          {/* Authentication Section */}
          <div className='col-start-8 col-end-10 flex items-center justify-end'>
            {session ? (
              <div className='flex flex-row gap-4'>
                <div className='flex flex-row items-center'>
                  {/* <ShoppingCartOutlined
                    style={{ fontSize: '24px' }}
                    onClick={() => {
                      router.push('/orders')
                    }}
                  />
                  | */}
                  <Dropdown overlay={partnerMenu} trigger={['click']}>
                    <SvgUser width={24} />
                  </Dropdown>
                </div>
                {/* <button
                  className='bg-template-orange-500 hover:bg-template-orange-700 text-white font-bold py-2 px-4 rounded'
                  onClick={() => signOut()}
                >
                  Đăng xuất
                </button> */}
              </div>
            ) : (
              <button
                className='bg-[#2563EB] text-white font-bold py-1 px-4 rounded-3xl'
                onClick={() => signIn()}
              >
                Đăng nhập
              </button>
            )}
          </div>
        </nav>
      </header>

      {/* Modal cho "Trở thành đối tác của 5PIX" */}
      <Modal
        className='custom-modal'
        // title='Trở thành đối tác của 5PIX'
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className='flex flex-col md:flex-row w-full min-h-[632px]'>
          {modalStep === 'form' ? (
            <div className='w-full flex items-center justify-center'>
              <Form
                className='w-full pt-4'
                form={form}
                name='registration_form'
                onFinish={onFinish}
                layout='horizontal'
                initialValues={{
                  merchant_type: 'individual',
                  team: 'Đội 1',
                }}
              >
                <h1 className='text-center font-medium text-3xl  pb-3'>
                  Đăng ký làm nhiếp ảnh gia
                </h1>
                <Form.Item
                  className='mb-6'
                  name='merchant_type'
                  label='Loại hình đăng ký'
                  rules={[{ required: true, message: 'Vui lòng chọn loại hình!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Select
                    placeholder='Chọn'
                    className='rounded-2xl [&_.ant-select-selector]:rounded-2xl'
                  >
                    <Option value='individual'>Cá nhân</Option>
                    <Option value='company'>Doanh nghiệp</Option>
                    <Option value='other'>Khác</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  className='mb-6'
                  name='full_name'
                  label='Họ và tên'
                  rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input placeholder='Nguyen Van A' />
                </Form.Item>

                <Form.Item
                  className='mb-6'
                  name='date_of_birth'
                  label='Ngày sinh'
                  rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <DatePicker
                    format='DD/MM/YYYY'
                    style={{ width: '100%', borderRadius: '1rem' }}
                    placeholder='15/06/1990'
                  />
                </Form.Item>

                <Form.Item
                  className='mb-6'
                  name='email'
                  label='Email'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập email!',
                      type: 'email',
                    },
                  ]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input placeholder='username@gmail.com' />
                </Form.Item>

                <Form.Item
                  className='mb-6'
                  name='phone_number'
                  label='Số điện thoại liên hệ'
                  rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input placeholder='098765322' />
                </Form.Item>

                <Form.Item
                  className='mb-6'
                  name='address'
                  label='Địa chỉ'
                  rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input placeholder='Trần Vỹ, Mai Dịch, Cầu Giấy, Hà Nội' />
                </Form.Item>

                <Form.Item
                  className='mb-6'
                  name='years_of_experience'
                  label='Số năm kinh nghiệm'
                  rules={[{ required: true, message: 'Vui lòng chọn!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Select
                    placeholder='Chọn kinh nghiệm'
                    className='rounded-2xl [&_.ant-select-selector]:rounded-2xl'
                  >
                    <Option value='< 1'>Ít hơn 1 năm</Option>
                    <Option value='1-3'>Từ 1 đến 3 năm</Option>
                    <Option value='3-5'>Từ 3 đến 5 năm</Option>
                    <Option value='> 5'>Hơn 5 năm</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  className='mb-6'
                  name='social_media_link'
                  label='Bản đính kèm tài khoản media'
                  rules={[{ required: true, message: 'Vui lòng nhập tài khoản media!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input placeholder='Đính kèm social media của bạn' />
                </Form.Item>

                <Form.Item
                  className='mb-6'
                  name='sample_photo_link'
                  label='Đường link thư mục demo'
                  rules={[{ required: true, message: 'Vui lòng nhập link demo!' }]}
                  labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                  wrapperCol={{ span: 14 }}
                >
                  <Input placeholder='Đường link thư mục demo' />
                </Form.Item>

                <Form.Item>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      style={{ borderRadius: '20px', width: '350px', height: '40px' }}
                      type='primary'
                      htmlType='submit'
                    >
                      Đăng ký
                    </Button>
                  </div>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div className='w-full p-6 flex items-center justify-center min-h-[632px]'>
              <div className='max-w-[400px] text-center'>
                <CheckCircleTwoTone twoToneColor='#2563EB' style={{ fontSize: 48 }} />
                <p className='mt-4 text-sm font-medium'>
                  Yêu cầu đăng ký làm nhiếp ảnh gia của bạn đã được gửi.
                </p>
                <p className='mt-2 text-sm text-gray-800'>
                  Yêu cầu sẽ được xử lý trong vòng 12 tiếng. Trường hợp cần hỗ trợ, vui lòng liên hệ{' '}
                  <b>0986587345</b>.
                </p>
                <Button
                  type='primary'
                  className='mt-6'
                  onClick={() => {
                    setIsModalVisible(false)
                    // setModalStep('form')
                  }}
                  block
                >
                  Về trang chủ
                </Button>
              </div>
            </div>
          )}
          <div>
            <img
              src='/assets/images/FormMerchant.png'
              alt='partner'
              className='w-full h-full object-cover'
            />
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Header

import React, { useEffect, useState } from 'react'
import { PaymentMethodSelector } from '@/components/credit/PaymentMethodSelector'
import Cart from '@/components/credit/Cart'
import CheckoutInfo from '@/components/common/CheckOut'
import { Button, Card, Checkbox, Col, Form, Input, Result, Row, Select } from 'antd'
import { getImageCollectionCollectionItemGet } from '@/services/image-collection/image-collection'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import axiosInstance from '@/api/axiosInstance'
import {
  CollectionImageWithQueryResponseImageQueries,
  CreateOrderResponse,
  ItemResponse,
} from '@/schemas'
import { detailPubAlbumsAlbumSlugGet } from '@/services/public-album/public-album'
import { getPaymentVnpayGetPaymentGet } from '@/services/vnpay-ipn/vnpay-ipn'
import { CheckCircleOutlined, CloseCircleOutlined, UserOutlined } from '@ant-design/icons'
import SvgCart from '@/components/icons/icons/Cart'
import { format } from 'path'
const { Option } = Select
import useCurrency from '@/hooks/useCurrency'
type Repo = {
  order: CreateOrderResponse
}
export const getServerSideProps = (async (context) => {
  const proto =
    context.req.headers['x-forwarded-proto'] ||
    (process.env.NODE_ENV === 'production' ? 'https' : 'http')
  const host = context.req.headers.host || ''
  const baseUrl = `${proto}://${host}`
  const session = await getServerSession(context.req, context.res, authOptions(baseUrl))
  const id = context.params?.id

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    }
  }

  try {
    const response = await axiosInstance.get('/order/list', {
      params: { order_id: id },
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })

    const data = response.data
    return {
      props: { repo: { order: data.data[0] } },
    }
  } catch (error: any) {
    console.error('Error fetching order data:', error)
    return {
      props: { repo: { order: null } },
    }
  }
}) satisfies GetServerSideProps<{ repo: Repo }>
const Orders = ({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [items, setItems] = useState<ItemResponse[]>([])

  const [albumName, setAlbumName] = useState<string>('')
  const { order } = repo
  const formatter = useCurrency('đ')
  console.log('order', order)
  const [albums, setAlbums] = useState<CollectionImageWithQueryResponseImageQueries>(
    order.line_items[0].image_queries || {},
  )
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    console.log('Form values:', values)
  }
  const totalPrice = order.line_items[0].line_price
  useEffect(() => {
    try {
      setIsLoading(true)
      getImageCollectionCollectionItemGet({
        collection_id: order?.first_line_collection_id,
      }).then((res) => {
        setItems(res.images ?? [])
      })
      detailPubAlbumsAlbumSlugGet(order.first_line_album_id).then((res) => {
        setAlbumName(res.data?.album_name || '')
        console.log('res', res.data?.album_name)
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  const handlePayment = async () => {
    form.submit()

    await getPaymentVnpayGetPaymentGet({
      order_id: order.id,
      return_url: `${window.location.origin}/payment/callback`,
    })
      .then((res) => {
        if (res.RspCode === '00') {
          if (res.Message) {
            window.location.href = res.Message
          } else {
            console.error('Error: Message is undefined')
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching payment data:', error)
      })
  }
  return (
    <div className='relative'>
      <div
        className=' pt-6 lg:pb-10 width-full'
        style={{ background: 'linear-gradient(to bottom, #FFFFFF, #E1F4FF)' }}
      >
        <div className='flex flex-wrap mx-auto'>
          <div className='w-full xl:w-3/5 lg:px-3 space-y-2 md:space-y-6 flex flex-col items-end '>
            {order?.internal_status === 'COMPLETE' && (
              <div
                className='max-w-3xl p-5 pb-0 w-full flex flex-row items-center justify-start gap-2 '
                style={{
                  color: '#12B76A',
                  background: 'linear-gradient(to bottom, #D1FADF, #FFFFFF)',
                }}
              >
                <CheckCircleOutlined className='text-5xl' />
                <h2 className='text-xl font-sans font-bold'>Thanh toán thành công</h2>
              </div>
            )}
            {order?.internal_status === 'PAY_GATE_FAIL' && (
              <div
                className='max-w-3xl p-5 pb-0 w-full flex flex-row items-center justify-start gap-2 '
                style={{
                  color: '#D92D20',
                  background: 'linear-gradient(to bottom, #FECDCA, #FFFFFF)',
                }}
              >
                <CloseCircleOutlined className='text-5xl' />
                <h2 className='text-xl font-sans font-bold'>Thanh toán thất bại</h2>
              </div>
            )}
            {(order?.internal_status === 'NEW' ||
              order?.internal_status === 'WAIT_FOR_PAYMENT') && (
              <Card
                title={
                  <span>
                    <UserOutlined /> Thông tin người mua
                  </span>
                }
                style={{ maxWidth: 768 }}
              >
                <Form
                  form={form}
                  layout='horizontal'
                  onFinish={onFinish}
                  initialValues={{
                    countryCode: '+84',
                    agreeDigital: true,
                    agreeTerms: true,
                  }}
                >
                  <Form.Item
                    label='Họ và tên đệm'
                    name='lastName'
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên đệm' }]}
                    labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                    wrapperCol={{ span: 14 }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label='Tên'
                    name='firstName'
                    rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                    labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                    wrapperCol={{ span: 14 }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' },
                    ]}
                    labelCol={{ span: 8, style: { wordBreak: 'break-word', whiteSpace: 'normal' } }}
                    wrapperCol={{ span: 14 }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name='phone'
                    label='Số điện thoại'
                    rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                    labelCol={{
                      span: 8,
                      style: { wordBreak: 'break-word', whiteSpace: 'normal' },
                    }}
                    wrapperCol={{ span: 14 }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name='agreeDigital'
                    valuePropName='checked'
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject('Bạn phải đồng ý với thỏa thuận nội dung số'),
                      },
                    ]}
                  >
                    <Checkbox>
                      Tôi đồng ý với việc thực hiện thỏa thuận về nội dung số (ví dụ như việc cung
                      cấp các liên kết tải xuống hình ảnh / video) một cách rõ ràng trước khi thời
                      hạn rút lui kết thúc. Tôi hiểu rằng tôi sẽ không còn quyền hợp pháp để rút lui
                      đối với nội dung số khi hợp đồng được thực hiện
                    </Checkbox>
                  </Form.Item>

                  <Form.Item
                    name='agreeTerms'
                    valuePropName='checked'
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject('Bạn phải đồng ý với điều khoản sử dụng'),
                      },
                    ]}
                  >
                    <Checkbox>
                      Tôi đã đọc và đồng ý với{' '}
                      <a href='/terms' target='_blank' rel='noopener noreferrer'>
                        Điều khoản sử dụng của 5PIX
                      </a>
                    </Checkbox>
                  </Form.Item>
                </Form>
              </Card>
            )}
            <CheckoutInfo
              isLoading={isLoading}
              price={order.line_items[0].album_image_price}
              album_price={order.line_items[0].album_price}
              items={items}
              album_name={albumName}
              albums={albums}
            />
          </div>
          <div className='w-full xl:w-2/5 lg:px-3 mt-2 md:mt-6 xl:mt-0 xl:sticky xl:top-4 xl:h-fit'>
            {order?.internal_status === 'NEW' || order?.internal_status === 'WAIT_FOR_PAYMENT' ? (
              <>
                <PaymentMethodSelector />
                <div className='mt-4'></div>
                <Cart total={totalPrice} />
                <div className=' mt-2 lg:mt-6 px-3 md:px-0 max-w-md'>
                  <Button type='primary' className='w-full rounded-lg h-12' onClick={handlePayment}>
                    Thanh toán
                  </Button>
                </div>
              </>
            ) : (
              <div className='bg-white px-6 py-2 md:rounded-lg shadow-md max-w-md'>
                <div className='flex flex-row items-center justify-start pb-2 mb-2 space-x-2 border-b border-b-[#E4E7EC]'>
                  <div>
                    <SvgCart width={28} />
                  </div>
                  <div className='font-sans font-bold text-base text-gray-950'>
                    Thông tin thanh toán
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex flex-row items-center font-sans '>
                    <div className='flex-1 text-[#667085]'>Thời gian giao dịch</div>
                    <div className='flex-end font-normal text-sm'>10/04/2025 16:54</div>
                  </div>
                  <div className='flex flex-row items-center font-sans '>
                    <div className='flex-1 text-[#667085]'>Phương thức thanh toán</div>
                    <div className='flex-end font-normal text-sm'>VNPAY - QR</div>
                  </div>
                  <div className='flex flex-row items-center font-sans '>
                    <div className='flex-1 text-[#667085]'>Trạng thái thanh toán</div>
                    {order?.internal_status === 'PAY_GATE_FAIL' ? (
                      <div className='flex-end font-bold text-sm' style={{ color: '#D92D20' }}>
                        Thanh toán thất bại
                      </div>
                    ) : (
                      <div className='flex-end font-bold text-sm' style={{ color: '#12B76A' }}>
                        Thanh toán thành công
                      </div>
                    )}
                  </div>
                </div>
                <div className='pt-4 border-t border-t-[#E4E7EC] mt-4 mb-2'>
                  <div className='flex flex-row items-center font-sans '>
                    <div className='flex-1 font-sans font-bold text-base text-gray-950 '>
                      {'Tổng tiền thanh toán'}
                    </div>
                    <div className='flex-end font font-bold text-xl text-primary-600'>
                      {order.line_items[0].line_price && formatter(order.line_items[0].line_price)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders

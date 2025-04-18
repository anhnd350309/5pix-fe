import React, { useEffect, useState } from 'react'
import { List, Button, Spin, Popconfirm, message } from 'antd'
import SvgNoCart from '@/components/icons/icons/NoCart'
import { useRouter } from 'next/router'
import { AlbumItemResponsePublic, ItemResponse } from '@/schemas'
import { detailPubAlbumsAlbumSlugGet } from '@/services/public-album/public-album'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  getImageCollectionCollectionItemGet,
  getImageCollectionGet,
  removeImageImageCollectionRemoveImageDelete,
} from '@/services/image-collection/image-collection'
import { DeleteOutlined } from '@ant-design/icons'
import { createOrderOrderCreateBuyCollectionPost } from '@/services/order/order'

const total = '1.030.000 đ'
type Repo = {
  event?: AlbumItemResponsePublic
}
export const getServerSideProps = (async (context) => {
  const slug = context.params?.slug
  const res = await detailPubAlbumsAlbumSlugGet(slug as string)
  const event = res.data
  if (!event) {
    return {
      notFound: true,
    }
  }

  return {
    props: { repo: { event } },
  }
}) satisfies GetServerSideProps<{ repo: Repo }>
export default function CartPage({ repo }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [item, setItem] = useState<ItemResponse[]>([])
  const [loading, setLoading] = useState(false)
  const [collectionId, setCollectionId] = useState<number>(0)
  const { event } = repo
  const fetchImage = async () => {
    try {
      setLoading(true)
      const data = await getImageCollectionGet({
        album_id: event?.id,
        page: 1,
        page_size: 100,
        sort_by: 'id',
        order: 'desc',
      })
      setCollectionId(data.data[0].id)
      const collection = await getImageCollectionCollectionItemGet({
        collection_id: data.data[0].id,
      })
      setItem(collection)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchImage()
  }, [])
  const router = useRouter()

  const confirm = async (itemId?: number) => {
    try {
      // const data = await getImageCollectionGet({
      //   album_id: event?.id,
      // })
      removeImageImageCollectionRemoveImageDelete({
        collection_id: collectionId,
        image_ids: [itemId || 0],
      }).then((res) => {
        if (res) {
          message.success('Đã xóa ảnh khỏi giỏ hàng')
        } else {
          message.error('Có lỗi xảy ra khi xóa khỏi giỏ hàng')
        }
      })
    } catch (error) {
      console.error('Error removing from cart:', error)
    } finally {
      fetchImage()
    }
  }
  const createOrder = () => {
    createOrderOrderCreateBuyCollectionPost({
      collection_id: collectionId,
    }).then((res) => {
      if (res) {
        router.push(`/orders/${res.id}`)
      } else {
        message.error('Có lỗi xảy ra khi tạo đơn hàng')
      }
    })
  }
  return (
    <div
      className=' py-8 px-4 w-[100vw]'
      style={{ background: 'linear-gradient(to bottom, #FFFFFF, #E1F4FF)' }}
    >
      <div className='max-w-4xl mx-auto'>
        {/* Tiêu đề trang giỏ hàng */}
        <h1 className='text-xl font-semibold mb-6'>Giỏ hàng</h1>
        <hr className='mb-4 border-gray-200' />
        {/* Danh sách sản phẩm trong giỏ */}

        {loading ? (
          <div className='flex justify-center items-center p-6'>
            <Spin />
          </div>
        ) : (
          <List
            itemLayout='horizontal'
            dataSource={item}
            renderItem={(item) => (
              <List.Item className='mb-4 bg-white rounded-lg shadow p-4 items-center relative'>
                <div className='absolute top-2 right-2'>
                  <Popconfirm
                    title='Bạn có chắc chắn muốn xóa ảnh này khỏi giỏ hàng?'
                    onConfirm={() => confirm(item.album_image_id)}
                    okText='Có'
                    cancelText='Không'
                    className='bg-gray-200 rounded-full'
                  >
                    <Button type='text' style={{ color: '#344054' }} icon={<DeleteOutlined />} />
                  </Popconfirm>
                </div>
                <List.Item.Meta
                  avatar={<img className='w-24 h-24 object-cover rounded-md' />}
                  title={<span className='text-blue-500 text-base font-medium'>Ảnh đơn</span>}
                  description={
                    <div>
                      <p className='text-sm text-gray-700'>{item.album_image_id}</p>
                      <p className='text-sm text-gray-400'>{event.album_name}</p>
                    </div>
                  }
                />

                <div className='absolute bottom-2 right-2'>
                  <p className='text-blue-500 font-bold'>{item.id} đ</p>
                </div>
              </List.Item>
            )}
            locale={{
              emptyText: (
                <div className='flex flex-col text-center py-8 items-center gap-3'>
                  <SvgNoCart width={128} />
                  <p className='text-gray-500'>Chưa có sản phẩm trong giỏ hàng</p>
                  <Button type='primary' className='rounded-full'>
                    Tìm kiếm ảnh ngay
                  </Button>
                </div>
              ),
            }}
          />
        )}

        {/* Khối tổng tiền + nút thanh toán */}
        <div className='bg-white rounded-lg shadow p-4 flex justify-between items-center'>
          <div>
            <p className='text-sm text-gray-500'>Tổng tiền</p>
            <p className='text-xl font-bold text-blue-500'>{total}</p>
            <p className='text-xs text-gray-400 mt-1'>
              (Không có mã khuyến mại, bạn có thể áp dụng ở trang thanh toán)
            </p>
          </div>
          <Button type='primary' className='rounded-full px-8 py-2' onClick={createOrder}>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  )
}

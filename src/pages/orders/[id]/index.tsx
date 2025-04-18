import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import CreditSelection from '@/components/credit/Selection'
import { PaymentMethodSelector } from '@/components/credit/PaymentMethodSelector'
import Cart from '@/components/credit/Cart'
import CheckoutInfo from '@/components/common/CheckOut'
import { Button } from 'antd'
import { getImageCollectionCollectionItemGet } from '@/services/image-collection/image-collection'
import { listOrdersOrderListGet } from '@/services/order/order'
import { GetServerSideProps } from 'next'
type Repo = {
  data: any
}
export const getServerSideProps = (async (context) => {
  const id = context.params?.id
  console.log('id', id)
  const data = await listOrdersOrderListGet({
    order_id: typeof id === 'string' ? parseInt(id, 10) : undefined,
  })
  console.log('data', data)
  return {
    props: { repo: { data } },
  }
}) satisfies GetServerSideProps<{ repo: Repo }>
const Orders = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  useEffect(() => {
    try {
      setIsLoading(true)
      getImageCollectionCollectionItemGet({
        collection_id: 13,
      }).then((res) => {
        console.log(res)
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])
  return (
    <div className='relative'>
      <div
        className=' pt-6 lg:pb-10 width-full'
        style={{ background: 'linear-gradient(to bottom, #FFFFFF, #E1F4FF)' }}
      >
        <div className='flex flex-wrap mx-auto'>
          <div className='w-full xl:w-3/5 lg:px-3 space-y-2 md:space-y-6 flex justify-end'>
            <CheckoutInfo isLoading={isLoading} />
          </div>
          <div className='w-full xl:w-2/5 lg:px-3 mt-2 md:mt-6 xl:mt-0 xl:sticky xl:top-4 xl:h-fit'>
            <PaymentMethodSelector />
            <div className='mt-4'></div>
            <Cart />
            <div className=' mt-2 lg:mt-6 px-3 md:px-0 max-w-md'>
              <Button type='primary' className='w-full rounded-lg h-12'>
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders

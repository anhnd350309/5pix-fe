import React, { FC, useEffect, useMemo } from 'react'
import useCurrency from '@/hooks/useCurrency'
import { CheckoutType } from '@/constants/payment'
import { ItemCheckout, useCheckoutStore } from '@/store/CartStore'
import InputVoucher from './InputVoucher'
import SvgCart from '../icons/icons/Cart'

type CartProps = {
  cartItems?: ItemCheckout[]
  handleCheckingVoucher?: any
  setPriceRule?: any
  setDiscount?: any
  discount?: any
  total?: any
  setTotal?: any
}
const Cart: FC<CartProps> = ({
  cartItems,
  handleCheckingVoucher,
  setPriceRule,
  setDiscount,
  discount,
  total,
  setTotal,
}) => {
  const formatter = useCurrency('đ')

  const { fixedDiscountPercent, type } = useCheckoutStore()

  // const [groupDiscount, setGroupDiscount] = useState(0);

  // const buy_group_conditions = race?.race_extenstion?.buy_group_condition?.conditions || []

  useEffect(() => {
    if (!cartItems) return

    const _total = cartItems.reduce((accumulator, cartItem) => {
      const price = cartItem?.merchandise?.price
      const quantity = cartItem?.quantity
      return accumulator + price * quantity
    }, 0)

    setTotal(_total)
  }, [cartItems])

  const quantity = useMemo(() => {
    if (!cartItems) return 0

    return cartItems.reduce((accumulator, cartItem) => {
      const quantity = cartItem?.quantity ?? 0
      return accumulator + quantity
    }, 0)
  }, [cartItems])

  const getConditionDiscount = () => {
    let condition_discount = 0

    switch (type) {
      // case CheckoutType.DEFAULT: {
      //   if (buy_group_conditions.length === 0) return 0

      //   buy_group_conditions.forEach((condition) => {
      //     if (condition.discount_percent && condition.min_quantity <= quantity) {
      //       condition_discount = condition.discount_percent / 100
      //     }
      //   })
      //   break
      // }
      case CheckoutType.ENTERPRISE_GROUP_BUY:
        condition_discount = fixedDiscountPercent / 100
        break
      default:
        condition_discount = 0
        break
    }

    return condition_discount
  }

  const condition_discount = getConditionDiscount()
  const finalDiscount = total * condition_discount + discount

  // if (!cartItems) return null
  return (
    <div className='bg-white px-6 py-2 md:rounded-lg shadow-md max-w-md'>
      <div className='flex flex-row items-center justify-start pb-2 mb-2 space-x-2 border-b border-b-[#E4E7EC]'>
        <div>
          <SvgCart width={28} />
        </div>
        <div className='font-sans font-bold text-base text-gray-950'>Thanh toán</div>
      </div>
      <div className='space-y-2'>
        <div className='flex flex-row items-center font-sans '>
          <div className='flex-1 text-[#667085]'>{'Tổng tiền sản phẩm'}</div>
          <div className='flex-end font-bold'>{formatter(total)}</div>
        </div>
        {type !== CheckoutType.ENTERPRISE_GROUP_BUY && (
          <InputVoucher
            onSubmit={handleCheckingVoucher}
            setPriceRule={setPriceRule}
            setDiscount={setDiscount}
          />
        )}
      </div>
      <div className='pt-4 border-t border-t-[#E4E7EC] mt-4 mb-2'>
        <div className='flex flex-row items-center font-sans '>
          <div className='flex-1 font-sans font-bold text-base text-gray-950 '>
            {'Tổng tiền thanh toán'}
          </div>
          <div className='flex-end font font-bold text-xl text-primary-600'>
            {/* {formatter(Math.max(total - finalDiscount, 0))} */}
            {total && formatter(total)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

'use client'

import { create } from 'zustand'
// import { RacePreview } from './utils'
import { CheckoutType } from '@/constants/payment'
import { Data } from '@/types/data'
export interface IFormUserInfo {}
export interface ItemCheckout {
  merchandise: Data.TicketType
  id: string | number
  quantity: number
  name: string
  // course_type?: COURSE_TYPE
  course?: Data.RaceCourse
}

interface CheckoutStoreState {
  // race: RacePreview | null
  items: ItemCheckout[]
  userInfo: Partial<IFormUserInfo> | null
  quantityById: Record<string, number>
  orderId: number | null
  order: Data.Order | null
  type: CheckoutType
  fixedDiscountPercent: number // NOTE: % giảm giá đối với mua nhóm doanh nghiệp
  cart: any[]
  groupId: string | null //id nhóm - mua nhóm doanh nghiệp
  checkout(
    data: {
      userInfo?: Partial<IFormUserInfo> | null
      // race: RacePreview
      items: ItemCheckout[]
      orderId?: number | null
    },
    order?: Data.Order | null,
  ): void
  setOrderId(id: unknown): void
  change(id: string | number, value: number): void
  increase(id: string | number): void
  decrease(id: string | number): void
  clear(): void
  setType(type: CheckoutType): void
  setFixedDiscountPercent(percent: number): void
  setGroupId: (groupId: string) => void
}

const useCheckoutStore = create<CheckoutStoreState>((set) => ({
  race: null,
  type: CheckoutType.DEFAULT,
  orderId: null,
  order: null,
  items: [],
  cart: [],
  userInfo: null,
  quantityById: {},
  fixedDiscountPercent: 0,
  groupId: null,
  checkout(data, order) {
    return set(() => ({
      order: order || null,
      userInfo: data.userInfo,
      items: data.items,
      // race: data.race,
      orderId: data.orderId || null,
    }))
  },
  remove(id: string | number) {
    return set((state) => ({ cart: state.cart.filter((v) => v.id !== id) }))
  },
  add(data: any) {
    return set((state) => ({ cart: state.cart.concat(data) }))
  },
  setOrderId(id) {
    return set(() => ({ orderId: typeof id == 'number' ? id : null }))
  },
  change(id, value) {
    return set((state) => {
      const quantity = Math.max(0, value)
      return {
        quantityById: {
          ...state.quantityById,
          [id]: quantity,
        },
      }
    })
  },
  increase(id) {
    return set((state) => {
      const quantity = Math.max(0, (state.quantityById[id] || 0) + 1)
      return {
        quantityById: {
          ...state.quantityById,
          [id]: quantity,
        },
      }
    })
  },
  decrease(id) {
    return set((state) => {
      const quantity = Math.max(0, (state.quantityById[id] || 0) - 1)
      return {
        quantityById: {
          ...state.quantityById,
          [id]: quantity,
        },
      }
    })
  },
  clear() {
    return set({
      // race: null,
      orderId: null,
      items: [],
      cart: [],
      quantityById: {},
    })
  },
  setType(type: CheckoutType) {
    return set(() => ({ type }))
  },
  setFixedDiscountPercent(fixedDiscountPercent: number) {
    return set(() => ({ fixedDiscountPercent }))
  },
  setGroupId(groupId: string) {
    return set(() => ({ groupId }))
  },
}))
export { useCheckoutStore }

import OrderTable from '@/components/admin/OrderTable'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'
const Orders = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Danh sách đơn hàng</h1>
      <OrderTable />
    </div>
  )
}

export default Orders

// Chỉ cho phép role merchant truy cập
Orders.requireAuth = true
Orders.requiredRoles = ['admin', 'merchant']
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
Orders.getLayout = getLayout

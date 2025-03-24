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
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
Orders.getLayout = getLayout

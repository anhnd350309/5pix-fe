import OrderTable from '@/components/admin/orders/OrderTable'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
const Orders = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Danh sách đơn hàng</h1>
      <OrderTable />
    </div>
  )
}

export default Orders
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
Orders.getLayout = getLayout

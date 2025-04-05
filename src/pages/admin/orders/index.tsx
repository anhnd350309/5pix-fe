import OrderTable from '@/components/admin/OrderTable'
import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
const Orders = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Danh sách đơn hàng</h1>
      <OrderTable />
    </div>
  )
}

export default Orders

Orders.requireAuth = true
Orders.requiredRoles = ['admin']
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
Orders.getLayout = getLayout

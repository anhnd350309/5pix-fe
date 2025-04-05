import UserTable from '@/components/admin/UserTable'
import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
const Users = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>Danh sách đối tác</h1>
      <UserTable />
    </div>
  )
}

export default Users

Users.requireAuth = true
Users.requiredRoles = ['admin']
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
Users.getLayout = getLayout

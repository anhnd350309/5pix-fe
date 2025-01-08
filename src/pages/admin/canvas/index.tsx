import dynamic from 'next/dynamic'

const CanvasEditor = dynamic(() => import('@/components/common/CanvasEditor'), { ssr: false })

const CanvasAdmin = () => {
  return (
    <>
      <CanvasEditor />
    </>
  )
}
export default CanvasAdmin
export const getLayout = (page: React.ReactNode) => <div>{page}</div>
CanvasAdmin.getLayout = getLayout

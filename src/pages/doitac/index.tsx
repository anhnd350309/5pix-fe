import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ListEventsAdmin from '@/components/event/admin/ListEventsAdmin'
import { useSession } from 'next-auth/react'
import LayoutMerchant from '@/components/layout/merchant/LayoutMerchant'
type Props = {}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data: session } = useSession()

  return (
    <>
      <ListEventsAdmin />
    </>
  )
}

// Chỉ cho phép role merchant truy cập
Home.requireAuth = true
Home.requiredRoles = ['admin', 'merchant']
export default Home
export const getLayout = (page: React.ReactNode) => <LayoutMerchant>{page}</LayoutMerchant>
Home.getLayout = getLayout

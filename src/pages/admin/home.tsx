import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SEOHead from 'components/seo'
import LayoutAdmin from '@/components/layout/admin/LayoutAdmin'
import ListEventsAdmin from '@/components/event/admin/ListEventsAdmin'
import withAuth from '@/components/withAuth'
import { useSession } from 'next-auth/react'

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
      <ListEventsAdmin type='admin' />
    </>
  )
}

// Define required auth and roles
Home.requireAuth = true
Home.requiredRoles = ['admin']

export default Home
export const getLayout = (page: React.ReactNode) => <LayoutAdmin>{page}</LayoutAdmin>
Home.getLayout = getLayout

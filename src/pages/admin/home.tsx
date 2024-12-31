import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import SEOHead from 'components/seo'
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import ListEventsAdmin from '@/components/event/ListEventsAdmin'
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
      <SEOHead />
      <LayoutAdmin>
        <ListEventsAdmin />
      </LayoutAdmin>
    </>
  )
}

Home.requireAuth = true
export default Home
export const getLayout = (page: React.ReactNode) => <div>{page}</div>
Home.getLayout = getLayout
// export default Home

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEOHead from 'components/seo';
import LayoutAdmin from '@/components/layout/LayoutAdmin'
import ListEventsAdmin from '@/components/event/ListEventsAdmin'

type Props = {
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

const Home = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

  return (
    <>
      <SEOHead title="5PIX" />
      <LayoutAdmin>
        <ListEventsAdmin />
      </LayoutAdmin>
    </>
  );
};

Home.requireAuth = false;
export default Home;

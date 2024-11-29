import { useEffect } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout from 'components/layout/Layout';
import SEOHead from 'components/seo';
import Hero from 'components/template/Hero';

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
      <Layout>
        <Hero />
      </Layout>
    </>
  );
};

Home.requireAuth = false;
export default Home;

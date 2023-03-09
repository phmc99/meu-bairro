import Head from 'next/head';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';

const BestRated = () => {
  return (
    <>
      <Head>
        <title>App Meu Bairro - Melhores avaliados</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title="Melhores avaliados" />
      <AppNavBar />
    </>
  );
};

export default BestRated;

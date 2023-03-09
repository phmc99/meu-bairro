import Head from 'next/head';
import AppNavBar from '../../../../components/app/AppNavBar';
import NavigationHeader from '../../../../components/app/NavigationHeader';

const Closer = () => {
  return (
    <>
      <Head>
        <title>App Meu Bairro - Mais próximos</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title="Mais próximos" />
      <AppNavBar />
    </>
  );
};

export default Closer;

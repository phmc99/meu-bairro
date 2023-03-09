import Head from 'next/head';
import AppNavBar from '../../../components/app/AppNavBar';
import NavigationHeader from '../../../components/app/NavigationHeader';

const AppSearch = () => {
  return (
    <>
      <Head>
        <title>App Meu Bairro - Pesquisar</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title="Pesquisar comércios" />
      <AppNavBar />
    </>
  );
};

export default AppSearch;

import Head from 'next/head';
import AppCategoryList from '../../../components/app/AppCategoryList';
import AppNavBar from '../../../components/app/AppNavBar';
import AppSearchInput from '../../../components/app/AppSearchInput';
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
      <AppSearchInput />
      <AppCategoryList />
      <AppNavBar />
    </>
  );
};

export default AppSearch;

import { VStack } from '@chakra-ui/react';
import AppActionButton from '../../components/app/AppActionButton';
import AppHeader from '../../components/app/AppHeader';
import AppNavBar from '../../components/app/AppNavBar';
import AppSwiper from '../../components/app/AppSwiper';
import Router from 'next/router';
import Head from 'next/head';

const MeuBairro = () => {
  const handleActionButton = (page: string) => {
    Router.push(`/app/search/result/${page}`);
    return;
  };

  return (
    <>
      <Head>
        <title>Meu Bairro - Início</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <AppHeader />
      <AppSwiper />
      <VStack mt={5} textAlign="center">
        <AppActionButton action={() => handleActionButton('closer')}>
          Mais próximos
        </AppActionButton>
        <AppActionButton action={() => handleActionButton('new')}>
          Chegaram agora
        </AppActionButton>
        <AppActionButton action={() => handleActionButton('bestrated')}>
          Melhores avaliados
        </AppActionButton>
      </VStack>
      <AppNavBar />
    </>
  );
};

export default MeuBairro;

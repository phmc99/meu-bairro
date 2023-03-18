import { useToast, VStack } from '@chakra-ui/react';
import AppActionButton from '../../components/app/AppActionButton';
import AppHeader from '../../components/app/AppHeader';
import AppNavBar from '../../components/app/AppNavBar';
import AppSwiper from '../../components/app/AppSwiper';
import Router from 'next/router';
import Head from 'next/head';
import BeforeInstallPrompt from '../../components/app/PwaPopUp/beforeinstall';
import { useEffect } from 'react';

const MeuBairro = () => {
  const toast = useToast();

  const handleActionButton = (page: string) => {
    Router.push(`/app/search/result/${page}`);
    return;
  };

  useEffect(() => {
    const cords = localStorage.getItem('user-cords');

    if (!cords) {
      navigator.geolocation.getCurrentPosition(
        posicao => {
          const userCords = {
            lat: posicao.coords.latitude,
            lng: posicao.coords.longitude
          };
          localStorage.setItem('user-cords', JSON.stringify(userCords));
        },
        () => {
          return toast({
            title: 'Não conseguimos obter sua localização',
            status: 'error',
            duration: 2000,
            isClosable: true,
            position: 'bottom'
          });
        }
      );
    }
  }, [toast]);

  return (
    <>
      <Head>
        <title>Meu Bairro - Início</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <BeforeInstallPrompt />
      <AppHeader />
      <AppSwiper type="home" />
      <VStack mt={5} textAlign="center">
        <AppActionButton disabled action={() => handleActionButton('closer')}>
          Mais próximos
        </AppActionButton>
        <AppActionButton action={() => handleActionButton('new')}>
          Chegaram agora
        </AppActionButton>
        <AppActionButton
          disabled
          action={() => handleActionButton('bestrated')}
        >
          Melhores avaliados
        </AppActionButton>
      </VStack>
      <AppNavBar />
    </>
  );
};

export default MeuBairro;

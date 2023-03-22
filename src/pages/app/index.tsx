import { VStack } from '@chakra-ui/react';
import AppActionButton from '../../components/app/AppActionButton';
import AppHeader from '../../components/app/AppHeader';
import AppNavBar from '../../components/app/AppNavBar';
import AppSwiper from '../../components/app/AppSwiper';
import Router from 'next/router';
import Head from 'next/head';
import BeforeInstallPrompt from '../../components/app/PwaPopUp/beforeinstall';
import { useEffect } from 'react';
import { getLocation } from '../../store/app/location';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';

const MeuBairro = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleActionButton = async (page: string) => {
    const cords = JSON.parse(localStorage.getItem('user-cords') || '{}');

    if (!cords.lat && !cords.lng) {
      Router.push(`/app/search/result/${page}`);
      return;
    }

    Router.push(`/app/search/result/${page}?lat=${cords.lat}&lng=${cords.lng}`);
    return;
  };

  useEffect(() => {
    let cords = JSON.parse(localStorage.getItem('user-cords') || '{}');
    const address = localStorage.getItem('address');

    if (!cords.lat && !cords.lng) {
      navigator.geolocation.getCurrentPosition(postion => {
        cords = {
          lat: postion.coords.latitude,
          lng: postion.coords.longitude
        };
        localStorage.setItem('user-cords', JSON.stringify(cords));
        if (address == null) {
          dispatch(getLocation(cords));
        }
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

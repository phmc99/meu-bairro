import { VStack } from '@chakra-ui/react';
import AppActionButton from '../../components/app/AppActionButton';
import AppHeader from '../../components/app/AppHeader';
import AppNavBar from '../../components/app/AppNavBar';
import AppSwiper from '../../components/app/AppSwiper';
import Router from 'next/router';
import Head from 'next/head';
import BeforeInstallPrompt from '../../components/app/PwaPopUp/beforeinstall';
import { useEffect } from 'react';
import { getLocalStorageLocation, getLocation } from '../../store/app/location';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store';
import { useQuery } from 'react-query';
import { getBanners } from '../../services/banner';
import { getUserData } from '../../store/app/user';
import AppLoading from '../../components/app/AppLoading';

const MeuBairro = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useSelector((state: AppState) => state.location);

  const { data, isLoading }: any = useQuery(['banners'], async () => {
    const response = await getBanners();
    return response.banners.map((item: any) => item.imgUrl);
  });

  const handleActionButton = async (page: string) => {
    const cords = JSON.parse(localStorage.getItem('@mb:user-cords') || '{}');

    if (!cords.lat && !cords.lng) {
      Router.push(`/app/search/result/${page}`);
      return;
    }

    Router.push(`/app/search/result/${page}?lat=${cords.lat}&lng=${cords.lng}`);
    return;
  };

  useEffect(() => {
    let cords = JSON.parse(localStorage.getItem('@mb:user-cords') || '{}');
    const user = localStorage.getItem('user-token') || '';

    dispatch(getLocalStorageLocation());

    if (!cords.lat && !cords.lng) {
      navigator.geolocation.getCurrentPosition(postion => {
        cords = {
          lat: postion.coords.latitude,
          lng: postion.coords.longitude
        };
        localStorage.setItem('@mb:user-cords', JSON.stringify(cords));
        if (address == null) {
          dispatch(getLocation(cords));
        }
      });
    }

    if (user.trim() !== '') {
      dispatch(getUserData(user));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

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
      <AppSwiper type="home" images={data} />
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

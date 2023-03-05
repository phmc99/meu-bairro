import { VStack } from '@chakra-ui/react';
import AppActionButton from '../../components/app/AppActionButton';
import AppHeader from '../../components/app/AppHeader';
import AppNavBar from '../../components/app/AppNavBar';
import AppSwiper from '../../components/app/AppSwiper';

const MeuBairro = () => {
  return (
    <>
      <AppHeader />
      <AppSwiper />
      <VStack mt={5} textAlign="center">
        <AppActionButton>Mais próximos</AppActionButton>
        <AppActionButton>Chegaram agora</AppActionButton>
        <AppActionButton>Melhores avaliados</AppActionButton>
      </VStack>
      <AppNavBar />
    </>
  );
};

export default MeuBairro;

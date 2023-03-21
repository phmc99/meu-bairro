import { Button, Divider, Flex } from '@chakra-ui/react';
import AppNavBar from '../../../components/app/AppNavBar';
import NavigationHeader from '../../../components/app/NavigationHeader';
import AppCommerceAddress from '../../../components/app/AppCommerceAddress';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';

const User = () => {
  const { address } = useSelector((state: AppState) => state.location);

  return (
    <>
      <NavigationHeader title="Suas informações" />
      <Flex
        w="100%"
        h="50vh"
        direction="column"
        alignItems="center"
        py={5}
        gap={2}
      >
        <AppCommerceAddress address={address} />
        <Button colorScheme="blue" variant="link" w="80%">
          Atualizar localização
        </Button>
        <Divider my={5} />
        <Button colorScheme="blue" w="80%">
          Registre-se
        </Button>
        <Button colorScheme="blue" variant="outline" w="80%">
          Fazer Login
        </Button>
      </Flex>
      <AppNavBar />
    </>
  );
};

export default User;

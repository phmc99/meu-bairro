import { Button, Divider, Flex, useDisclosure } from '@chakra-ui/react';
import AppNavBar from '../../../components/app/AppNavBar';
import NavigationHeader from '../../../components/app/NavigationHeader';
import AppCommerceAddress from '../../../components/app/AppCommerceAddress';
import { useSelector } from 'react-redux';
import { AppState } from '../../../store';
import AppChangeAddressForm from '../../../components/app/AppChangeAdressForm';

const User = () => {
  const { address } = useSelector((state: AppState) => state.location);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isOpen ? (
        <AppChangeAddressForm
          isOpen={isOpen}
          onClose={onClose}
          onOpen={onOpen}
          defaultIsOpen={false}
          id={'AppChangeAddressForm'}
        />
      ) : null}
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
        <Button onClick={onOpen} colorScheme="blue" variant="link" w="80%">
          Atualizar localização
        </Button>
        <Divider my={5} />
        <Button disabled colorScheme="blue" w="80%">
          Registre-se
        </Button>
        <Button disabled colorScheme="blue" variant="outline" w="80%">
          Fazer Login
        </Button>
      </Flex>
      <AppNavBar />
    </>
  );
};

export default User;

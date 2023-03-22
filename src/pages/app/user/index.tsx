import { Button, Divider, Flex, useDisclosure } from '@chakra-ui/react';
import AppNavBar from '../../../components/app/AppNavBar';
import NavigationHeader from '../../../components/app/NavigationHeader';
import AppCommerceAddress from '../../../components/app/AppCommerceAddress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import AppChangeAddressForm from '../../../components/app/AppChangeAdressForm';
import { getLocalStorageLocation } from '../../../store/app/location';
import { useEffect } from 'react';

const User = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useSelector((state: AppState) => state.location);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getLocalStorageLocation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          Atualizar endereço
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

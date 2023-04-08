import {
  Button,
  Divider,
  Flex,
  Spinner,
  useDisclosure
} from '@chakra-ui/react';
import AppNavBar from '../../../components/app/AppNavBar';
import NavigationHeader from '../../../components/app/NavigationHeader';
import AppCommerceAddress from '../../../components/app/AppCommerceAddress';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import AppChangeAddressForm from '../../../components/app/AppChangeAdressForm';
import { getLocalStorageLocation } from '../../../store/app/location';
import { useEffect } from 'react';
import { getUserData } from '../../../store/app/user';
import AppUserAuthButtons from '../../../components/app/AppUserAuthButtons';

const User = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useSelector((state: AppState) => state.location);
  const { loading, user } = useSelector((state: AppState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem('user-token') || '';

    if (token.trim() !== '') {
      dispatch(getUserData(token));
    }

    dispatch(getLocalStorageLocation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <Flex w="100%" h="50vh" justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

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
        {!loading ? <h1>{user?.firstName}</h1> : <AppUserAuthButtons />}
      </Flex>
      <AppNavBar />
    </>
  );
};

export default User;

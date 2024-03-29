import { Button, Divider, Flex, useDisclosure } from '@chakra-ui/react';
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
import AppUserData from '../../../components/app/AppUserData';
import AppLoading from '../../../components/app/AppLoading';

const User = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { address } = useSelector((state: AppState) => state.location);
  const { loading, user } = useSelector((state: AppState) => state.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem('@mb:user-token') || '';

    if (token.trim() !== '') {
      dispatch(getUserData(token));
    }

    dispatch(getLocalStorageLocation());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <AppLoading />;
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
        {user ? <AppUserData user={user} /> : <AppUserAuthButtons />}
        <Divider my={5} />
        <Flex direction="column">
          <Button
            w={180}
            variant="link"
            color="gray.500"
            onClick={() => {
              window.location.href = '/misc/terms';
            }}
          >
            Termos e condições
          </Button>
        </Flex>
      </Flex>
      <AppNavBar />
    </>
  );
};

export default User;

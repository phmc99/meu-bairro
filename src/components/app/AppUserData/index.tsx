import { Button, Flex, Heading, useToast } from '@chakra-ui/react';
import { IUser } from '../../../types';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';
import { resetUserAuth } from '../../../store/app/auth';
import { resetUserData } from '../../../store/app/user';
import { useRouter } from 'next/router';

interface AppUserDataProps {
  user: IUser;
}

const AppUserData = ({ user }: AppUserDataProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const router = useRouter();
  const [disconnect, setDisconnect] = useState<boolean>(false);

  const handleLogout = () => {
    toast({
      title: `Até a próxima ${user.firstName}`,
      isClosable: true,
      duration: 3000,
      position: 'bottom'
    });
    dispatch(resetUserAuth());
    dispatch(resetUserData());
    router.push('/app');
  };

  const handleDisconnect = () => setDisconnect(!disconnect);

  const currentHour = new Date().getHours();
  const [greeting, setGreeting] = useState<string>('Boa noite!');

  useEffect(() => {
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Bom dia');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, [currentHour]);

  return (
    <Flex direction="column">
      <Heading color="gray.700" fontWeight={700} fontSize="3xl" mb={5}>
        {greeting}, {user.firstName}
      </Heading>
      {disconnect ? (
        <Flex justifyContent="center" gap={5}>
          <Button variant="link" colorScheme="red" onClick={handleLogout}>
            Confirmar
          </Button>
          <Button variant="link" onClick={handleDisconnect}>
            Cancelar
          </Button>
        </Flex>
      ) : (
        <Button variant="ghost" colorScheme="red" onClick={handleDisconnect}>
          Desconectar
        </Button>
      )}
    </Flex>
  );
};

export default AppUserData;

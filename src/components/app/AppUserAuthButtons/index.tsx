import { Button } from '@chakra-ui/react';

const AppUserAuthButtons = () => {
  return (
    <>
      <Button
        onClick={() => {
          window.location.href = '/app/auth/signup';
        }}
        colorScheme="blue"
        w="80%"
      >
        Registre-se
      </Button>
      <Button
        onClick={() => {
          window.location.href = '/app/auth/signin';
        }}
        colorScheme="blue"
        variant="outline"
        w="80%"
      >
        Fazer Login
      </Button>
    </>
  );
};

export default AppUserAuthButtons;

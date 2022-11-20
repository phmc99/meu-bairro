import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { login } from '../../store/admin';

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleLogin = async () => {
    await dispatch(login());
    Router.push('/admin/dashboard');
  };

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={5}>Log In - Meu Bairro</Heading>
        <Input placeholder="E-mail" variant="filled" type="email" mb={3} />
        <Input placeholder="Senha" variant="filled" type="password" mb={6} />
        <Button colorScheme="blue" onClick={handleLogin}>
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
};

export default AdminLogin;

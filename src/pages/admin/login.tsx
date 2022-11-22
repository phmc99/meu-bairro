import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { login } from '../../store/admin';

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogin = async (email: string, password: string) => {
    await dispatch(login({ email, password }));
    Router.push('/admin/dashboard');
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      handleLogin(values.email, values.password);
    }
  });

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.100" p={12} rounded={6}>
        <Heading mb={5}>Log In - Meu Bairro</Heading>
        <form onSubmit={formik.handleSubmit}>
          <Input
            placeholder="E-mail"
            variant="filled"
            type="email"
            name="email"
            mb={3}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Input
            placeholder="Senha"
            variant="filled"
            type="password"
            name="password"
            mb={6}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button type="submit" colorScheme="blue">
            Entrar
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default AdminLogin;

import { Button, Flex, Heading, Input, useToast } from '@chakra-ui/react';
import { useFormik } from 'formik';
import Head from 'next/head';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../store';
import { login } from '../../store/admin';

const AdminLogin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const { loading } = useSelector((state: AppState) => state.admin);

  const handleLogin = async (email: string, password: string) => {
    await dispatch(login({ email, password }));
    toast({
      title: 'Bem-vindo!',
      duration: 4000,
      isClosable: true,
      position: 'bottom-left'
    });
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
    <>
      <Head>
        <title>Meu Bairro - Admin Log In</title>
        <meta name="description" content="Meu Bairro - Admin Log In" />
      </Head>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          textAlign="center"
          direction="column"
          background="gray.100"
          p={12}
          rounded={6}
        >
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
              disabled={loading}
            />
            <Input
              placeholder="Senha"
              variant="filled"
              type="password"
              name="password"
              mb={6}
              onChange={formik.handleChange}
              value={formik.values.password}
              disabled={loading}
            />
            <Button
              isLoading={loading}
              type="submit"
              colorScheme="blue"
              disabled={loading}
            >
              Entrar
            </Button>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminLogin;

import Router from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  useToast
} from '@chakra-ui/react';
import CommerceList from '../../components/admin/CommerceList';
import { SearchIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import CommerceCreateForm from '../../components/admin/CommerceCreateForm';
import api from '../../services/api';

const Dashboard = () => {
  const toast = useToast();
  const verifyToken = async (token: string) => {
    const { data } = await api.post('/user/token', {
      token
    });
    return data.isValid;
  };

  useEffect(() => {
    const token = localStorage.getItem('admin-token') || '';
    const isValidToken: any = verifyToken(token);
    isValidToken
      ? toast({
          title: 'Bem-vindo!',
          duration: 4000,
          isClosable: true,
          position: 'bottom-left'
        })
      : Router.push('/admin/login');
  }, [toast]);

  const [newCommerceToggle, setNewCommerceToggle] = useState<boolean>(false);

  const handleOpenNewCommerceForm = () => {
    setNewCommerceToggle(!newCommerceToggle);
  };

  return (
    <>
      <Head>
        <title>Meu Bairro - Admin Dashboard</title>
        <meta name="description" content="Meu Bairro - Dashboard" />
      </Head>
      {newCommerceToggle ? (
        <CommerceCreateForm setToggle={handleOpenNewCommerceForm} />
      ) : null}
      <Flex height="100vh" justifyContent="center">
        <Flex direction="column" width={'100%'} maxW={600} p={2}>
          <Flex gap={[2, 0]} justifyContent="space-between">
            <Button
              onClick={handleOpenNewCommerceForm}
              colorScheme="blue"
              width={120}
              p={5}
            >
              Adicionar
            </Button>
            <Flex gap={[0, 2]}>
              <Input placeholder="Buscar comércio" />
              <IconButton
                colorScheme="blue"
                aria-label="Search database"
                icon={<SearchIcon />}
              />
            </Flex>
          </Flex>
          <Heading>Comercios</Heading>
          <CommerceList />
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;

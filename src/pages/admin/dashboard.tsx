import Router from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  Stack,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import CommerceList from '../../components/admin/CommerceList';
import { SearchIcon } from '@chakra-ui/icons';
import Head from 'next/head';
import CommerceCreateForm from '../../components/admin/CommerceCreateForm';
import api from '../../services/api';
import BannersModal from '../../components/admin/BannersModal';

const Dashboard = () => {
  const toast = useToast();
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('admin-token') || '';
    api
      .post('/user/token', {
        token
      })
      .then(({ data }) => {
        if (data.isValid) {
          setToken(token);
          return toast({
            title: 'Bem-vindo!',
            duration: 4000,
            isClosable: true,
            position: 'bottom-left'
          });
        } else {
          localStorage.removeItem('admin-token');
          Router.push('/admin/login');
          return;
        }
      });
  }, [toast]);

  const [newCommerceToggle, setNewCommerceToggle] = useState<boolean>(false);

  const handleOpenNewCommerceForm = () => {
    setNewCommerceToggle(!newCommerceToggle);
  };

  const {
    isOpen: bannerModalIsOpen,
    onClose: bannerModalOnClose,
    onOpen: bannerModalOnOpen
  } = useDisclosure();

  return (
    <>
      <Head>
        <title>Meu Bairro - Admin Dashboard</title>
        <meta name="description" content="Meu Bairro - Dashboard" />
      </Head>
      {newCommerceToggle ? (
        <CommerceCreateForm setToggle={handleOpenNewCommerceForm} />
      ) : null}
      <Modal isOpen={bannerModalIsOpen} onClose={bannerModalOnClose}>
        <BannersModal token={token} />
      </Modal>
      <Flex height="100vh" justifyContent="center">
        <Flex direction="column" width={'100%'} maxW={600} p={2}>
          <Stack direction={['column', 'row']} justifyContent="space-between">
            <Button
              onClick={handleOpenNewCommerceForm}
              colorScheme="blue"
              p={5}
            >
              Adicionar comércio
            </Button>
            <Flex gap={2}>
              <Input placeholder="Buscar comércio" />
              <IconButton
                colorScheme="blue"
                aria-label="Search database"
                icon={<SearchIcon />}
              />
            </Flex>
          </Stack>
          <Heading>Comercios</Heading>
          <CommerceList />
          <Stack direction={['column', 'row']} my={5}>
            <Button boxShadow={'base'} onClick={bannerModalOnOpen}>
              Banners
            </Button>
            <Button disabled boxShadow={'base'}>
              Notificações
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};

export default Dashboard;

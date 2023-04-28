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
import Head from 'next/head';
import CommerceCreateForm from '../../components/admin/CommerceCreateForm';
import api from '../../services/api';
import BannersModal from '../../components/admin/BannersModal';
import { ICommerceResponse } from '../../types';
import SearchResultList from '../../components/admin/SearchResultList';
import { MdSearch, MdSearchOff } from 'react-icons/md';

const Dashboard = () => {
  const toast = useToast();
  const [token, setToken] = useState<string>('');

  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ICommerceResponse>({} as ICommerceResponse);

  const handleSearch = async (page: any) => {
    setLoading(true);

    if (!page) {
      page = 1;
    }

    const endpoint = `/commerce/search?value=${value.trim()}&page=${page}&perPage=5`;
    const { data } = await api.get(endpoint);

    setData(data);

    setLoading(false);

    return data;
  };

  const handleClearSearch = () => {
    setValue('');
    setData({} as ICommerceResponse);
  };

  useEffect(() => {
    const token = localStorage.getItem('@mb:admin-token') || '';
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
          localStorage.removeItem('@mb:admin-token');
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
              {data.data && data.data.length > 0 ? (
                <IconButton
                  aria-label="Clear search"
                  icon={<MdSearchOff size={22} />}
                  variant="link"
                  ml={2}
                  onClick={handleClearSearch}
                />
              ) : null}

              <Input
                placeholder="Buscar comércio"
                value={value}
                onChange={e => setValue(e.target.value)}
              />
              <IconButton
                colorScheme="blue"
                aria-label="Search database"
                icon={<MdSearch size={22} />}
                onClick={handleSearch}
              />
            </Flex>
          </Stack>
          <Heading>Comercios</Heading>
          {data.data && data.data.length > 0 ? (
            <SearchResultList
              data={data}
              handleSearch={handleSearch}
              loading={loading}
            />
          ) : (
            <CommerceList />
          )}
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

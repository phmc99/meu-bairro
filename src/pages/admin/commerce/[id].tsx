import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Stack, Tag } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CommerceImagesSlider from '../../../components/CommerceImagesSlider';
import api from '../../../services/api';
import { ICommerce } from '../../../types';

const CommercePage = () => {
  const router = useRouter();
  const [commerce, setCommerce] = useState({} as ICommerce);

  const handleBackToDashboard = () => {
    Router.push('/admin/dashboard');
  };

  const getCommerce = async () => {
    const token = localStorage.getItem('admin-token');

    if (!token) {
      return Router.push('/admin/login');
    }

    await api
      .get(`/commerce/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setCommerce(res.data.commerce);
        return res.data;
      })
      .catch(res => {
        if (res.response.status === 401) {
          localStorage.removeItem('admin-token');
          Router.push('/admin/login');
          return;
        }
        return res.response.data;
      });
  };

  useEffect(() => {
    getCommerce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexDirection="column" alignItems="center">
      <Button
        mt={2}
        leftIcon={<ArrowBackIcon />}
        colorScheme="blue"
        variant="ghost"
        onClick={handleBackToDashboard}
      >
        Voltar
      </Button>
      <Flex flexDirection="column" alignItems="center" gap={2} p={5}>
        <Heading textAlign="center" size={['md', 'xl']}>
          {commerce.name}
        </Heading>
        <Stack direction={['column', 'row']}>
          <Tag size={['sm', 'md']}>{commerce.category}</Tag>
          <Tag size={['sm', 'md']}>ID: {commerce._id}</Tag>
          <Tag size={['sm', 'md']}>Criado em: {commerce.createdAt}</Tag>
          <Tag
            size={['sm', 'md']}
            colorScheme={commerce.active ? 'green' : 'red'}
          >
            {commerce.active ? 'Ativo' : 'Inativo'}
          </Tag>
        </Stack>
      </Flex>
      <Box width={'80%'} margin="0 auto">
        <CommerceImagesSlider />
      </Box>
    </Flex>
  );
};

export default CommercePage;

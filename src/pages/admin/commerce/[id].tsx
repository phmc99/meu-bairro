import { ArrowBackIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Spinner,
  Stack,
  Tag,
  Text
} from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import CommerceImagesSlider from '../../../components/CommerceImagesSlider';
import { getCommerce } from '../../../services/commerce';
import { ICommerceQuery } from '../../../types';

const CommercePage = () => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    Router.push('/admin/dashboard');
  };

  const { data, isLoading, error }: ICommerceQuery = useQuery(
    ['commerce'],
    () => {
      const localStorageId =
        localStorage.getItem('@mb:current-commerce-id') || '';
      const queryId = router.query.id;

      if (queryId) {
        return getCommerce(queryId as string);
      } else if (localStorageId !== '') {
        return getCommerce(localStorageId as string);
      } else {
        return handleBackToDashboard();
      }
    }
  );

  if (isLoading) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Heading>Algo de errado aconteceu.</Heading>
      </Flex>
    );
  }

  if (!data) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Heading>Problemas com os dados.</Heading>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" alignItems="center" gap={2}>
      <Flex
        w={['100%']}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={2}
        p={5}
      >
        <Button
          mt={[2, 0]}
          leftIcon={<ArrowBackIcon />}
          colorScheme="blue"
          variant="ghost"
          onClick={handleBackToDashboard}
        >
          Voltar
        </Button>
        <Flex flexDirection="column" alignItems="center" gap={2}>
          <Heading textAlign="center" size={['md', 'xl']}>
            {data?.commerce.name}
          </Heading>
          <Stack direction={['column', 'row']}>
            <Tag size={['sm', 'md']}>{data?.commerce.category}</Tag>
            <Tag size={['sm', 'md']}>ID: {data?.commerce._id}</Tag>
            <Tag size={['sm', 'md']}>Criado em: {data?.commerce.createdAt}</Tag>
            <Tag
              size={['sm', 'md']}
              colorScheme={data?.commerce.active ? 'green' : 'red'}
            >
              {data?.commerce.active ? 'Ativo' : 'Inativo'}
            </Tag>
          </Stack>
        </Flex>
      </Flex>
      <Box textAlign="center" width="80%" margin="0 auto">
        <CommerceImagesSlider
          logo={data?.commerce.logo}
          images={data?.commerce.images}
        />
        <Button colorScheme="blue" variant="link" mt={5}>
          Editar imagens
        </Button>
      </Box>
      <Divider />
      <Flex w="100%" p={5}>
        <Flex w="100%" direction="column">
          <Heading>Endereço</Heading>
          {data?.commerce.address ? (
            <Text mt={2}>
              {data?.commerce.address.street}, Nº
              {data?.commerce.address.number},{' '}
              {data?.commerce.address.neighborhood},{' '}
              {data?.commerce.address.city}, {data?.commerce.address.state}
            </Text>
          ) : (
            <Heading color="gray.500" size="md">
              Comércio sem endereço
            </Heading>
          )}
        </Flex>
        <Flex w="100%" direction="column">
          <Heading>Contato</Heading>
          <List mt={2}>
            <ListItem>WhatsApp: {data?.commerce.contact.whatsapp}</ListItem>
            <ListItem>Instagram: {data?.commerce.contact.instagram}</ListItem>
            <ListItem>Facebook: {data?.commerce.contact.facebook}</ListItem>
            <ListItem>Telefone: {data?.commerce.contact.phone}</ListItem>
            <ListItem>E-mail: {data?.commerce.contact.email}</ListItem>
          </List>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CommercePage;

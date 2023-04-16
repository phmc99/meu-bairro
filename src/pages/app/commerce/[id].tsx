import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Modal,
  Spinner,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import Head from 'next/head';
import { FaStar } from 'react-icons/fa';
import AppCommerceAddress from '../../../components/app/AppCommerceAddress';
import AppCommerceContact from '../../../components/app/AppCommerceContacts';
import AppNavBar from '../../../components/app/AppNavBar';
import AppSwiper from '../../../components/app/AppSwiper';
import NavigationHeader from '../../../components/app/NavigationHeader';
import { getCommerce } from '../../../services/commerce';
import { useEffect, useState } from 'react';
import { ICommerceQuery } from '../../../types';
import AppFeedbackCreate from '../../../components/app/AppFeedbackCreate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { getUserData } from '../../../store/app/user';
import AppFeedbackList from '../../../components/app/AppFeedbackList';
import { useQuery } from 'react-query';

interface AppCommerceProps {
  id: string;
}

const AppCommerce = ({ id }: AppCommerceProps) => {
  const [disableFeedback, setDisableFeedback] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: AppState) => state.user);

  const { data, error }: ICommerceQuery = useQuery(
    ['commerce'],
    () => {
      return getCommerce(id);
    },
    {
      staleTime: 0
    }
  );

  useEffect(() => {
    const token = localStorage.getItem('user-token') || '';

    if (token.trim() === '') {
      setDisableFeedback(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      if (data.commerce.address) {
        setAddress(
          `${data.commerce.address.street}, ${data.commerce.address.number}, ${data.commerce.neighborhood}, ${data.commerce.address.city}, ${data.commerce.address.state}`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const token = localStorage.getItem('user-token') || '';

    if (!user && token.trim() !== '') {
      dispatch(getUserData(token));
    }

    if (token.trim() === '') {
      setDisableFeedback(true);
    }

    if (!data) {
      return;
    }

    const commerceHasUserFeedback = data.commerce.feedbacks.find(
      item => item.user._id === user?._id
    );

    if (commerceHasUserFeedback) {
      setDisableFeedback(true);
    } else {
      setDisableFeedback(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  const {
    isOpen: feedbackCreateIsOpen,
    onClose: feedbackCreateOnClose,
    onOpen: feedbackCreateOnOpen
  } = useDisclosure();

  const {
    isOpen: feedbackListIsOpen,
    onClose: feedbackListOnClose,
    onOpen: feedbackListOnOpen
  } = useDisclosure();

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
    <>
      <Head>
        <title>Meu Bairro - {data.commerce.name}</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <Modal isOpen={feedbackCreateIsOpen} onClose={feedbackCreateOnClose}>
        <AppFeedbackCreate
          commerce={data.commerce}
          onClose={feedbackCreateOnClose}
        />
      </Modal>
      <Modal isOpen={feedbackListIsOpen} onClose={feedbackListOnClose}>
        <AppFeedbackList
          onClose={feedbackListOnClose}
          feedbacks={data.commerce.feedbacks}
        />
      </Modal>
      <NavigationHeader title={data.commerce.name} />
      <AppSwiper
        type="commerce"
        images={data.commerce.images}
        logo={data.commerce.logo}
      />
      <Flex
        h="calc(50vh + 60px)"
        w="100%"
        direction="column"
        alignItems="center"
      >
        <Flex
          w="100%"
          px={5}
          my={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            size="md"
            fontWeight={500}
            color="blue.600"
            width={[200, 400]}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {data.commerce.name}
          </Heading>
          <Flex
            alignItems="center"
            gap={2}
            onClick={feedbackListOnOpen}
            cursor="pointer"
          >
            <Icon color="yellow.400" as={FaStar} />
            <Text color="yellow.400" fontWeight={700}>
              {data.commerce.totalRate.toFixed(1)}
            </Text>
            <Text>({data.commerce.feedbacks.length})</Text>
          </Flex>
        </Flex>
        <Box
          dangerouslySetInnerHTML={{ __html: data.commerce.description }}
          mb={2}
          w={['85%', '95%']}
          textAlign="left"
          color="gray.500"
          sx={{
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical'
          }}
        />
        <AppCommerceAddress
          address={
            data.commerce.address && address.trim() !== '' ? address : undefined
          }
        />
        <Heading my={2} size="md" fontWeight={500} color="blue.600">
          Contatos
        </Heading>
        <AppCommerceContact contact={data.commerce.contact} />
        <Button
          my={5}
          variant="link"
          fontSize="sm"
          colorScheme="blue"
          onClick={feedbackCreateOnOpen}
          disabled={disableFeedback}
        >
          Avalie {data.commerce.name}
        </Button>
      </Flex>
      <AppNavBar />
    </>
  );
};

export default AppCommerce;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  return { props: { id } };
}

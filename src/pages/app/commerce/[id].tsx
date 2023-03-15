import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { FaStar } from 'react-icons/fa';
import AppCommerceAddress from '../../../components/app/AppCommerceAddress';
import AppCommerceContact from '../../../components/app/AppCommerceContacts';
import AppNavBar from '../../../components/app/AppNavBar';
import AppSwiper from '../../../components/app/AppSwiper';
import NavigationHeader from '../../../components/app/NavigationHeader';
import { getCommerce } from '../../../services/commerce';
import { ICommerce } from '../../../types';

interface AppCommerceProps {
  id: string;
  commerce: ICommerce;
}

const AppCommerce = ({ commerce }: AppCommerceProps) => {
  let address;
  if (commerce.address) {
    address = `${commerce.address.street}, ${commerce.address.number}, ${commerce.neighborhood}, ${commerce.address.city}, ${commerce.address.state}`;
  }

  return (
    <>
      <Head>
        <title>Meu Bairro - {commerce.name}</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title={commerce.name} />
      <AppSwiper
        type="commerce"
        images={commerce.images}
        logo={commerce.logo}
      />
      <Flex h="35vh" w="100%" direction="column" alignItems="center">
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
            {commerce.name}
          </Heading>
          <Flex alignItems="center" gap={2}>
            <Icon color="yellow.400" as={FaStar} />
            <Text color="yellow.400" fontWeight={700}>
              {commerce.totalRate.toFixed(1)}
            </Text>
            <Text>({commerce.feedbacks.length})</Text>
          </Flex>
        </Flex>
        <AppCommerceAddress address={commerce.address && address} />
        <Heading my={2} size="md" fontWeight={500} color="blue.600">
          Contatos
        </Heading>
        <AppCommerceContact contact={commerce.contact} />
      </Flex>
      <AppNavBar />
    </>
  );
};

export default AppCommerce;

export async function getServerSideProps(context: any) {
  const { id } = context.query;
  const { commerce } = await getCommerce(id);
  return { props: { id, commerce } };
}

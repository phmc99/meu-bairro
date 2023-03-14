import { Flex, Heading, Icon, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { FaStar } from 'react-icons/fa';
import AppCommerceAddress from '../../../components/app/AppCommerceAddress';
import AppCommerceContact from '../../../components/app/AppCommerceContacts';
import AppNavBar from '../../../components/app/AppNavBar';
import AppSwiper from '../../../components/app/AppSwiper';
import NavigationHeader from '../../../components/app/NavigationHeader';

interface AppCommerceProps {
  id: string;
}

const AppCommerce = ({ id }: AppCommerceProps) => {
  const urls: string[] = [
    '../../swiper1.jpg',
    '../../swiper2.jpg',
    '../../swiper4.jpg'
  ];
  return (
    <>
      <Head>
        <title>Meu Bairro - Nome Comercio</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <NavigationHeader title={id} />
      <AppSwiper type="commerce" images={urls} logo={'../../swiper3.jpg'} />
      <Flex h="35vh" w="100%" direction="column" alignItems="center">
        <Flex
          w="100%"
          px={5}
          my={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading size="md" fontWeight={500} color="blue.600">
            Nome Comercio
          </Heading>
          <Flex alignItems="center" gap={2}>
            <Icon color="yellow.400" as={FaStar} />
            <Text color="yellow.400" fontWeight={700}>
              5.0
            </Text>
          </Flex>
        </Flex>
        <AppCommerceAddress />
        <Heading my={2} size="md" fontWeight={500} color="blue.600">
          Contatos
        </Heading>
        <AppCommerceContact />
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

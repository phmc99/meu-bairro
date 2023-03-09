import { Button, Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import AppSvg from '../components/app/AppSvg';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Meu Bairro - Página não encontrada</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <Flex
        w="100%"
        h="100vh"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={5}
        textAlign="center"
      >
        <AppSvg />
        <Heading size="2xl" color="blue.600">
          Página não encontrada
        </Heading>
        <Button
          colorScheme="blue"
          fontSize="xl"
          p={5}
          onClick={() => router.push('/app')}
        >
          Voltar
        </Button>
      </Flex>
    </>
  );
};

export default NotFound;

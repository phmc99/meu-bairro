import { Button, Flex, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import AppSvg from '../components/app/AppSvg';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <Flex
        w="100%"
        h="100vh"
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={5}
      >
        <AppSvg />
        <Heading size="2xl" color="blue.600">
          Página não encontrada
        </Heading>
        <Button
          variant="ghost"
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

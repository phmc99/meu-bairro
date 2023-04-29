import Head from 'next/head';
import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import GridListWith from '../components/home/FeatureSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Meu Bairro</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <Flex direction="column">
        <Stack direction={{ base: 'column', md: 'row' }}>
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Image src="./logo-meu-bairro.png" alt="logo" />
                <Text color={'blue.400'} as={'span'}>
                  O app dos comércios do seu bairro.
                </Text>
              </Heading>
              <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                Alavanque seu comércio de forma acessível e efetiva. Divulgando
                seu comércio para todo bairro em nosso aplicativo, você terá
                muito mais visibilidade e vendas.
              </Text>
              <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                <Button
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500'
                  }}
                >
                  Cadastrar seu comércio
                </Button>
                <Button rounded={'full'}>
                  <Link target="_blank" href="/app">
                    Conheça o app
                  </Link>
                </Button>
              </Stack>
            </Stack>
          </Flex>
          <Flex flex={1}>
            <Image
              alt={'Login Image'}
              objectFit={'cover'}
              src={
                'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
              }
            />
          </Flex>
        </Stack>
        <GridListWith />
      </Flex>
    </>
  );
}

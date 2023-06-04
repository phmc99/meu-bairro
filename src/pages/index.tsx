import Head from 'next/head';
import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text
} from '@chakra-ui/react';
import GridListWith from '../components/home/FeatureSection';
import Footer from '../components/home/Footer';
import InstallSection from '../components/home/InstallSection';

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
        <Stack
          h={{ base: 'auto', md: '100vh' }}
          direction={{ base: 'column', md: 'row' }}
        >
          <Flex p={8} flex={1} align={'center'} justify={'center'}>
            <Stack spacing={6} w={'full'} maxW={'lg'}>
              <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                <Image src="./logo-meu-bairro.png" alt="logo" />
                <Text color={'blue.600'} as={'span'}>
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
                  p={5}
                  rounded={'full'}
                  bg={'blue.600'}
                  color={'white'}
                  fontSize={'lg'}
                  _hover={{
                    bg: 'blue.500'
                  }}
                >
                  <Link
                    target="_blank"
                    href="/app"
                    _hover={{
                      textDecoration: 'none'
                    }}
                  >
                    Conheça o meu Bairro
                  </Link>
                </Button>
                <Button
                  bg={'gray.200'}
                  color={'gray.600'}
                  _hover={{
                    bg: 'gray.300'
                  }}
                  rounded={'full'}
                >
                  <Link
                    target="_blank"
                    href="https://wa.me/5521998651205?text=Quero cadastrar meu comércio no Meu Bairro."
                  >
                    Cadastre o seu comércio
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
                'https://images.unsplash.com/photo-1504281186-f427c16ed131?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
              }
            />
          </Flex>
        </Stack>
        <GridListWith />
        <InstallSection />
        <Footer />
      </Flex>
    </>
  );
}

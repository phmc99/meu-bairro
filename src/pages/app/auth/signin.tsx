import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const SignInPage = () => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack textAlign={'center'} align={'center'}>
          <Heading fontSize={'4xl'}>Entre na sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar muito mais o{' '}
            <Link color={'blue.500'} href="/app">
              Meu Bairro
            </Link>
            .
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>E-mail</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Senha</FormLabel>
              <Input type="password" />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Lembrar de mim</Checkbox>
                <Link color={'blue.500'}>Esqueceu a senha?</Link>
              </Stack>
              <Button
                bg={'blue.500'}
                color={'white'}
                _hover={{
                  bg: 'blue.400'
                }}
              >
                Entrar
              </Button>
            </Stack>
          </Stack>
          <Stack pt={6}>
            <Text align={'center'}>
              Não tem uma conta?{' '}
              <Link color={'blue.500'} href="/app/auth/signup">
                Cadastre-se
              </Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignInPage;

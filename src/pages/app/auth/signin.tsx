import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { signin } from '../../../store/app/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const SignInPage = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const initalValues = {
    email: '',
    password: ''
  };

  const handleLogin = async (email: string, password: string) => {
    const result = await dispatch(signin({ email, password }));
    if (result.payload.token) {
      router.push('/app/user');
      return;
    } else {
      return toast({
        title: result.payload.message,
        duration: 4000,
        status: 'error',
        isClosable: true
      });
    }
  };

  const handleRecovery = () => {
    router.push('/app/user/recovery');
  };

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
          <Formik
            initialValues={initalValues}
            onSubmit={async (values, actions) => {
              await handleLogin(values.email, values.password);
              actions.setSubmitting(false);
              actions.resetForm();
              actions.setValues(initalValues);
            }}
          >
            {(props: any) => (
              <Form>
                <Stack spacing={4}>
                  <Field name="email">
                    {({ field, form }: any) => (
                      <FormControl id="email">
                        <FormLabel>E-mail</FormLabel>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Digite seu email"
                          disabled={props.isSubmitting}
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }: any) => (
                      <FormControl id="password">
                        <FormLabel>Senha</FormLabel>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Digite sua senha"
                          disabled={props.isSubmitting}
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      justify={'center'}
                    >
                      <Button
                        cursor="pointer"
                        color={'blue.500'}
                        variant="link"
                        onClick={handleRecovery}
                      >
                        Esqueceu a senha?
                      </Button>
                    </Stack>
                    <Button
                      type="submit"
                      isLoading={props.isSubmitting}
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
              </Form>
            )}
          </Formik>
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

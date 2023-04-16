import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  useToast
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Field, Form, Formik } from 'formik';
import api from '../../../services/api';
import { IUser } from '../../../types';
import { useRouter } from 'next/router';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const toast = useToast();

  const initalValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  };

  const handleCreateUser = async (body: IUser) => {
    body.email = body.email.toLowerCase();
    await api
      .post('/user', body)
      .then(() => router.push('/app/auth/signin'))
      .catch(({ response }) => {
        if (response.data.message) {
          return toast({
            title: response.data.message,
            duration: 4000,
            status: 'error',
            isClosable: true
          });
        }
      });
    return;
  };
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'} textAlign={'center'}>
          <Heading fontSize={'4xl'}>Cadastre-se</Heading>
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
              await handleCreateUser(values);
              actions.setSubmitting(false);
              actions.resetForm();
              actions.setValues(initalValues);
            }}
          >
            {(props: any) => (
              <Form>
                <Stack spacing={4}>
                  <HStack>
                    <Box>
                      <Field name="firstName">
                        {({ field, form }: any) => (
                          <FormControl id="firstName" isRequired>
                            <FormLabel>Nome</FormLabel>
                            <Input
                              disabled={props.isSubmitting}
                              {...field}
                              type="text"
                              placeholder="Digite seu nome"
                            />
                            <FormErrorMessage>
                              {form.errors.firstName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                    <Box>
                      <Field name="lastName">
                        {({ field, form }: any) => (
                          <FormControl id="lastName" isRequired>
                            <FormLabel>Sobrenome</FormLabel>
                            <Input
                              disabled={props.isSubmitting}
                              {...field}
                              type="text"
                              placeholder="Digite seu sobrenome"
                            />
                            <FormErrorMessage>
                              {form.errors.lastName}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>
                    </Box>
                  </HStack>

                  <Field name="email">
                    {({ field, form }: any) => (
                      <FormControl id="email" isRequired>
                        <FormLabel>E-mail</FormLabel>
                        <Input
                          disabled={props.isSubmitting}
                          {...field}
                          name="email"
                          type="email"
                          placeholder="Digite seu e-mail"
                        />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="phone">
                    {({ field, form }: any) => (
                      <FormControl id="phone" isRequired>
                        <FormLabel>Telefone</FormLabel>
                        <Input
                          disabled={props.isSubmitting}
                          {...field}
                          name="phone"
                          placeholder="Digite seu telefone"
                        />
                        <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  <Field name="password">
                    {({ field, form }: any) => (
                      <FormControl id="password" isRequired>
                        <FormLabel>Senha</FormLabel>
                        <InputGroup>
                          <Input
                            disabled={props.isSubmitting}
                            {...field}
                            autoComplete="new-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Digite sua senha"
                          />
                          <FormErrorMessage>
                            {form.errors.password}
                          </FormErrorMessage>
                          <InputRightElement h={'full'}>
                            <Button
                              isLoading={props.isSubmitting}
                              variant={'ghost'}
                              onClick={() =>
                                setShowPassword(showPassword => !showPassword)
                              }
                            >
                              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                  <Stack spacing={10} pt={2}>
                    <Button
                      type="submit"
                      isLoading={props.isSubmitting}
                      size="lg"
                      bg={'blue.500'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.400'
                      }}
                    >
                      Cadastrar
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Já tem uma conta?{' '}
                      <Link color={'blue.500'} href="/app/auth/signin">
                        Entrar
                      </Link>
                    </Text>
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUpPage;

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import Head from 'next/head';
import api from '../../../services/api';
import { decodeToken } from '../../../utils/jwt';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Recovery = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toast = useToast();
  const router = useRouter();

  const initalValues = {
    token: '',
    newPassword: ''
  };

  const handleChangePassword = async (token: string, newPassword: string) => {
    const { decoded } = decodeToken(token);
    const { email } = decoded as { email: string };

    await api.post(
      '/user/password',
      { newPassword, email },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    router.push('/app/auth/signin');
    return toast({
      title: 'Senha alterada!',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  };

  return (
    <>
      <Head>
        <title>Meu Bairro - Nova senha</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack textAlign={'center'} align={'center'}>
            <Heading fontSize={'4xl'}>Troca de senha</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Utilize o código que enviamos para o seu e-mail para trocar a
              senha da sua conta&nbsp;
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
                await handleChangePassword(values.token, values.newPassword);
                actions.setSubmitting(false);
                actions.resetForm();
                actions.setValues(initalValues);
              }}
            >
              {(props: any) => (
                <Form>
                  <Stack>
                    <Field name="token">
                      {({ field, form }: any) => (
                        <FormControl id="token" isRequired>
                          <FormLabel>Código</FormLabel>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Digite o código"
                            disabled={props.isSubmitting}
                          />
                          <FormErrorMessage>
                            {form.errors.token}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="newPassword">
                      {({ field, form }: any) => (
                        <FormControl id="newPassword" isRequired>
                          <FormLabel>Nova senha</FormLabel>
                          <InputGroup>
                            <Input
                              disabled={props.isSubmitting}
                              {...field}
                              autoComplete="new-password"
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Digite sua nova senha"
                            />
                            <FormErrorMessage>
                              {form.errors.newPassword}
                            </FormErrorMessage>
                            <InputRightElement h={'full'}>
                              <Button
                                isLoading={props.isSubmitting}
                                variant={'ghost'}
                                onClick={() =>
                                  setShowPassword(
                                    (showPassword: any) => !showPassword
                                  )
                                }
                              >
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                    <Stack spacing={2}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        justify={'center'}
                      ></Stack>
                      <Button
                        type="submit"
                        isLoading={props.isSubmitting}
                        bg={'blue.500'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.400'
                        }}
                      >
                        Enviar
                      </Button>
                    </Stack>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Recovery;

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import AppNavBar from '../../../components/app/AppNavBar';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import api from '../../../services/api';
import Head from 'next/head';

const Recovery = () => {
  const toast = useToast();
  const router = useRouter();

  const initalValues = {
    email: ''
  };

  const handleSendRecovery = async (email: string) => {
    await api.post('/auth/recovery', { email });
    router.push('/app/user/newpassword');
    return toast({
      title: 'O código foi enviado!',
      description:
        'Verifique seu e-mail e utilize o código que enviamos para alterar sua senha.',
      duration: 4000,
      isClosable: true
    });
  };

  return (
    <>
      <Head>
        <title>Meu Bairro - Recuperar senha</title>
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
            <Heading fontSize={'4xl'}>Recuperar conta</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Envie um e-mail para recuperar a senha da sua conta&nbsp;
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
                await handleSendRecovery(values.email);
                actions.setSubmitting(false);
                actions.resetForm();
                actions.setValues(initalValues);
              }}
            >
              {(props: any) => (
                <Form>
                  <Stack>
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
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
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
      <AppNavBar />
    </>
  );
};

export default Recovery;

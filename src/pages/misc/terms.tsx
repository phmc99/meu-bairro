import {
  Button,
  Flex,
  Heading,
  Image,
  ListItem,
  Text,
  UnorderedList
} from '@chakra-ui/react';
import Head from 'next/head';

const TermsPage = () => {
  return (
    <>
      <Head>
        <title>Meu Bairro - Termos e condições</title>
        <meta
          name="description"
          content="Meu Bairro - App de comércios locais"
        />
      </Head>
      <Flex alignItems={'center'} direction={'column'} px={10}>
        <Image
          maxW="150px"
          w="100%"
          maxH="50px"
          h="100%"
          src="../logo-meu-bairro.png"
          alt="logo"
          pointerEvents="none"
        />
        <Heading as="h1" mb="4">
          Termos e condições do aplicativo Meu Bairro
        </Heading>
        <Text mb="4" fontSize="lg" fontWeight="bold">
          Ao fazer o download e usar o aplicativo Meu Bairro, você concorda com
          os seguintes termos e condições:
        </Text>
        <UnorderedList spacing={5}>
          <ListItem>
            <Text>
              O aplicativo Meu Bairro é fornecido somente para uso pessoal e não
              comercial. Você concorda em usá-lo apenas para fins legais e não
              violar nenhuma lei aplicável.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              O aplicativo Meu Bairro, incluindo todo o seu conteúdo, é
              protegido por leis de direitos autorais e propriedade intelectual.
              Todos os direitos são reservados. Você concorda em não reproduzir,
              distribuir, modificar, criar obras derivadas, exibir publicamente,
              executar publicamente, republicar ou transferir qualquer parte do
              aplicativo, a menos que expressamente autorizado pelo proprietário
              do aplicativo.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              O uso do aplicativo Meu Bairro é de sua responsabilidade
              exclusiva. O proprietário do aplicativo não será responsável por
              quaisquer danos diretos, indiretos, incidentais, especiais,
              punitivos ou consequentes decorrentes do uso ou incapacidade de
              uso do aplicativo.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              O aplicativo Meu Bairro coleta informações pessoais somente com o
              seu consentimento explícito. Essas informações podem ser usadas
              para melhorar a experiência do usuário, fornecer suporte técnico
              ou para outros fins. O proprietário do aplicativo se compromete a
              proteger a privacidade do usuário e a não compartilhar ou vender
              informações pessoais a terceiros sem o consentimento do usuário.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              O proprietário do aplicativo se reserva o direito de modificar
              estes termos e condições a qualquer momento e sem aviso prévio. O
              uso contínuo do aplicativo após qualquer modificação constitui
              aceitação dessas modificações.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              Estes termos e condições são regidos pelas leis do Brasil, sem
              levar em consideração seus conflitos de disposições legais.
              Qualquer litígio decorrente destes termos e condições será
              resolvido exclusivamente nos tribunais competentes do Brasil.
            </Text>
          </ListItem>
        </UnorderedList>
        <Text mt="4">
          Ao fazer o download e usar o aplicativo Meu Bairro, você reconhece ter
          lido e compreendido estes termos e condições e concorda em cumpri-los.
          Se você não concordar com estes termos e condições, não faça o
          download nem use o aplicativo.
        </Text>

        <Button
          my={5}
          w={180}
          variant="link"
          color="blue.600"
          onClick={() => {
            window.location.href = '/app';
          }}
        >
          Voltar
        </Button>
      </Flex>
    </>
  );
};

export default TermsPage;

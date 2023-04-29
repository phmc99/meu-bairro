import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import {
  FcAssistant,
  FcCollaboration,
  FcGlobe,
  FcRating,
  FcSearch
} from 'react-icons/fc';

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
}

const Card = ({ heading, description, icon }: CardProps) => {
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function GridListWith() {
  return (
    <Flex
      h={{ base: 'auto', md: '100vh' }}
      direction="column"
      justifyContent="center"
      p={4}
    >
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          Sobre o Meu Bairro
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          Nossa missão é ajudar os comércios locais, que não tem uma estrutura
          de divulgação nas redes sociais, por meio de uma plataforma que
          facilita a interação da vizinhança com os comércios.
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Heading
          fontSize={{ base: '2xl', sm: '3xl' }}
          textAlign="center"
          color={'gray.600'}
          fontWeight={'semibold'}
          mb={4}
        >
          Beneficios do App
        </Heading>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'Contato com o comércio'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={
              'Facilitamos interação do cliente com o comércio, mantendo os dados do comércio sempre atualizados.'
            }
          />
          <Card
            heading={'Avaliação dos comércios'}
            icon={<Icon as={FcRating} w={10} h={10} />}
            description={
              'As avaliações classificam o grau de satisfação que os clientes têm com os comércios. Elas são fundamentais, pois atestam a outros clientes como foi a experiência que as pessoas tiveram com o comércio.'
            }
          />
          <Card
            heading={'Busque o que precisa'}
            icon={<Icon as={FcSearch} w={10} h={10} />}
            description={
              'Nossa busca é dinâmica, então você pode buscar por qualquer coisa que exista dentro do Meu Bairro'
            }
          />
          <Card
            heading={'Encontre comércios próximos'}
            icon={<Icon as={FcGlobe} w={10} h={10} />}
            description={
              'Compartilhando sua localização com o Meu Bairro, podemos te mostrar os comércios mais próximos a você'
            }
          />
          <Card
            heading={'Contato rápido com o Suporte'}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              'Muito útil para os comércios. Esse recurso facilita a atualização da página e mantém todos os clientes atualizados.'
            }
          />
        </Flex>
      </Container>
    </Flex>
  );
}

import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Stack, Tag } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import CommerceImagesSlider from '../../../components/CommerceImagesSlider';

const CommercePage = () => {
  const router = useRouter();

  const handleBackToDashboard = () => {
    Router.push('/admin/dashboard');
  };

  return (
    <Flex flexDirection="column" alignItems="center">
      <Button
        mt={2}
        leftIcon={<ArrowBackIcon />}
        colorScheme="blue"
        variant="ghost"
        onClick={handleBackToDashboard}
      >
        Voltar
      </Button>
      <Flex flexDirection="column" alignItems="center" gap={2} p={5}>
        <Heading textAlign="center" size={['md', 'xl']}>
          Commerce {router.query.id}
        </Heading>
        <Stack direction={['column', 'row']}>
          <Tag size={['sm', 'md']}>Category</Tag>
          <Tag size={['sm', 'md']}>ID: {router.query.id}</Tag>
          <Tag size={['sm', 'md']}>Criado em: {new Date().toUTCString()}</Tag>
          <Tag size={['sm', 'md']} colorScheme="green">
            Ativo
          </Tag>
        </Stack>
      </Flex>
      <Box width={'80%'} margin="0 auto">
        <CommerceImagesSlider />
      </Box>
    </Flex>
  );
};

export default CommercePage;

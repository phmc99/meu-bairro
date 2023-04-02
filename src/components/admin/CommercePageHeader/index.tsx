import { Box, Flex, Heading, Stack, Tag } from '@chakra-ui/react';
import { ICommerce } from '../../../types';

interface CommercePageHeaderProps {
  commerce: ICommerce;
}

const CommercePageHeader = ({ commerce }: CommercePageHeaderProps) => {
  return (
    <Flex flexDirection="column" alignItems="center" gap={2}>
      <Heading textAlign="center" size={['md', 'xl']}>
        {commerce.name}
      </Heading>
      <Box
        dangerouslySetInnerHTML={{ __html: commerce.description }}
        w="60%"
        color="gray.600"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '3',
          WebkitBoxOrient: 'vertical'
        }}
      />
      <Stack direction={['column', 'row']}>
        <Tag size={['sm', 'md']}>{commerce.category}</Tag>
        <Tag size={['sm', 'md']}>ID: {commerce._id}</Tag>
        <Tag size={['sm', 'md']}>Criado em: {commerce.createdAt}</Tag>
        <Tag
          size={['sm', 'md']}
          colorScheme={commerce.active ? 'green' : 'red'}
        >
          {commerce.active ? 'Ativo' : 'Inativo'}
        </Tag>
      </Stack>
    </Flex>
  );
};

export default CommercePageHeader;

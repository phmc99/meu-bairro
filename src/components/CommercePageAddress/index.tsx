import { EditIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { ICommerce } from '../../types';

interface CommercePageAddressProps {
  commerce: ICommerce;
}
const CommercePageAddress = ({ commerce }: CommercePageAddressProps) => {
  if (commerce.address) {
    return (
      <>
        <Flex gap={2} alignItems="center">
          <Heading>Endereço</Heading>
          <IconButton
            variant="outline"
            colorScheme="blue"
            aria-label="Editar Contato"
            size="sm"
            icon={<EditIcon />}
          />
        </Flex>
        <Text mt={2}>
          {commerce.address.street}, Nº
          {commerce.address.number}, {commerce.address.neighborhood},{' '}
          {commerce.address.city}, {commerce.address.state}
        </Text>
      </>
    );
  }

  return (
    <>
      <Flex gap={2} alignItems="center">
        <Heading>Endereço</Heading>
        <IconButton
          variant="outline"
          colorScheme="blue"
          aria-label="Editar Contato"
          size="sm"
          icon={<EditIcon />}
        />
      </Flex>
      <Heading color="gray.500" size="md">
        Comércio sem endereço
      </Heading>
    </>
  );
};

export default CommercePageAddress;

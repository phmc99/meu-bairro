import { EditIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { ICommerce } from '../../types';

interface CommercePageAddressProps {
  commerce: ICommerce;
  openModal: () => void;
}
const CommercePageAddress = ({
  commerce,
  openModal
}: CommercePageAddressProps) => {
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
            onClick={openModal}
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

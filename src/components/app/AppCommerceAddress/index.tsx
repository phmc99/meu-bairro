import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';

interface AppCommerceAddressProps {
  address?: string;
}

const AppCommerceAddress = ({ address }: AppCommerceAddressProps) => {
  if (!address) {
    address = 'Comércio sem endereço';
  }
  return (
    <HStack my={2} textAlign="center" w="80%" justifyContent="center">
      <Icon boxSize={6} color="red.600" as={MdLocationOn} />
      <Text fontSize="md">{address}</Text>
    </HStack>
  );
};

export default AppCommerceAddress;

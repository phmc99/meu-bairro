import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { MdLocationOn } from 'react-icons/md';

interface AppCommerceAddressProps {
  address?: string;
}

const AppCommerceAddress = ({ address }: AppCommerceAddressProps) => {
  if (!address) {
    address = 'Sem endereço';
  }
  return (
    <HStack my={2} textAlign="center" w="80%" justifyContent="center">
      <Icon boxSize={6} color="red.600" as={MdLocationOn} />
      <Text
        fontSize="md"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}
      >
        {address}
      </Text>
    </HStack>
  );
};

export default AppCommerceAddress;

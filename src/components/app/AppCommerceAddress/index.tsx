import { ExternalLinkIcon } from '@chakra-ui/icons';
import { HStack, Icon, Link } from '@chakra-ui/react';
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
      <Link
        fontSize="md"
        color="blue.600"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}
        href={`https://www.google.com/maps?q=${address}`}
        isExternal
      >
        {address}
      </Link>
      <ExternalLinkIcon color="blue.600" mx="2px" />
    </HStack>
  );
};

export default AppCommerceAddress;

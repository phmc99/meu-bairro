import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Button, HStack, Icon } from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';

interface AppCommerceAddressProps {
  address?: string;
}

const AppCommerceAddress = ({ address }: AppCommerceAddressProps) => {
  const handleOpenMaps = () => {
    window.location.href = `https://www.google.com/maps?q=${address}`;
  };

  return (
    <HStack my={2} textAlign="center" w="80%" justifyContent="center">
      <Icon boxSize={6} color="red.600" as={MdLocationOn} />
      <Button
        fontSize="md"
        color="blue.600"
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}
        variant="link"
        disabled={address ? false : true}
        onClick={handleOpenMaps}
      >
        {address ? address : 'Sem endereço'}
      </Button>
      <ExternalLinkIcon
        color="blue.600"
        mx="2px"
        display={address ? 'flex' : 'none'}
      />
    </HStack>
  );
};

export default AppCommerceAddress;

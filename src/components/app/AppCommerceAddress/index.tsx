import { ExternalLinkIcon } from '@chakra-ui/icons';
import { HStack, Heading, Icon } from '@chakra-ui/react';
import { MdLocationOn } from 'react-icons/md';

interface AppCommerceAddressProps {
  address?: string;
}

const AppCommerceAddress = ({ address }: AppCommerceAddressProps) => {
  const handleOpenMaps = () => {
    window.open(`https://www.google.com/maps?q=${address}`, 'blank');
  };

  return (
    <HStack
      w="80%"
      m="0 auto"
      my={2}
      textAlign="center"
      justifyContent="center"
    >
      <Icon boxSize={6} color="red.600" as={MdLocationOn} />
      <Heading
        fontSize="md"
        color={address ? 'blue.600' : 'gray.400'}
        sx={{
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical'
        }}
        pointerEvents={address ? 'all' : 'none'}
        onClick={handleOpenMaps}
      >
        {address ? address : 'Sem endereço'}
      </Heading>
      <ExternalLinkIcon
        color="blue.600"
        mx="2px"
        display={address ? 'flex' : 'none'}
      />
    </HStack>
  );
};

export default AppCommerceAddress;

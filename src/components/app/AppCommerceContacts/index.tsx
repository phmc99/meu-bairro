import { HStack, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from 'react-icons/fa';

const AppCommerceContact = () => {
  return (
    <HStack gap={2}>
      <IconButton
        aria-label="whatsapp"
        colorScheme="whatsapp"
        icon={<FaWhatsapp size={24} />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
      />
      <IconButton
        aria-label="phone"
        colorScheme="blue"
        icon={<FaPhone size={20} />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
      />
      <IconButton
        aria-label="ads"
        background="linear-gradient(to bottom, #833ab4, #fd1d1d, #fcb045);"
        icon={<FaInstagram size={24} color="white" />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
      />
      <IconButton
        aria-label="ads"
        colorScheme="facebook"
        icon={<FaFacebook size={24} />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
      />
    </HStack>
  );
};

export default AppCommerceContact;

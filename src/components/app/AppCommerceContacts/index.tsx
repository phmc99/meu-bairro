import { HStack, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { IContact } from '../../../types';

interface AppCommerceContactProps {
  contact: IContact;
}

const AppCommerceContact = ({ contact }: AppCommerceContactProps) => {
  const handleWhatsapp = () => {
    window.open(
      `https://wa.me/55${contact.whatsapp}?text=Gostaria%20de%20mais%20informações.%20Via:%20Meu%20Bairro`
    );
  };

  const handlePhone = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  const handleInstagram = () => {
    window.open(`https://www.instagram.com/${contact.instagram}/`);
  };

  const handleFacebook = () => {
    window.open(`https://www.facebook.com/${contact.facebook}`);
  };

  return (
    <HStack gap={2}>
      <IconButton
        aria-label="whatsapp"
        colorScheme="whatsapp"
        icon={<FaWhatsapp size={24} />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
        onClick={handleWhatsapp}
      />
      <IconButton
        aria-label="phone"
        colorScheme="blue"
        icon={<FaPhone size={20} />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
        onClick={handlePhone}
      />
      <IconButton
        aria-label="ads"
        background="linear-gradient(to bottom, #833ab4, #fd1d1d, #fcb045);"
        icon={<FaInstagram size={24} color="white" />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
        onClick={handleInstagram}
        disabled={contact.instagram ? false : true}
      />
      <IconButton
        aria-label="ads"
        colorScheme="facebook"
        icon={<FaFacebook size={24} />}
        _hover={{
          filter: 'brightness(0.85)'
        }}
        onClick={handleFacebook}
        disabled={contact.facebook ? false : true}
      />
    </HStack>
  );
};

export default AppCommerceContact;

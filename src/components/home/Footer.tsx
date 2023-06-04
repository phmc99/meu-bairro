import {
  Box,
  Button,
  Container,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden
} from '@chakra-ui/react';
import {
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn
} from 'react-icons/fa';
import { ReactNode } from 'react';

const Logo = () => {
  return <Image w={40} src="logo-meu-bairro.png" alt="logo" />;
};

const SocialButton = ({
  children,
  label,
  href
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={12}
      h={12}
      fontSize={'lg'}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Logo />
        <Text textAlign="center">
          © {new Date().getFullYear()} Meu Bairro. Todos os direitos reservados
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton
            label={'Linkedin'}
            href={'https://www.linkedin.com/company/meu-bairro/'}
          >
            <FaLinkedinIn />
          </SocialButton>
          <SocialButton
            label={'YouTube'}
            href={'https://www.youtube.com/@brmoutdigital'}
          >
            <FaYoutube />
          </SocialButton>
          <SocialButton
            label={'Instagram'}
            href={'https://www.instagram.com/bairromdg_oficial/'}
          >
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}

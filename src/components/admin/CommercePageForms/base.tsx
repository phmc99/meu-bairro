import {
  Box,
  Button,
  CloseButton,
  Flex,
  Heading,
  useToast
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import api from '../../../services/api';

interface CommercePageFormBaseProps {
  title: string;
  setToggle: () => void;
  children: ReactNode;
  type: string;
}

const CommercePageFormBase = ({
  title,
  setToggle,
  children,
  type
}: CommercePageFormBaseProps) => {
  const router = useRouter();
  const token = localStorage.getItem('@mb:admin-token');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const updateAddress = async (elements: any) => {
    const formData = new FormData(elements);
    const body = { address: Object.fromEntries(formData) };

    await api.patch(`/commerce/${router.query.id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const updateContact = async (elements: any) => {
    const formData = new FormData(elements);
    const body = { contact: Object.fromEntries(formData) };

    await api.patch(`/commerce/${router.query.id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const updateImages = async (elements: any) => {
    const formData: any = {};
    const images: string[] = [];

    for (const element of elements) {
      if (element.getAttribute('data-img')) {
        if (!(element.value.trim() === '')) {
          images.push(element.value);
        }
      }

      if (element.name === 'logo') {
        formData['logo'] = element.value;
      }
    }

    formData.images = images;

    await api.patch(`/commerce/${router.query.id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(!isLoading);

    if (type === 'image') {
      await updateImages(e.target);
    }

    if (type === 'contact') {
      await updateContact(e.target);
    }

    if (type === 'address') {
      await updateAddress(e.target);
    }

    toast({
      title: 'Comércio Atualizado',
      status: 'info',
      duration: 3000,
      isClosable: true
    });
    return setToggle();
  };

  return (
    <Flex
      w="100vw"
      h="100vh"
      bgColor="blackAlpha.800"
      position="fixed"
      zIndex={3}
      alignItems="center"
      justifyContent="center"
    >
      <Flex borderRadius={5} p={5} direction="column" bgColor="#fff">
        <Flex gap={5} justifyContent="space-between" alignItems="center">
          <Heading>{title}</Heading>
          <CloseButton disabled={isLoading} onClick={setToggle} />
        </Flex>
        <Box pointerEvents={isLoading ? 'none' : 'auto'} mt={10}>
          <form onSubmit={handleSubmit}>
            <Flex px={5} maxH="50vh" direction="column" overflowY="scroll">
              {children}
            </Flex>
            <Button
              isLoading={isLoading}
              colorScheme="green"
              width="100%"
              mt={5}
              type="submit"
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CommercePageFormBase;

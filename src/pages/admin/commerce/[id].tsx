import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Button, Divider, Flex, Heading, Spinner } from '@chakra-ui/react';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { useQuery } from 'react-query';
import CommerceImagesSlider from '../../../components/CommerceImagesSlider';
import CommercePageAddress from '../../../components/CommercePageAddress';
import CommercePageContact from '../../../components/CommercePageContact';
import CommercePageAddressForm from '../../../components/CommercePageForms/AddressForm';
import CommercePageContactForm from '../../../components/CommercePageForms/ContactForm';
import CommercePageImageForm from '../../../components/CommercePageForms/ImageForm';
import CommercePageHeader from '../../../components/CommercePageHeader';
import { getCommerce } from '../../../services/commerce';
import { ICommerceQuery } from '../../../types';

const CommercePage = () => {
  const router = useRouter();

  const [imageForm, setImageForm] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState<boolean>(false);
  const [addressForm, setAddressForm] = useState<boolean>(false);

  const handleImageFormToggle = () => {
    setImageForm(!imageForm);
  };
  const handleContactFormToggle = () => {
    setContactForm(!contactForm);
  };
  const handleAddressFormToggle = () => {
    setAddressForm(!addressForm);
  };

  const handleBackToDashboard = () => {
    Router.push('/admin/dashboard');
  };

  const { data, isLoading, error }: ICommerceQuery = useQuery(
    ['commerce'],
    () => {
      const localStorageId =
        localStorage.getItem('@mb:current-commerce-id') || '';
      const queryId = router.query.id;

      if (queryId) {
        return getCommerce(queryId as string);
      } else if (localStorageId !== '') {
        return getCommerce(localStorageId as string);
      } else {
        return handleBackToDashboard();
      }
    }
  );

  if (isLoading) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Heading>Algo de errado aconteceu.</Heading>
      </Flex>
    );
  }

  if (!data) {
    return (
      <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
        <Heading>Problemas com os dados.</Heading>
      </Flex>
    );
  }

  return (
    <>
      {imageForm ? (
        <CommercePageImageForm
          logo={data.commerce.logo}
          images={data.commerce.images}
          setToggle={handleImageFormToggle}
        />
      ) : null}
      {contactForm ? (
        <CommercePageContactForm
          setToggle={handleContactFormToggle}
          contact={data.commerce.contact}
        />
      ) : null}
      {addressForm ? (
        <CommercePageAddressForm
          setToggle={handleAddressFormToggle}
          address={data.commerce.address}
        />
      ) : null}
      <Flex flexDirection="column" alignItems="center" gap={2}>
        <Flex
          w={['100%']}
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
          p={5}
        >
          <Button
            mt={[2, 0]}
            leftIcon={<ArrowBackIcon />}
            colorScheme="blue"
            variant="ghost"
            onClick={handleBackToDashboard}
          >
            Voltar
          </Button>
          <CommercePageHeader commerce={data.commerce} />
        </Flex>
        <Box textAlign="center" width="80%" margin="0 auto">
          <CommerceImagesSlider
            logo={data.commerce.logo}
            images={data.commerce.images}
          />
          <Button
            onClick={handleImageFormToggle}
            colorScheme="blue"
            variant="link"
            mt={5}
          >
            Editar imagens
          </Button>
        </Box>
        <Divider />
        <Flex w="100%" p={5} gap={2}>
          <Flex w="100%" direction="column">
            <CommercePageAddress
              openModal={handleAddressFormToggle}
              commerce={data.commerce}
            />
          </Flex>
          <Flex w="100%" direction="column">
            <CommercePageContact
              openModal={handleContactFormToggle}
              commerce={data.commerce}
            />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default CommercePage;

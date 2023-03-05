import { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Flex,
  useToast,
  CloseButton
} from '@chakra-ui/react';
import { NameCategoryForm } from './NameCategoryForm';
import { ContactForm } from './ContactForm';
import { AddressForm } from './AddressForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { postCommerce, resetFormData } from '../../../store/commerce-create';
import { categoryExists, contactExists, nameExists } from './verify';

interface ICommerceCreateForm {
  setToggle: () => void;
}

const CommerceCreateForm = ({ setToggle }: ICommerceCreateForm) => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const dispatch = useDispatch<AppDispatch>();

  const { name, category, contact, address } = useSelector(
    (state: AppState) => state.commerceForm
  );

  const handleNextSetp = () => {
    if (step === 1 && !nameExists(name)) {
      return toast({
        title: 'Nome inválido.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }

    if (step === 1 && !categoryExists(category)) {
      return toast({
        title: 'Categoria inválida.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }

    if (step === 2 && !contactExists(contact)) {
      return toast({
        title: 'Campos obrigatórios: e-mail, telefone, whatsapp.',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }

    setStep(step + 1);
    if (step === 3) {
      setProgress(100);
    } else {
      setProgress(progress + 33.33);
    }
  };

  const handleSubmit = async () => {
    const response = await dispatch(
      postCommerce({ name, category, contact, address })
    );

    if (response.payload.status === 'error') {
      toast({
        title: 'Erro na criação do comércio.',
        description: response.payload.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
      return;
    }

    toast({
      title: 'Comércio criado.',
      description: 'Temos um novo comércio na plataforma!',
      status: 'success',
      duration: 3000,
      isClosable: true
    });

    dispatch(resetFormData());
    setToggle();
  };

  return (
    <Flex
      height="100vh"
      width="100%"
      zIndex={1}
      position="absolute"
      backgroundColor="#0c0c0cf0"
      alignItems="center"
    >
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        width="90%"
        p={6}
        m="10px auto"
        as="form"
        backgroundColor="#f1f1f1"
        height="max-content"
      >
        <Flex>
          <Progress
            hasStripe
            value={progress}
            w="100%"
            mb="5%"
            mx="5%"
            isAnimated
          />
          <CloseButton onClick={setToggle} />
        </Flex>

        {step === 1 ? (
          <NameCategoryForm />
        ) : step === 2 ? (
          <ContactForm />
        ) : (
          <AddressForm />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex gap={2} w="100%" justifyContent="space-between">
            <Flex gap={2}>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="blue"
                variant="solid"
                w="7rem"
              >
                Anterior
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={handleNextSetp}
                colorScheme="blue"
                variant="outline"
              >
                Próximo
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                onClick={handleSubmit}
              >
                Criar!
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </Flex>
  );
};

export default CommerceCreateForm;

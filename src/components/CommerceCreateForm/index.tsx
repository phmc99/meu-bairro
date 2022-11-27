import { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast
} from '@chakra-ui/react';

const NameCategoryForm = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Novo Comércio
      </Heading>
      <FormControl mr="5%">
        <FormLabel htmlFor="name" fontWeight="md">
          Nome do comércio
        </FormLabel>
        <Input type="text" id="name" placeholder="Nome do comércio" />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="category" fontWeight="md">
          Categoria
        </FormLabel>
        <Select
          id="category"
          name="category"
          autoComplete="category"
          placeholder="Escolha uma categoria"
        >
          <option>Padarias</option>
          <option>Mercados</option>
          <option>Bares</option>
          <option>Restaurantes</option>
        </Select>
      </FormControl>
    </>
  );
};

const ContactForm = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Contatos do Comércio
      </Heading>
      <FormControl>
        <FormLabel htmlFor="phone" fontWeight="md">
          Telefone de contato
        </FormLabel>
        <Input
          placeholder="Telefone de contato"
          type="text"
          name="phone"
          id="phone"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="whatsapp" fontWeight="md">
          WhatsApp
        </FormLabel>
        <Input
          placeholder="WhatsApp do comércio"
          type="text"
          name="whatsapp"
          id="whatsapp"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="facebook" fontWeight="md">
          Facebook
        </FormLabel>
        <Input
          placeholder="Facebook do comércio"
          type="text"
          name="facebook"
          id="facebook"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="instagram" fontWeight="md">
          Instagram
        </FormLabel>
        <Input
          placeholder="Instagram do comércio"
          type="text"
          name="instagram"
          id="instagram"
        />
      </FormControl>
    </>
  );
};

const AddressForm = () => {
  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Endereço do Comércio
      </Heading>
      <Flex gap={2}>
        <FormControl>
          <FormLabel htmlFor="cep" fontWeight="md">
            CEP
          </FormLabel>
          <Input
            placeholder="CEP do comércio"
            type="text"
            name="cep"
            id="cep"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="neighborhood" fontWeight="md">
            Bairro
          </FormLabel>
          <Input type="text" name="neighborhood" id="neighborhood" />
        </FormControl>
      </Flex>

      <Flex gap={2}>
        <FormControl>
          <FormLabel htmlFor="city" fontWeight="md">
            Cidade
          </FormLabel>
          <Input type="text" name="city" id="city" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="state" fontWeight="md">
            Estado
          </FormLabel>
          <Input type="text" name="state" id="state" />
        </FormControl>
      </Flex>

      <FormControl>
        <FormLabel htmlFor="street" fontWeight="md">
          Rua
        </FormLabel>
        <Input type="text" name="street" id="street" />
      </FormControl>
      <Flex gap={2}>
        <FormControl>
          <FormLabel htmlFor="number" fontWeight="md">
            Número
          </FormLabel>
          <Input placeholder="Número" type="text" name="number" id="number" />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="complement" fontWeight="md">
            Complemento
          </FormLabel>
          <Input
            placeholder="Complemento"
            type="text"
            name="complement"
            id="complement"
          />
        </FormControl>
      </Flex>
    </>
  );
};

const CommerceCreateForm = () => {
  const toast = useToast();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
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
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="blue"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="green"
                variant="solid"
                onClick={() => {
                  toast({
                    title: 'Comércio criado.',
                    description: 'Temos um novo comércio na plataforma!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                  });
                }}
              >
                Criar!
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default CommerceCreateForm;

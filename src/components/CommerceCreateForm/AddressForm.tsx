import { Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

export const AddressForm = () => {
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

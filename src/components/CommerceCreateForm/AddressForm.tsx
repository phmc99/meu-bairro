import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';

interface CepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const AddressForm = () => {
  const [cep, setCep] = useState<CepResponse>({} as CepResponse);
  const toast = useToast();

  const getCep = async (cep: string) => {
    const endpoint = `https://viacep.com.br/ws/${cep}/json/`;

    const response = await axios.get(endpoint);

    if (response.data.erro) {
      toast({
        title: 'Número ou Formato do CEP inválido.',
        duration: 3000,
        isClosable: true,
        status: 'error',
        position: 'top'
      });
      return;
    }

    setCep(response.data);
  };

  const handleChangeCepInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 8) {
      getCep(e.target.value);
    }
    setCep({} as CepResponse);
  };

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
            onChange={handleChangeCepInput}
            maxLength={8}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="neighborhood" fontWeight="md">
            Bairro
          </FormLabel>
          <Input
            value={cep.bairro != null ? cep.bairro : ''}
            disabled
            type="text"
            name="neighborhood"
            id="neighborhood"
          />
        </FormControl>
      </Flex>

      <Flex gap={2}>
        <FormControl>
          <FormLabel htmlFor="city" fontWeight="md">
            Cidade
          </FormLabel>
          <Input
            value={cep.localidade != null ? cep.localidade : ''}
            disabled
            type="text"
            name="city"
            id="city"
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="state" fontWeight="md">
            Estado
          </FormLabel>
          <Input
            value={cep.uf != null ? cep.uf : ''}
            disabled
            type="text"
            name="state"
            id="state"
          />
        </FormControl>
      </Flex>

      <FormControl>
        <FormLabel htmlFor="street" fontWeight="md">
          Rua
        </FormLabel>
        <Input
          value={cep.logradouro != null ? cep.logradouro : ''}
          disabled
          type="text"
          name="street"
          id="street"
        />
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

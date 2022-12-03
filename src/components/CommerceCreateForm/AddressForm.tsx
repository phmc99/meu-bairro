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
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { handleChangeFormData } from '../../store/commerce-create';
import { IAddress } from '../../types';

interface CepResponse {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}
export const AddressForm = () => {
  const [cepResponse, setCepResponse] = useState({} as CepResponse);
  const [address, setAddress] = useState({} as IAddress);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const getCep = async (cepInput: string) => {
    const endpoint = `https://viacep.com.br/ws/${cepInput}/json/`;

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

    const { cep, logradouro, bairro, localidade, uf } = response.data;

    const serializeCep = {
      cep: cep,
      street: logradouro,
      neighborhood: bairro,
      city: localidade,
      state: uf
    };

    setAddress({ ...address, ...serializeCep });
    dispatch(handleChangeFormData({ address }));

    setCepResponse({ cep, logradouro, bairro, localidade, uf });
  };

  const handleChangeCepInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 8) {
      getCep(e.target.value);
    }
    setCepResponse({} as CepResponse);
  };

  const handleChangeNumber = (e: any) => {
    const value = e.target.value;
    const copy: any = { ...address };

    copy['number'] = value;

    setAddress(copy);

    dispatch(handleChangeFormData({ address }));
  };

  const handleChangeComplement = (e: any) => {
    const value = e.target.value;
    const copy: any = { ...address };

    copy['complement'] = value;

    setAddress(copy);

    dispatch(handleChangeFormData({ address }));
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
            autoComplete={'new-password'}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="neighborhood" fontWeight="md">
            Bairro
          </FormLabel>
          <Input
            value={cepResponse.bairro != null ? cepResponse.bairro : ''}
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
            value={cepResponse.localidade != null ? cepResponse.localidade : ''}
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
            value={cepResponse.uf != null ? cepResponse.uf : ''}
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
          value={cepResponse.logradouro != null ? cepResponse.logradouro : ''}
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
          <Input
            placeholder="Número"
            type="text"
            name="number"
            id="number"
            onChange={handleChangeNumber}
            autoComplete={'new-password'}
          />
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
            onChange={handleChangeComplement}
            autoComplete={'new-password'}
          />
        </FormControl>
      </Flex>
    </>
  );
};

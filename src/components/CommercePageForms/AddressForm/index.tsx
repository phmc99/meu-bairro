import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { IAddress } from '../../../types';
import CommercePageFormBase from '../base';

interface CommercePageAddressFormProps {
  setToggle: () => void;
  address: IAddress;
}

const CommercePageAddressForm = ({
  setToggle,
  address
}: CommercePageAddressFormProps) => {
  const [addressValue, setAddressValue] = useState<IAddress>(address);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const inputName = e.target.name;
    const copy: any = { ...addressValue };

    copy[inputName] = value;

    setAddressValue(copy);
  };

  return (
    <CommercePageFormBase
      type="address"
      title="Editar Endereço"
      setToggle={setToggle}
    >
      <FormControl>
        <FormLabel>CEP: </FormLabel>
        <Input
          name="cep"
          value={addressValue.cep}
          onChange={handleChange}
          placeholder="Insira o CEP"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Bairro: </FormLabel>
        <Input
          name="neighborhood"
          value={addressValue.neighborhood}
          onChange={handleChange}
          placeholder="Insira o Bairro"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Cidade: </FormLabel>
        <Input
          name="city"
          value={addressValue.city}
          onChange={handleChange}
          placeholder="Insira a Cidade"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Estado: </FormLabel>
        <Input
          name="state"
          value={addressValue.state}
          onChange={handleChange}
          placeholder="Insira o Estado"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Rua: </FormLabel>
        <Input
          name="street"
          value={addressValue.street}
          onChange={handleChange}
          placeholder="Insira a Rua"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Número: </FormLabel>
        <Input
          name="number"
          value={addressValue.number}
          onChange={handleChange}
          placeholder="Insira o Número"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Complemento: </FormLabel>
        <Input
          name="complement"
          value={addressValue.complement}
          onChange={handleChange}
          placeholder="Insira o Complemento"
        />
      </FormControl>
    </CommercePageFormBase>
  );
};

export default CommercePageAddressForm;

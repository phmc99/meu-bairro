import { FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { handleChangeFormData } from '../../store/commerce-create';
import { IContact } from '../../types';

export const ContactForm = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [contact, setContact] = useState({} as IContact);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const inputName = e.target.name;
    const copy: any = { ...contact };

    copy[inputName] = value;

    setContact(copy);

    dispatch(handleChangeFormData({ contact }));
  };

  return (
    <>
      <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
        Contatos do Comércio
      </Heading>
      <FormControl>
        <FormLabel htmlFor="email" fontWeight="md">
          E-mail
        </FormLabel>
        <Input
          placeholder="E-mail do comércio"
          type="text"
          name="email"
          id="email"
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="phone" fontWeight="md">
          Telefone de contato
        </FormLabel>
        <Input
          placeholder="Telefone de contato"
          type="text"
          name="phone"
          id="phone"
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
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
          onChange={handleChange}
        />
      </FormControl>
    </>
  );
};

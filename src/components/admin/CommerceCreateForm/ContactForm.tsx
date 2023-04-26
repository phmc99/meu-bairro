import { FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, AppState } from '../../../store';
import { handleChangeFormData } from '../../../store/commerce-create';
import { IContact } from '../../../types';
import InputMask from 'react-input-mask';

export const ContactForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { contact } = useSelector((state: AppState) => state.commerceForm);

  const [contactData, setContactData] = useState({} as IContact);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const inputName = e.target.name;
    const copy: any = { ...contactData };

    copy[inputName] = value;

    setContactData(copy);

    dispatch(handleChangeFormData({ contact: { ...copy } }));
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
          value={contact.email && contact.email}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="phone" fontWeight="md">
          Telefone de contato
        </FormLabel>
        <Input
          placeholder="Telefone de contato (ex: DD22301256)"
          as={InputMask}
          mask="99999999999"
          maskChar={null}
          type="text"
          name="phone"
          id="phone"
          value={contact.phone && contact.phone}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="whatsapp" fontWeight="md">
          WhatsApp
        </FormLabel>
        <Input
          as={InputMask}
          mask="99999999999"
          maskChar={null}
          placeholder="WhatsApp do comércio (ex: DD980951256)"
          type="text"
          name="whatsapp"
          id="whatsapp"
          value={contact.whatsapp && contact.whatsapp}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="facebook" fontWeight="md">
          Facebook
        </FormLabel>
        <Input
          placeholder="Final do link do facebook (ex: bairromariadagraca)"
          type="text"
          name="facebook"
          id="facebook"
          value={contact.facebook && contact.facebook}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="instagram" fontWeight="md">
          Instagram
        </FormLabel>
        <Input
          placeholder="Instagram do comércio (ex: bairromdg_oficial)"
          type="text"
          name="instagram"
          id="instagram"
          value={contact.instagram && contact.instagram}
          onChange={handleChange}
        />
      </FormControl>
    </>
  );
};

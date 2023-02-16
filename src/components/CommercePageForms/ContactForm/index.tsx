import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { IContact } from '../../../types';
import CommercePageFormBase from '../base';

interface CommercePageContactFormProps {
  setToggle: () => void;
  contact: IContact;
}

const CommercePageContactForm = ({
  setToggle,
  contact
}: CommercePageContactFormProps) => {
  const [contactValue, setContactValue] = useState<IContact>(contact);

  const handleChange = (e: any) => {
    const value = e.target.value;
    const inputName = e.target.name;
    const copy: any = { ...contactValue };

    copy[inputName] = value;

    setContactValue(copy);
  };

  return (
    <CommercePageFormBase
      type="contact"
      title="Editar Contato"
      setToggle={setToggle}
    >
      <FormControl>
        <FormLabel>E-mail: </FormLabel>
        <Input
          name="email"
          value={contact.email}
          onChange={handleChange}
          placeholder="Insira um e-mail"
          type="email"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Telefone: </FormLabel>
        <Input
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          placeholder="Insira um telefone"
        />
      </FormControl>
      <FormControl>
        <FormLabel>WhatsApp: </FormLabel>
        <Input
          name="whatsapp"
          value={contact.whatsapp}
          onChange={handleChange}
          placeholder="Insira o WhatsApp"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Instagram: (opcional)</FormLabel>
        <Input
          name="instagram"
          value={contact.instagram}
          onChange={handleChange}
          placeholder="Insira o Instagram"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Facebook: (opcional)</FormLabel>
        <Input
          name="facebook"
          value={contact.facebook}
          onChange={handleChange}
          placeholder="Insira o Facebook"
        />
      </FormControl>
    </CommercePageFormBase>
  );
};

export default CommercePageContactForm;

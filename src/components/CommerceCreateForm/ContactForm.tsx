import { FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';

export const ContactForm = () => {
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

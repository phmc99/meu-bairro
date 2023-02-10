import { EditIcon } from '@chakra-ui/icons';
import { Flex, Heading, IconButton, List, ListItem } from '@chakra-ui/react';
import { ICommerce } from '../../types';

interface CommercePageContactProps {
  commerce: ICommerce;
}

const CommercePageContact = ({ commerce }: CommercePageContactProps) => {
  return (
    <>
      <Flex gap={2} alignItems="center">
        <Heading>Contato</Heading>
        <IconButton
          variant="outline"
          colorScheme="blue"
          aria-label="Editar Contato"
          size="sm"
          icon={<EditIcon />}
        />
      </Flex>
      <List mt={2}>
        <ListItem>WhatsApp: {commerce.contact.whatsapp}</ListItem>
        <ListItem>Instagram: {commerce.contact.instagram}</ListItem>
        <ListItem>Facebook: {commerce.contact.facebook}</ListItem>
        <ListItem>Telefone: {commerce.contact.phone}</ListItem>
        <ListItem>E-mail: {commerce.contact.email}</ListItem>
      </List>
    </>
  );
};

export default CommercePageContact;

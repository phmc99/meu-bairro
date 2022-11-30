import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select
} from '@chakra-ui/react';

export const NameCategoryForm = () => {
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

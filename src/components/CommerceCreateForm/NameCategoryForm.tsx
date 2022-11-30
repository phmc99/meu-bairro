import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select
} from '@chakra-ui/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import api from '../../services/api';

interface CategoriesResponse {
  description: string;
  name: string;
  __v: number;
  _id: string;
}

export const NameCategoryForm = () => {
  const [categories, setCategories] = useState<CategoriesResponse[]>([]);

  const getCategories = async () => {
    const token = localStorage.getItem('admin-token');

    const response = await api.get('/category', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('admin-token');
      Router.push('/admin/login');
      return;
    }

    setCategories(response.data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);

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
          placeholder={
            categories.length === 0 ? 'Carregando...' : 'Escolha uma categoria'
          }
          disabled={categories.length === 0 ? true : false}
        >
          {categories.length > 0 &&
            categories.map((item, index) => (
              <option key={index}>{item.name}</option>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

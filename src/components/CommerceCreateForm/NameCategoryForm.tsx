import {
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select
} from '@chakra-ui/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../services/api';
import { AppDispatch, AppState } from '../../store';
import { handleChangeFormData } from '../../store/commerce-create';

interface CategoriesResponse {
  description: string;
  name: string;
  __v: number;
  _id: string;
}

export const NameCategoryForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { name, category } = useSelector(
    (state: AppState) => state.commerceForm
  );

  const [categories, setCategories] = useState<CategoriesResponse[]>([]);
  const [nameInput, setNameInput] = useState<string>(name);

  const getCategories = () => {
    const token = localStorage.getItem('admin-token');
    return api
      .get('/category', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(({ data }) => {
        setCategories(data.categories);
      })
      .catch(res => {
        if (res.response.status === 401) {
          localStorage.removeItem('admin-token');
          Router.push('/admin/login');
          return;
        }
      });
  };

  const handleChangeName = (e: any) => {
    const value = e.target.value;
    dispatch(handleChangeFormData({ name: value }));
    setNameInput(e.target.value);
  };

  const handleChangeCategory = (e: any) => {
    const value = e.target.value;
    dispatch(handleChangeFormData({ category: value }));
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
        <Input
          type="text"
          name="name"
          placeholder="Nome do comércio"
          onChange={handleChangeName}
          value={nameInput}
        />
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
          onChange={handleChangeCategory}
          value={category}
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

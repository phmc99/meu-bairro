import api from '../api';

export const getCommerce = async (id: string) => {
  return await api.get(`/commerce/${id}`).then(res => {
    return res.data;
  });
};

export const getNewCommerces = async (page: number, perPage = 10) => {
  return await api
    .get(`/commerce/new?page=${page}&perPage=${perPage}`)
    .then(res => res.data);
};

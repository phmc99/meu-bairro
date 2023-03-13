import api from '../api';

export const getCategory = async () => {
  return await api.get(`/category`).then(res => {
    return res.data;
  });
};

export const getCommercesByCategory = async (
  value: string | string[],
  page: number,
  perPage = 15
) => {
  return await api
    .get(`/commerce/category?value=${value}&page=${page}&perPage=${perPage}`)
    .then(res => res.data);
};

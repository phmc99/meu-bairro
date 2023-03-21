import api from '../api';

export const getCommerce = async (id: string) => {
  return await api.get(`/commerce/${id}`).then(res => {
    return res.data;
  });
};

export const getNewCommerces = async (
  neighborhood: string | undefined,
  page: number,
  perPage = 10
) => {
  return await api
    .get(
      `/commerce/new?neighborhood=${neighborhood}&page=${page}&perPage=${perPage}`
    )
    .then(res => res.data);
};

export const getCloserCommerces = async (
  neighborhood: string | undefined,
  page: number,
  perPage = 10
) => {
  return await api
    .get(
      `/commerce/neighborhood?value=${neighborhood}&page=${page}&perPage=${perPage}`
    )
    .then(res => res.data);
};

export const getBestRatedCommerces = async (
  neighborhood: string | undefined,
  page: number,
  perPage = 10
) => {
  return await api
    .get(
      `/commerce/bestrated?neighborhood=${neighborhood}&page=${page}&perPage=${perPage}`
    )
    .then(res => res.data);
};

export const getCommercesByCategory = async (
  value: string | string[],
  neighborhood: string | undefined,
  page: number,
  perPage = 10
) => {
  return await api
    .get(
      `/commerce/category?value=${value}&page=${page}&perPage=${perPage}&neighborhood=${neighborhood}`
    )
    .then(res => res.data);
};

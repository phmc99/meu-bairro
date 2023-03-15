import api from '../api';

export const getCommerce = async (id: string) => {
  return await api.get(`/commerce/${id}`).then(res => {
    return res.data;
  });
};

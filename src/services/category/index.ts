import api from '../api';

export const getCategory = async () => {
  return await api.get(`/category`).then(res => {
    return res.data;
  });
};

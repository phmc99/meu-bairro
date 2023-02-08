import Router from 'next/router';
import api from '../api';

export const getCommerce = async (id: string) => {
  const token = localStorage.getItem('admin-token');

  if (!token) {
    return Router.push('/admin/login');
  }

  return await api
    .get(`/commerce/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(res => {
      if (res.response.status === 401) {
        localStorage.removeItem('admin-token');
        Router.push('/admin/login');
        return;
      }
      return res.response.data;
    });
};

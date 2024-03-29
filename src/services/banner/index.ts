import api from '../api';

export const getBanners = async () => {
  return await api.get(`/banner`).then(res => {
    return res.data;
  });
};

export const deleteBanner = (token: string, id: string) => {
  return api
    .delete(`/banner/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      return res.data;
    });
};

export const createBanner = (token: string, imgUrl: string) => {
  return api
    .post(
      `/banner`,
      { imgUrl },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      return res.data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

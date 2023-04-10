import api from '../api';

interface IFeedbackCreate {
  user: {
    _id?: string;
    lastName?: string;
    firstName?: string;
  };
  comment: string;
  rate: number;
}

export const createFeedback = (
  commerceId: string,
  token: string,
  body: IFeedbackCreate
) => {
  return api
    .post(`/commerce/${commerceId}/feedback`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      return res.data;
    })
    .catch(({ response }) => {
      return response.data;
    });
};

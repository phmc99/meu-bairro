import { IContact } from '../../../types';

export const nameExists = (name: string | undefined | null) => {
  if (!name) {
    return false;
  }
  if (name?.trim() === '') {
    return false;
  }
  return true;
};

export const categoryExists = (category: string | undefined | null) => {
  if (!category) {
    return false;
  }
  if (category?.trim() === '') {
    return false;
  }
  return true;
};

export const contactExists = (contact: IContact) => {
  if (!contact) {
    return false;
  }
  if (!contact.email) {
    return false;
  }
  if (!contact.phone) {
    return false;
  }
  if (!contact.whatsapp) {
    return false;
  }
  return true;
};

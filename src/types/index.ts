export interface ICommerce {
  name: string;
  category: string;
  address: IAddress;
  contact: IContact;
  images: string[];
  logo: string;
  feedbacks: IFeedback[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface IAddress {
  city: string;
  complement: string;
  number: string;
  street: string;
  neighborhood: string;
  state: string;
  cep: string;
}

export interface IContact {
  whatsapp: string;
  phone: string;
  email: string;
}

export interface IFeedback {
  commerce: string;
  user: {
    _id: string;
    lastName: string;
    firstName: string;
  };
  comment: string;
  rate: number;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

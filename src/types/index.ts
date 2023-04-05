export interface ICommerce {
  name: string;
  description: string;
  category: string;
  address: IAddress;
  contact: IContact;
  images: string[];
  logo: string;
  feedbacks: IFeedback[];
  neighborhood: string;
  totalRate: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}

export interface ICommerceResponse {
  page: number;
  per_page: number;
  previous_page: string | null;
  next_page: string | null;
  last_page: number;
  count: number;
  data: ICommerce[];
}

export interface IAddress {
  city: string;
  complement: string;
  number: string;
  street: string;
  state: string;
  cep: string;
  neighborhood: string;
}

export interface IContact {
  whatsapp: string;
  phone: string;
  email: string;
  facebook?: string;
  instagram?: string;
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

export interface ICommerceQuery {
  data:
    | {
        commerce: ICommerce;
        status?: string;
      }
    | undefined;
  isLoading: boolean;
  error: unknown;
}

export interface ICategory {
  imgUrl: string;
  name: string;
  description: string;
}

export interface ICategoryQuery {
  data:
    | {
        categories: ICategory[];
        status?: string;
      }
    | undefined;
  isLoading: boolean;
  error: unknown;
}

export interface IBanner {
  _id: string;
  __v: number;
  imgUrl: string;
  createdAt: string;
}

export interface IBannersQuery {
  data:
    | {
        banners: IBanner[];
        status?: string;
      }
    | undefined;
  isLoading: boolean;
  error: unknown;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

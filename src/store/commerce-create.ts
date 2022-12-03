import { createSlice } from '@reduxjs/toolkit';

interface CommerceFormState {
  category: string;
  contact: {
    whatsapp: string;
    phone: string;
    email: string;
    instagram?: string;
    facebook?: string;
  };
  address: {
    city: string;
    complement: string;
    number: string;
    street: string;
    neighborhood: string;
    state: string;
    cep: string;
  };
  name: string;
}

const initialState: CommerceFormState = {} as CommerceFormState;

export const commerceFormSlice = createSlice({
  name: 'commerceForm',
  initialState,
  reducers: {
    handleChangeFormData(state, action) {
      const { name, category, contact, address } = action.payload;

      if (name) {
        state.name = name;
      }
      if (category) {
        state.category = category;
      }
      if (contact) {
        state.contact = contact;
      }
      if (address) {
        state.address = address;
      }
    }
  }
});

export const { handleChangeFormData } = commerceFormSlice.actions;

export default commerceFormSlice.reducer;

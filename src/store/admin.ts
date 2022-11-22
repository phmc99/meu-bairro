import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

interface AdminState {
  loading: boolean;
  token: string | null;
  error: string | undefined;
}

interface LoginProps {
  email: string;
  password: string;
}

const initialState: AdminState = {
  loading: false,
  token: null,
  error: ''
};

export const login = createAsyncThunk(
  'admin/login',
  ({ email, password }: LoginProps) => {
    return api
      .post('/auth/admin', {
        email,
        password
      })
      .then(res => res.data.token);
  }
);

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAuth(state) {
      state.token = null;
      localStorage.removeItem('admin-token');
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload;
      localStorage.setItem('admin-token', action.payload);
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.error.message;
    });
  }
});

export const { resetAuth } = adminSlice.actions;

export default adminSlice.reducer;

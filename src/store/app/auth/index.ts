import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

interface authState {
  loading: boolean;
  token: string | null;
  error: string | undefined;
}

interface LoginProps {
  email: string;
  password: string;
}

const initialState: authState = {
  loading: false,
  token: null,
  error: ''
};

export const signin = createAsyncThunk(
  'auth/signin',
  ({ email, password }: LoginProps) => {
    email = email.toLowerCase();
    return api
      .post('/auth/signin', {
        email,
        password
      })
      .then(res => res.data)
      .catch(({ response }) => {
        if (response.data.message) {
          return response.data;
        } else {
          return { message: 'Algo de errado aconteceu', status: 'error' };
        }
      });
  }
);

export const authSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    resetUserAuth(state) {
      state.token = null;
      localStorage.removeItem('@mb:user-token');
    }
  },
  extraReducers: builder => {
    builder.addCase(signin.pending, state => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      localStorage.setItem('@mb:user-token', action.payload.token);
    });
    builder.addCase(signin.rejected, (state, action) => {
      state.loading = false;
      state.token = null;
      state.error = action.error.message;
    });
  }
});

export const { resetUserAuth } = authSlice.actions;

export default authSlice.reducer;

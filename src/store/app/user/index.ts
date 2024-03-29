import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';
import { IUserResponse } from '../../../types';
import { decodeToken } from '../../../utils/jwt';

interface authState {
  loading: boolean;
  user: IUserResponse | null;
  error: string | undefined;
}

const initialState: authState = {
  loading: false,
  user: null,
  error: ''
};

export const getUserData = createAsyncThunk('user/getData', (token: string) => {
  const jwtDecode = decodeToken(token);

  if (!jwtDecode.isDecoded) {
    return { message: jwtDecode.message, status: 'error' };
  }

  if (jwtDecode.decoded) {
    const { id } = jwtDecode.decoded as { id: string };
    return api
      .get(`/user/${id}`)
      .then(res => res.data)
      .catch(({ response }) => {
        if (response.data.message) {
          return response.data;
        } else {
          return { message: 'Algo de errado aconteceu', status: 'error' };
        }
      });
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserData(state) {
      state.user = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(getUserData.pending, state => {
      state.loading = true;
      state.user = null;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message;
    });
  }
});

export const { resetUserData } = userSlice.actions;

export default userSlice.reducer;

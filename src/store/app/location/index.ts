import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserLocationState {
  loading: boolean;
  address: string | undefined;
  neighborhood: string | undefined;
  error: string | undefined;
}

interface getLocationProps {
  lat: number;
  lng: number;
}

const initialState: UserLocationState = {
  loading: false,
  address: undefined,
  neighborhood: undefined,
  error: ''
};

export const getLocation = createAsyncThunk(
  'location/getLocation',
  ({ lat, lng }: getLocationProps) => {
    const token = process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN;

    if (!lat && !lng) {
      return;
    }

    return axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat}, ${lng}&key=${token}`
      )
      .then(res => {
        return res.data;
      });
  }
);

export const locationSlicer = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLocation.pending, state => {
      state.loading = true;
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.results) {
        const address = action.payload.results[0].formatted_address;
        state.address = address;
        state.neighborhood = address.split(' - ')[1].split(',')[0];
      }
    });
    builder.addCase(getLocation.rejected, (state, action) => {
      state.loading = false;
      state.address = undefined;
      state.neighborhood = undefined;
      state.error = action.error.message;
    });
  }
});

export default locationSlicer.reducer;

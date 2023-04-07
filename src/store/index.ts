import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
  AnyAction
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { adminSlice } from './admin';
import { locationSlicer } from './app/location';
import { commerceSlice } from './commerce';
import { commerceFormSlice } from './commerce-create';
import { authSlice } from './app/auth';

const makeStore = () =>
  configureStore({
    reducer: {
      [adminSlice.name]: adminSlice.reducer,
      [commerceSlice.name]: commerceSlice.reducer,
      [commerceFormSlice.name]: commerceFormSlice.reducer,
      [locationSlicer.name]: locationSlicer.reducer,
      [authSlice.name]: authSlice.reducer
    },
    devTools: true
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = ThunkDispatch<AppState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);

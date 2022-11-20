import {
  configureStore,
  ThunkAction,
  Action,
  ThunkDispatch,
  AnyAction
} from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { adminSlice } from './admin';

const makeStore = () =>
  configureStore({
    reducer: {
      [adminSlice.name]: adminSlice.reducer
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

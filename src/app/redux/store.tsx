import { configureStore } from '@reduxjs/toolkit';

import users from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    users,
  },
  devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

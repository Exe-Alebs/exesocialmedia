import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from './redux';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';

const persistConfiig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfiig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export { store, persistStore };

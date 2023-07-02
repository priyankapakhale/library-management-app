import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './reducers/booksReducer';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, booksReducer)


export const store = configureStore({
    reducer: persistedReducer,
})

export const persistor = persistStore(store)
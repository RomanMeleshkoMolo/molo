import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer from './reducer';

// В whitelist кладем ключи верхнего уровня из initialState,
// которые хотим сохранять между перезапусками.
const persistConfig = {
  key: 'user', // ключ в AsyncStorage
  storage: AsyncStorage,
  whitelist: ['userData', 'regToken', 'userName'],
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export default store;

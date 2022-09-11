import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import initialState from './initialState';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
export default function getStore() {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(rootSaga);
  return store;
}

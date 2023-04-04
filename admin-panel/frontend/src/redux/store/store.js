import { configureStore } from '@reduxjs/toolkit'
import { slice } from './slice'
import createSagaMiddleware from 'redux-saga';
import invexSaga from '../saga/invexSaga';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: slice,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(invexSaga);

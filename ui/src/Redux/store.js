import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './redux'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducers,
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(sagas)

export default store;


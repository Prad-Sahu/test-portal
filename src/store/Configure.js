import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Sagas";
import rootReducer from "./Reducers";

/**
 * @method configureStore
 * @description It Create SAGA middle ware and apply it in the store with reducer.
 */
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const reducers = {
    rootReducer,
  };
  const reducer = combineReducers(reducers);
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;

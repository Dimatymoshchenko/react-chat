import { createStore, compose as simpleCompose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootReducer } from "./reducer";
import rootSaga from "./sagas";
import { composeWithDevTools } from "@redux-devtools/extension";

const isProd = process.env.NODE_ENV === "production";

export default function configureStore() {
  const compose = isProd ? simpleCompose : composeWithDevTools;

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    compose(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}

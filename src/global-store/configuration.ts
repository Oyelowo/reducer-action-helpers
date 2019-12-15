import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

export const configureReduxStore = () => {
  const middlewares = [thunk];

  const composeEnhancers = composeWithDevTools({});

  const middlewaresPlusDevTools = composeEnhancers(
    applyMiddleware(...middlewares)
  );

  const store = createStore(rootReducer, middlewaresPlusDevTools);
  return store;
};

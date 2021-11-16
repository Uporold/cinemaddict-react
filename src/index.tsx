import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AxiosInstance } from "axios";
import { Provider } from "react-redux";
import { App } from "./components/app/app";
import { createAPI } from "./api";
import { AllReduxActions, GlobalState, rootReducer } from "./store/reducer";
import { Operation } from "./store/auth/auth";

const api = createAPI();

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument(api) as ThunkMiddleware<
        GlobalState,
        AllReduxActions,
        AxiosInstance
      >,
    ),
  ),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      store.dispatch(Operation.logout());
    }

    return Promise.reject(error?.response ?? error);
  },
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

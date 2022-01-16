import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/app/app";
import { StoreProvider } from "./store";

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById("root"),
);

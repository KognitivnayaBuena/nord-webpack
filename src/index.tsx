import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./polyfills";

import store from "./redux/store";
import { App } from "./components/App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
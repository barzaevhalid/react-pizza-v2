import * as ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";
import { store } from "./store/store";

import { BrowserRouter } from "react-router-dom";

import "./index.css";
const Root = document.getElementById("root");
if (Root) {
  const root = ReactDOM.createRoot(Root);
  root.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
}

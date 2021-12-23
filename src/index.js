import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AuthContextProvider } from "./context/auth-context";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rantsReducer from "./rants-store/rants-store";

const rantsStore = createStore(rantsReducer);

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Provider store={rantsStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById("root")
);

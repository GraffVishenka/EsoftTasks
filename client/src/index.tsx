import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import Store from "./store/store";
import { createContext } from "react";

export const store = new Store();

export const Context = createContext({ store });

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Router>
    <Context.Provider value={{ store }}>
      <App />
    </Context.Provider>
  </Router>
);

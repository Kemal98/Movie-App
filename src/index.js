import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContexState from "./context/ContexState";
import 'semantic-ui-css/semantic.min.css'
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContexState>
      <App/>
    </ContexState>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename='/react=note-taking-ts'>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

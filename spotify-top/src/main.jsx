import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { SpotifyProvider } from "./context/SpotifyContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SpotifyProvider>
      <App />
    </SpotifyProvider>
  </React.StrictMode>
);

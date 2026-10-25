import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LearningProvider } from "./context/LearningContext.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LearningProvider>
      <App />
    </LearningProvider>
  </React.StrictMode>,
);

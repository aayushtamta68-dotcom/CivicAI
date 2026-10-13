import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        duration: 3000,

        style: {
          background: "#FEFEFE",
          color: "#222",
          border: "1px solid #E0E7D7",
          borderRadius: "12px",
        },

        success: {
          style: {
            border: "1px solid #B7C396",
          },
        },

        error: {
          style: {
            border: "1px solid #BA9A91",
          },
        },
      }}
    />
  </StrictMode>
);
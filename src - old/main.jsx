import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Enable Routing by encapsulating the App component with the Router component */}
    <Router>
      <App />
    </Router>
  </StrictMode>
);

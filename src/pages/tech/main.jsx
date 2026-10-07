import React from "react";
import TechRoutes from "./index.jsx";
import "./styles/globals/index.css";

// Mounted by the main app's router under /tech/*, so it no longer creates
// its own BrowserRouter (React Router doesn't allow one inside another).
export default function TechApp() {
  return <TechRoutes />;
}

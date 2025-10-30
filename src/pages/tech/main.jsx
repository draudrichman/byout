import React from "react";
import { BrowserRouter } from "react-router-dom";
import TechRoutes from "./index.jsx";
import "./styles/globals/index.css";

// 将独立入口改为可复用组件，供主应用在 /tech 下挂载
export default function TechApp() {
  return (
    <BrowserRouter>
      <TechRoutes />
    </BrowserRouter>
  );
}

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/app/styles/index.css'
import App from './App.jsx'
import './app/auth/amplify-config.js';

import ReactDOM from "react-dom/client";

import {
  DashboardProvider,
} from "./context/DashboardContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <DashboardProvider>

    <App />

  </DashboardProvider>
);

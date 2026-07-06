import { StrictMode }
from "react";

import ReactDOM
from "react-dom/client";

import "leaflet/dist/leaflet.css";

import App
from "./App.jsx";

import "../src/app/styles/index.css";

import { Amplify }
from "aws-amplify";

import { TelemetryProvider } from "./context/TelemetryContext.jsx";

import amplifyConfig
from "./app/auth/amplify-config.js";

Amplify.configure(
  amplifyConfig
);

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <TelemetryProvider>

    <App />

  </TelemetryProvider>
);
import { StrictMode } from "react";

import ReactDOM from "react-dom/client";

import "leaflet/dist/leaflet.css";

import App from "./App.jsx";

import "../src/app/styles/index.css";

import { Amplify } from "aws-amplify";

import { TelemetryProvider } from "./context/TelemetryContext.jsx";

import amplifyConfig from "./app/auth/amplify-config.js";

import { Toaster } from "react-hot-toast";
import { SubscriptionWarningProvider } from "./context/SubscriptionWarningContext.jsx";
import { AnalyticsProvider } from "./context/AnalyticsContext.jsx";

Amplify.configure(amplifyConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  
  <SubscriptionWarningProvider>
    <AnalyticsProvider>
      <TelemetryProvider>
      <App />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
      />
    </TelemetryProvider>
    </AnalyticsProvider>
  </SubscriptionWarningProvider>
  
);

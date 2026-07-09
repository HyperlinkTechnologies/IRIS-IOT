import { createContext, useContext, useEffect, useState } from "react";

import telemetryStore from "../app/core/telemetry/telemetryStore";

import telemetrySimulator from "../app/core/telemetry/telemetrySimulator";

import mqttClient from "../app/core/mqtt/mqttClient";
import { MQTT_TOPICS } from "../app/core/mqtt/mqttTopics";

const TelemetryContext = createContext();

export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState(telemetryStore.getAll());

  useEffect(() => {
    // Listen to telemetryStore
    const unsubscribe = telemetryStore.subscribe(setTelemetry);

    // Connect MQTT
    mqttClient.connect(import.meta.env.VITE_MQTT_BROKER_URL);

    // Subscribe to telemetry
    mqttClient.subscribe(MQTT_TOPICS.TELEMETRY);

    const devices = JSON.parse(localStorage.getItem("iris_devices")) || [];

    return () => {
      unsubscribe();

      mqttClient.disconnect();
    };
  }, []);

  return (
    <TelemetryContext.Provider
      value={{
        telemetry,
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
}

export function useTelemetry() {
  return useContext(TelemetryContext).telemetry;
}

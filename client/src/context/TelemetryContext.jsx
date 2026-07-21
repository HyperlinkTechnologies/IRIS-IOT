import { createContext, useContext, useEffect, useState } from "react";

import telemetryStore from "../app/core/telemetry/telemetryStore";
import { io } from "socket.io-client";
const TelemetryContext = createContext();

export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState(telemetryStore.getAll());

  useEffect(() => {
  const unsubscribe = telemetryStore.subscribe(setTelemetry);

  const socket = io("http://localhost:4000");

  socket.on("connect", () => {
    console.log("✅ Connected to Backend");
  });

  socket.on("telemetry", (data) => {

  console.log("📡 Live Telemetry:", data);

  telemetryStore.update(data.deviceId, data);

});

  return () => {
    unsubscribe();

    socket.disconnect();
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

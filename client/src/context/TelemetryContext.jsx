import { createContext, useContext, useEffect, useState } from "react";
import { useSubscriptionWarning } from "./SubscriptionWarningContext";
import telemetryStore from "../app/core/telemetry/telemetryStore";
import { io } from "socket.io-client";
const TelemetryContext = createContext();

export function TelemetryProvider({ children }) {
  const [telemetry, setTelemetry] = useState(telemetryStore.getAll());
  const {
  setWarning,
  clearWarning,
} = useSubscriptionWarning();

  useEffect(() => {
  const unsubscribe = telemetryStore.subscribe(setTelemetry);

  const socket = io(
  new URL(
    import.meta.env.VITE_API_URL || "http://localhost:4000/api"
  ).origin
);

  socket.on("connect", () => {
    console.log("✅ Connected to Backend");
  });

  socket.on("telemetry", (data) => {

  telemetryStore.update(data.deviceId, data);

});
socket.on("subscription-limit", (data) => {

  setWarning(data);

});
socket.on("subscription-restored", () => {

  clearWarning();

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

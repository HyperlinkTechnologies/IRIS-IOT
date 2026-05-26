import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { io }
from "socket.io-client";

const TelemetryContext =
  createContext();

export function
TelemetryProvider({
  children,
}) {

  const [devices,
    setDevices] =
      useState({});

  useEffect(() => {

    const socket =
      io(
        "http://localhost:4000"
      );

    socket.on(
      "telemetry",
      (data) => {

        setDevices(
          prev => ({

            ...prev,

            [data.deviceId]:
              {
                ...data,
                lastSeen:
                  Date.now(),
              },
          })
        );
      }
    );

    return () => {

      socket.disconnect();
    };

  }, []);

  return (

    <TelemetryContext.Provider
      value={devices}
    >

      {children}

    </TelemetryContext.Provider>
  );
}

export function
useTelemetry() {

  return useContext(
    TelemetryContext
  );
}
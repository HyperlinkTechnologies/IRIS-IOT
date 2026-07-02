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
const TelemetryHistoryContext =
  createContext({});

const MAX_HISTORY_POINTS = 500;

function readCoordinates(data) {
  const lat = Number(
    data?.lat ??
    data?.latitude ??
    data?.gps?.lat ??
    data?.gps?.latitude ??
    data?.location?.lat ??
    data?.location?.latitude
  );
  const lng = Number(
    data?.lng ??
    data?.lon ??
    data?.longitude ??
    data?.gps?.lng ??
    data?.gps?.lon ??
    data?.gps?.longitude ??
    data?.location?.lng ??
    data?.location?.lon ??
    data?.location?.longitude
  );

  if (
    !Number.isFinite(lat) ||
    lat < -90 ||
    lat > 90 ||
    !Number.isFinite(lng) ||
    lng < -180 ||
    lng > 180
  ) {
    return null;
  }

  return { lat, lng };
}

export function
TelemetryProvider({
  children,
}) {

  const [devices,
    setDevices] =
      useState({});
  const [history, setHistory] =
    useState({});

  useEffect(() => {

    const socket =
      io(
        "http://localhost:4000"
      );

    socket.on(
      "telemetry",
      (data) => {

        if (!data?.deviceId) {
          return;
        }

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

        const coordinates = readCoordinates(data);

        if (coordinates) {
          setHistory((previous) => {
            const deviceHistory = previous[data.deviceId] || [];
            const lastPoint = deviceHistory[deviceHistory.length - 1];

            if (
              lastPoint?.lat === coordinates.lat &&
              lastPoint?.lng === coordinates.lng
            ) {
              return previous;
            }

            return {
              ...previous,
              [data.deviceId]: [
                ...deviceHistory,
                {
                  ...coordinates,
                  timestamp: Date.now(),
                },
              ].slice(-MAX_HISTORY_POINTS),
            };
          });
        }
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
      <TelemetryHistoryContext.Provider value={history}>
        {children}
      </TelemetryHistoryContext.Provider>

    </TelemetryContext.Provider>
  );
}

export function
useTelemetry() {

  return useContext(
    TelemetryContext
  );
}

export function useTelemetryHistory() {
  return useContext(TelemetryHistoryContext);
}

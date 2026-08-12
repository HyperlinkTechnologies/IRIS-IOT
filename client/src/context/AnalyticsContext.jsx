import { createContext, useContext, useState } from "react";

const AnalyticsContext = createContext();

export function AnalyticsProvider({ children }) {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [telemetryKey, setTelemetryKey] = useState("");
  const [timeRange, setTimeRange] = useState("");

  const [chartData, setChartData] = useState([]);

  const [stats, setStats] = useState({
    latest: "--",
    min: "--",
    max: "--",
    average: "--",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  return (
    <AnalyticsContext.Provider
      value={{
        selectedDevice,
        setSelectedDevice,

        telemetryKey,
        setTelemetryKey,

        timeRange,
        setTimeRange,

        chartData,
        setChartData,

        stats,
        setStats,

        loading,
        setLoading,

        error,
        setError,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
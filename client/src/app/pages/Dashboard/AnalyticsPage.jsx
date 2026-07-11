import { useEffect, useState } from "react";

import deviceRegistry from "../../core/devices/deviceRegistry";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import telemetryHistory from "../../core/telemetry/telemetryHistory";
import TelemetryChart from "../../components/Dashboard/TelemetryChart";

export default function AnalyticsPage() {
  const [devices, setDevices] = useState(deviceRegistry.getAll());

  const [selectedDevice, setSelectedDevice] = useState("");

  const [telemetryKey, setTelemetryKey] = useState("");

  const [timeRange, setTimeRange] = useState("30m");

  const [chartData, setChartData] = useState([]);

  const [stats, setStats] = useState({
    latest: "--",

    min: "--",

    max: "--",

    average: "--",
  });

  useEffect(() => {
    const unsubscribe = deviceRegistry.subscribe(setDevices);

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!selectedDevice || !telemetryKey) {
      setChartData([]);

      return;
    }

    const interval = setInterval(() => {
      const series = telemetryHistory.getSeries(selectedDevice, telemetryKey,timeRange);

      const formatted = series.map((item) => ({
        time: new Date(item.timestamp).toLocaleTimeString(),

        value: item.value,
      }));

      setChartData(formatted);

      if (formatted.length > 0) {
        const values = formatted.map((item) => Number(item.value));

        setStats({
          latest: values[values.length - 1],

          min: Math.min(...values),

          max: Math.max(...values),

          average: (values.reduce((a, b) => a + b, 0) / values.length).toFixed(
            2,
          ),
        });
      } else {
        setStats({
          latest: "--",

          min: "--",

          max: "--",

          average: "--",
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedDevice, telemetryKey,timeRange]);

  return (
    <div className="w-full">
      {/* Header */}

      <div className="mb-8">
        <h2
          className="
            text-3xl
            font-bold
          "
        >
          Analytics
        </h2>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Monitor historical telemetry and device insights
        </p>
      </div>

      <div
        className="
    bg-black/5
    border
    border-black/10
    rounded-3xl
    p-6
    mb-8
  "
      >
        <div
          className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-5
    "
        >
          {/* Device */}

          <div>
            <label
              className="
          block
          mb-2
          font-medium
        "
            >
              Device
            </label>

            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="
          w-full
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
        "
            >
              <option value="">Select Device</option>

              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>

          {/* Telemetry */}

          <div>
            <label
              className="
          block
          mb-2
          font-medium
        "
            >
              Telemetry Key
            </label>

            <input
              type="text"
              placeholder="temperature"
              value={telemetryKey}
              onChange={(e) => setTelemetryKey(e.target.value)}
              className="
          w-full
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
        "
            />
          </div>

          {/* Time Range */}

          <div>
            <label
              className="
          block
          mb-2
          font-medium
        "
            >
              Time Range
            </label>

            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="
          w-full
          border
          border-gray-300
          rounded-xl
          px-4
          py-3
        "
            >
              <option value="5m">Last 5 Minutes</option>

              <option value="30m">Last 30 Minutes</option>

              <option value="1h">Last Hour</option>

              <option value="24h">Last 24 Hours</option>
            </select>
          </div>
        </div>
      </div>

      <div
        className="
    bg-black/5
    border
    border-black/10
    rounded-3xl
    p-6
    mb-8
  "
      >
        <div className="mb-4">
          <h3
            className="
        text-xl
        font-bold
      "
          >
            Historical Telemetry
          </h3>

          <p
            className="
        text-gray-500
        mt-1
      "
          >
            Historical visualization of the selected telemetry.
          </p>
        </div>

        <div
          className="
            h-96
            rounded-2xl
            border-2
            border-dashed
            border-gray-300
            flex
            items-center
            justify-center
            text-gray-400
            "
        >
          <TelemetryChart data={chartData} />
        </div>
      </div>

      <div
        className="
    grid
    grid-cols-2
    lg:grid-cols-4
    gap-5
  "
      >
        <DashboardCard title="Latest" value={stats.latest} />

        <DashboardCard title="Minimum" value={stats.min} />

        <DashboardCard title="Maximum" value={stats.max} />

        <DashboardCard title="Average" value={stats.average} />
      </div>
    </div>
  );
}

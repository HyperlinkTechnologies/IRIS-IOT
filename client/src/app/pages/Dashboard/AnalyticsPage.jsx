import { useEffect, useState, useCallback } from "react";

import deviceRegistry from "../../core/devices/deviceRegistry";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { getTelemetryHistory } from "../../services/history.service";
import TelemetryChart from "../../components/Analytics/TelemetryChart";
import { exportTelemetry } from "../../services/history.service";
import { DownloadIcon } from "lucide-react";
import { useAnalytics } from "../../../context/AnalyticsContext";

export default function AnalyticsPage() {
  const [devices, setDevices] = useState(deviceRegistry.getAll());

  const {
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
  } = useAnalytics();

  useEffect(() => {
    const unsubscribe = deviceRegistry.subscribe(setDevices);

    return unsubscribe;
  }, []);

  

  useEffect(() => {
    async function loadHistory() {
      if (!selectedDevice || !telemetryKey || !timeRange) {
        setChartData([]);
        return;
      }

      setLoading(true);
setError("");

try {
    const history = await getTelemetryHistory(selectedDevice, timeRange);

    let filtered = history
    .filter(item => item[telemetryKey] !== undefined)
    .map(item => ({
        time: new Date(item.timestamp).getTime(),
        value: Number(item[telemetryKey]),
    }));

if (timeRange === "7d" || timeRange === "30d") {

    const days = timeRange === "7d" ? 7 : 30;

    const start = new Date();
    start.setDate(start.getDate() - (days - 1));
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    filtered = filtered.filter(item => {
        const t = new Date(item.time);
        return t >= start && t <= end;
    });

}

filtered.sort(
    (a, b) => a.time - b.time
);
    setChartData(filtered);

    if (!filtered.length) {
        setStats({
            latest: "--",
            min: "--",
            max: "--",
            average: "--",
        });

        return;
    }

    const values = filtered
    .filter(item => item.value !== null)
    .map(item => item.value);

      setStats({
        latest: values.length ? values.at(-1) : "--",
        min: values.length ? Math.min(...values) : "--",

        max: values.length ? Math.max(...values) : "--",

        average: values.length
          ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : "--",
      });

}
catch (err) {
    console.error(err);
    setError("Failed to load telemetry.");
}
finally {
    setLoading(false);
}
    }

    loadHistory();
  }, [selectedDevice, telemetryKey, timeRange]);

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
              <option value="">Select Time Range</option>
              <option value="5m">Last 5 Minutes</option>

              <option value="30m">Last 30 Minutes</option>

              <option value="1h">Last Hour</option>

              <option value="24h">Last 24 Hours</option>

              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
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
        <div className="flex justify-between">
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
          <div className="">
            <button
              onClick={() => exportTelemetry(selectedDevice, timeRange)}
              className="px-4  py-3 bg-orange-500 text-white rounded-xl hover:text-orange-500 hover:bg-white hover:border-orange-400 border-2 transition-all cursor-pointer flex gap-2.5" 
            >
              <DownloadIcon/> Export CSV
            </button>
          </div>
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
          {loading ? (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p>Loading telemetry...</p>
  </div>
) : error ? (
  <div className="flex flex-col items-center justify-center h-full text-red-500">
    <p>{error}</p>
  </div>
) : chartData.length === 0 ? (
  <div className="flex flex-col items-center justify-center h-full text-gray-500">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-14 h-14 mb-4 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 17l6-6 4 4 8-8"
      />
    </svg>

    <h3 className="text-lg font-semibold">
      No telemetry available
    </h3>

    <p className="text-sm text-gray-400 mt-2">
      No telemetry was available for the selected input.
    </p>
  </div>
) : (
  <TelemetryChart
    data={chartData}
    timeRange={timeRange}
/>
)}
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

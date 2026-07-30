import { useEffect, useState } from "react";

import deviceRegistry from "../../core/devices/deviceRegistry";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { getTelemetryHistory } from "../../services/history.service";
import TelemetryChart from "../../components/Analytics/TelemetryChart";
import { exportTelemetry } from "../../services/history.service";
import { DownloadIcon } from "lucide-react";

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
    async function loadHistory() {
      if (!selectedDevice || !telemetryKey) {
        setChartData([]);
        return;
      }

      try {
        const history = await getTelemetryHistory(selectedDevice, timeRange);

        const filtered = history
          .filter((item) => item[telemetryKey] !== undefined)
          .map((item) => ({
            time: item.timestamp,
            value: Number(item[telemetryKey]),
          }));

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

        if (filtered.length) {
          const values = filtered.map((item) => item.value);

          setStats({
            latest: values.at(-1),
            min: Math.min(...values),
            max: Math.max(...values),
            average: (
              values.reduce((a, b) => a + b, 0) / values.length
            ).toFixed(2),
          });
        }
      } catch (err) {
        console.error(err);
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

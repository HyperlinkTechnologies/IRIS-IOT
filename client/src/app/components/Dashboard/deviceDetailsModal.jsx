import useTelemetry from "../../hooks/useTelemetry";
import Modal from "./Modal";
import InfoRow from "./InfoRow";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function DeviceDetailsModal({ selectedDevice, onClose }) {
  const telemetry = useTelemetry(selectedDevice.deviceId);

console.log({
  online: telemetry?.online,
  lastUpdated: telemetry?.lastUpdated,
  uptime: telemetry?.telemetry?.uptime,
  rssi: telemetry?.telemetry?.rssi,
});

  const [copied, setCopied] = useState(false);

  const copyApiKey = async () => {
  await navigator.clipboard.writeText(selectedDevice.apiKey);

  setCopied(true);

  setTimeout(() => setCopied(false), 2000);
};

  const formatUptime = (seconds = 0) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
  };

  function formatLastSeen(lastUpdated) {
    if (!lastUpdated) return "--";

    const diff = Math.floor((Date.now() - lastUpdated) / 1000);

    if (diff < 5) return "Just now";

    if (diff < 60) return `${diff} seconds ago`;

    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;

    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;

    return `${Math.floor(diff / 86400)} days ago`;
  }

  function getSignal(rssi) {
    if (rssi >= -50)
      return {
        text: "Excellent",
        color: "text-green-500",
      };

    if (rssi >= -65)
      return {
        text: "Good",
        color: "text-yellow-500",
      };

    if (rssi >= -75)
      return {
        text: "Fair",
        color: "text-orange-500",
      };

    return {
      text: "Poor",
      color: "text-red-500",
    };
  }

  function formatLabel(key) {
    return key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
  }

  function formatValue(key, value) {
    if (typeof value === "boolean") {
      return value ? "ON" : "OFF";
    }

    switch (key) {
      case "temperature":
        return `${value} °C`;

      case "humidity":
        return `${value} %`;

      default:
        return value;
    }
  }

 const signal = getSignal(telemetry?.telemetry?.rssi ?? -100);

  return (
    <Modal title="Device Details" onClose={onClose}>
      <div className="space-y-4">
        <InfoRow label="Device ID" value={selectedDevice.deviceId} copyable/>
        <InfoRow label="API Key" value={selectedDevice.apiKey} copyable/>
        <InfoRow label="Firmware" value={selectedDevice.firmware} />
        <InfoRow label="Created At" value={new Date(selectedDevice.createdAt).toLocaleString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                          })} />

        <h4 className="font-bold mt-6">Device Health</h4>

        <InfoRow
          label="Status"
          value={telemetry?.online ? "🟢 Online" : "🔴 Offline"}
        />

        <div className="flex items-center justify-between border-b border-black/5 pb-3">
          <p className="font-medium">Signal Strength</p>

          <p className={signal.color}>{signal.text}</p>
        </div>

        <InfoRow
          label="Last Seen"
          value={formatLastSeen(telemetry?.lastUpdated)}
        />

        <InfoRow
  label="Uptime"
  value={formatUptime(telemetry?.telemetry?.uptime ?? 0)}
/>

        <h4 className="font-bold mt-6">Live Telemetry</h4>

        {Object.entries(telemetry?.telemetry || {})
  .filter(([key]) => !["deviceId","rssi",
      "uptime",].includes(key))
  .map(([key, value]) => (
    <InfoRow
      key={key}
      label={formatLabel(key)}
      value={formatValue(key, value)}
    />
  ))}
      </div>
    </Modal>
  );
}

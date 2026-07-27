import { Popup } from "react-leaflet";
import { MapPin, Clock3 } from "lucide-react";
import { useEffect,useState } from "react";

function Row({ label, value }) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return (
    <div className="flex justify-between gap-4">
      <span className="font-medium text-gray-600">{label}</span>

      <span className="text-gray-900">{value}</span>
    </div>
  );
}

function formatLastSeen(timestamp) {

    if (!timestamp) return "--";

    const seconds = Math.floor(
        (Date.now() - timestamp) / 1000
    );

    if (seconds < 5)
        return "Just now";

    if (seconds < 60)
        return `${seconds} sec ago`;

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60)
        return `${minutes} min${minutes > 1 ? "s" : ""} ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24)
        return `${hours} hr${hours > 1 ? "s" : ""} ago`;

    const days = Math.floor(hours / 24);

    return `${days} day${days > 1 ? "s" : ""} ago`;
}

export default function DevicePopup({ device }) {

  const [, forceUpdate] = useState(0);

useEffect(() => {

    const interval = setInterval(() => {

        forceUpdate(v => v + 1);

    }, 1000);

    return () => clearInterval(interval);

}, []);
  return (
    <Popup minWidth={260}>
      <div className="space-y-3 text-sm">
        <div className="flex items-start justify-between border-b pb-3">
          <div>
            <h3 className="text-base font-bold">
              {device.name || "Unnamed Device"}
            </h3>

            <p className="text-xs text-gray-500">{device.deviceId}</p>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
              device.status === "online"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-current" />
            {device.status === "online" ? "Online" : "Offline"}
          </div>
        </div>

        {/* <hr className="border-gray-200" /> */}

        <Row label="Latitude" value={device.lat?.toFixed?.(6)} />

        <Row label="Longitude" value={device.lng?.toFixed?.(6)} />

        <Row
    label="Last Updated"
    value={formatLastSeen(device.lastSeen)}
/>
      </div>
    </Popup>
  );
}

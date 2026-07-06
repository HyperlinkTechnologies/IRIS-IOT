import { Popup } from "react-leaflet";

export default function DevicePopup({ device }) {
  return (
    <Popup>
      <div className="space-y-1 text-sm">
        <h3 className="text-base font-bold">
          {device.name || "Unnamed device"}
        </h3>

        <p>
          <strong>Device ID:</strong>{" "}
          {device.deviceId || "Not available"}
        </p>

        <p>
          <strong>Latitude:</strong> {device.lat}
        </p>

        <p>
          <strong>Longitude:</strong> {device.lng}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span
            className={
              device.status === "online"
                ? "text-green-600"
                : "text-gray-500"
            }
          >
            {device.status || "unknown"}
          </span>
        </p>

        {device.positionSource && (
          <p>
            <strong>Position:</strong> {device.positionSource}
          </p>
        )}

        {device.lastSeen && (
          <p>
            <strong>Last update:</strong>{" "}
            {Number.isNaN(new Date(device.lastSeen).getTime())
              ? device.lastSeen
              : new Date(device.lastSeen).toLocaleString()}
          </p>
        )}
      </div>
    </Popup>
  );
}

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Circle,
  useMap,
} from "react-leaflet";

import DeviceMarker from "./DeviceMarker";
import ClusteredDeviceMarkers from "./ClusteredDeviceMarkers";

const DEFAULT_CENTER = [12.9716, 77.5946];
const DEFAULT_ZOOM = 13;

function MapController({ center, zoom, devices, autoFit }) {
  const map = useMap();

  useEffect(() => {
    if (autoFit && devices.length > 1) {
      map.fitBounds(
        devices.map((device) => [device.lat, device.lng]),
        { padding: [30, 30], maxZoom: zoom }
      );
      return;
    }

    map.setView(center, zoom);
  }, [autoFit, center, devices, map, zoom]);

  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => map.invalidateSize());

    observer.observe(container);
    map.invalidateSize();

    return () => observer.disconnect();
  }, [map]);

  return null;
}

function hasValidCoordinates(device) {
  const latitude = Number(device?.lat);
  const longitude = Number(device?.lng);

  return (
    Number.isFinite(latitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    Number.isFinite(longitude) &&
    longitude >= -180 &&
    longitude <= 180
  );
}

export default function FleetMap({
  devices = [],
  center,
  zoom = DEFAULT_ZOOM,
  className = "",
  emptyMessage = "No devices with valid coordinates.",
  cluster = false,
  showFilters = false,
  autoFit = false,
  routes = [],
  geofences = [],
}) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const mappedDevices = useMemo(
    () =>
      devices
        .filter(hasValidCoordinates)
        .map((device) => ({
          ...device,
          lat: Number(device.lat),
          lng: Number(device.lng),
        })),
    [devices]
  );

  const visibleDevices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return mappedDevices.filter((device) => {
      const matchesStatus =
        status === "all" ||
        String(device.status).toLowerCase() === status;
      const matchesSearch =
        !query ||
        String(device.name || "").toLowerCase().includes(query) ||
        String(device.deviceId || "").toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [mappedDevices, search, status]);

  const mapCenter = useMemo(() => {
    if (
      Array.isArray(center) &&
      center.length === 2 &&
      hasValidCoordinates({ lat: center[0], lng: center[1] })
    ) {
      return [Number(center[0]), Number(center[1])];
    }

    if (visibleDevices.length > 0) {
      return [visibleDevices[0].lat, visibleDevices[0].lng];
    }

    return DEFAULT_CENTER;
  }, [center, visibleDevices]);

  const mapZoom = Math.min(19, Math.max(2, Number(zoom) || DEFAULT_ZOOM));

  if (mappedDevices.length === 0) {
    return (
      <div
        className={`flex min-h-40 items-center justify-center rounded-xl bg-gray-50 text-sm text-gray-500 ${className}`}
      >
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-40 overflow-hidden rounded-xl ${className}`}
    >
      {showFilters && (
        <div className="absolute left-12 right-3 top-3 z-1000 flex gap-2">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search devices"
            className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm shadow-md outline-none"
          />
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-sm shadow-md outline-none"
          >
            <option value="all">All</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>
      )}

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {routes.map((route, index) =>
          route.positions?.length > 1 ? (
            <Polyline
              key={route.id ?? index}
              positions={route.positions}
              pathOptions={{
                color: route.color || "#ff5700",
                weight: 4,
                opacity: 0.8,
              }}
            />
          ) : null
        )}

        {geofences.map((geofence, index) => (
          <Circle
            key={geofence.id ?? index}
            center={geofence.center}
            radius={geofence.radius}
            pathOptions={{
              color: geofence.violated ? "#dc2626" : "#16a34a",
              fillColor: geofence.violated ? "#ef4444" : "#22c55e",
              fillOpacity: 0.12,
              weight: 2,
            }}
          />
        ))}

        {cluster ? (
          <ClusteredDeviceMarkers devices={visibleDevices} />
        ) : (
          visibleDevices.map((device, index) => (
            <DeviceMarker
              key={device.id ?? device.deviceId ?? index}
              device={device}
            />
          ))
        )}

        <MapController
          center={mapCenter}
          zoom={mapZoom}
          devices={visibleDevices}
          autoFit={autoFit}
        />
      </MapContainer>

      {showFilters && visibleDevices.length === 0 && (
        <div className="pointer-events-none absolute inset-x-3 bottom-3 z-1000 rounded-lg bg-white/95 p-3 text-center text-sm text-gray-500 shadow">
          No devices match these filters.
        </div>
      )}
    </div>
  );
}

import { useMemo } from "react";

import FleetMap from "../../../FleetMap/FleetMap";
import telemetryHistory from "../../../../core/telemetry/telemetryHistory";

function readGpsCoordinates(telemetry) {
  const latitude =
    telemetry?.lat ??
    telemetry?.latitude ??
    telemetry?.gps?.lat ??
    telemetry?.gps?.latitude ??
    telemetry?.location?.lat ??
    telemetry?.location?.latitude;
  const longitude =
    telemetry?.lng ??
    telemetry?.lon ??
    telemetry?.longitude ??
    telemetry?.gps?.lng ??
    telemetry?.gps?.lon ??
    telemetry?.gps?.longitude ??
    telemetry?.location?.lng ??
    telemetry?.location?.lon ??
    telemetry?.location?.longitude;
  const lat = Number(latitude);
  const lng = Number(longitude);

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

function distanceInMeters(first, second) {
  const earthRadius = 6371000;
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const latDelta = toRadians(second.lat - first.lat);
  const lngDelta = toRadians(second.lng - first.lng);
  const firstLat = toRadians(first.lat);
  const secondLat = toRadians(second.lat);
  const value =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(firstLat) *
      Math.cos(secondLat) *
      Math.sin(lngDelta / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
}

export default function MapWidget({
  widget,
  telemetry,
  telemetryDevices = {},
}) {
  const device = useMemo(() => {
    try {
      const devices =
        JSON.parse(localStorage.getItem("iris_devices")) || [];

      return devices.find(
        (item) => String(item.id) === String(widget.deviceId)
      );
    } catch {
      return null;
    }
  }, [widget.deviceId]);

  const liveCoordinates =
  readGpsCoordinates(telemetry?.telemetry);
  const coordinates = liveCoordinates;

  const mappedDevice = {
  ...(device || {}),
  ...(telemetry?.telemetry || {}),

  name:
    device?.name ||
    widget.title ||
    "Device",

  deviceId:
    device?.deviceId ||
    widget.deviceId ||
    "Not selected",

  status:
    telemetry?.online
      ? "online"
      : "offline",

  lastSeen:
    telemetry?.lastSeen,

  lat: coordinates?.lat,
lng: coordinates?.lng,

  positionSource:
    liveCoordinates
      ? "Live GPS"
      : "Configured fallback",
};
  const isFleetMode = widget.mapMode === "fleet";
  const fleetDevices = isFleetMode
    ? Object.values(telemetryDevices).map((item) => {
        const coordinates = readGpsCoordinates(item);
        const savedDevice = (() => {
          try {
            const devices =
              JSON.parse(localStorage.getItem("iris_devices")) || [];
            return devices.find(
              (entry) => entry.deviceId === item.deviceId
            );
          } catch {
            return null;
          }
        })();

        return {
          ...(savedDevice || {}),
          ...item,
          name: savedDevice?.name || item.deviceId || "Device",
          status: item.online ? "online" : "offline",

lastSeen: item.lastSeen,
          lat: coordinates?.lat,
          lng: coordinates?.lng,
          positionSource: "Live GPS",
        };
      })
    : [mappedDevice];
  const routeDevices = isFleetMode
    ? fleetDevices
    : [mappedDevice];
  const routes = widget.showRouteHistory
  ? routeDevices.map((item) => ({
      id: item.deviceId,
      positions: telemetryHistory
        .get(item.deviceId)
        .map((point) => {
          const coordinates = readGpsCoordinates(point);

          return coordinates
            ? [coordinates.lat, coordinates.lng]
            : null;
        })
        .filter(Boolean),
    }))
  : [];
  const geofenceRadius = Math.max(25, Number(widget.geofenceRadius) || 500);
  
  
  

  return (
    <div className="relative h-full w-full">
      
      
      <FleetMap
        devices={fleetDevices}
        center={
  !isFleetMode &&
  coordinates
    ? [
        coordinates.lat,
        coordinates.lng,
      ]
    : undefined
}
        zoom={widget.zoom}
        className="h-full w-full"
        emptyMessage="Add valid coordinates in widget settings."
        cluster={isFleetMode}
        showFilters={isFleetMode}
        autoFit={isFleetMode}
        routes={routes}
      />
    </div>
  );
}



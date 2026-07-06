import { useMemo } from "react";

import FleetMap from "../../../FleetMap/FleetMap";

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
  telemetryHistory = {},
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

  const liveCoordinates = readGpsCoordinates(telemetry);
  const lat = liveCoordinates?.lat ?? widget.latitude;
  const lng = liveCoordinates?.lng ?? widget.longitude;

  const mappedDevice = {
    ...(device || {}),
    ...(telemetry || {}),
    name: device?.name || widget.title || "Device",
    deviceId: device?.deviceId || widget.deviceId || "Not selected",
    status: telemetry ? "online" : device?.status || "unknown",
    lat,
    lng,
    positionSource: liveCoordinates ? "Live GPS" : "Configured fallback",
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
          status: "online",
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
        positions: (telemetryHistory[item.deviceId] || []).map((point) => [
          point.lat,
          point.lng,
        ]),
      }))
    : [];
  const geofenceCenter = {
    lat: Number(widget.latitude),
    lng: Number(widget.longitude),
  };
  const geofenceRadius = Math.max(25, Number(widget.geofenceRadius) || 500);
  const hasGeofenceCenter =
    Number.isFinite(geofenceCenter.lat) &&
    Number.isFinite(geofenceCenter.lng);
  const violatingDevices =
    widget.geofenceEnabled && hasGeofenceCenter
      ? fleetDevices.filter(
          (item) =>
            Number.isFinite(Number(item.lat)) &&
            Number.isFinite(Number(item.lng)) &&
            distanceInMeters(geofenceCenter, {
              lat: Number(item.lat),
              lng: Number(item.lng),
            }) > geofenceRadius
        )
      : [];
  const geofences =
    widget.geofenceEnabled && hasGeofenceCenter
      ? [
          {
            id: "widget-geofence",
            center: [geofenceCenter.lat, geofenceCenter.lng],
            radius: geofenceRadius,
            violated: violatingDevices.length > 0,
          },
        ]
      : [];

  return (
    <div className="relative h-full w-full">
      <FleetMap
        devices={fleetDevices}
        center={isFleetMode ? undefined : [lat, lng]}
        zoom={widget.zoom}
        className="h-full w-full"
        emptyMessage="Add valid coordinates in widget settings."
        cluster={isFleetMode}
        showFilters={isFleetMode}
        autoFit={isFleetMode}
        routes={routes}
        geofences={geofences}
      />

      {violatingDevices.length > 0 && (
        <div className="absolute bottom-3 left-3 right-3 z-1000 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white shadow-lg">
          Geofence alert: {violatingDevices.length} device
          {violatingDevices.length === 1 ? "" : "s"} outside the zone
        </div>
      )}
    </div>
  );
}



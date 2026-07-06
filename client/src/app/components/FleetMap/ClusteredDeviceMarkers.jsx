import { useEffect } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import { useMap } from "react-leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

const markerIcon = new L.Icon({
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function addRow(container, label, value) {
  const row = document.createElement("p");
  const strong = document.createElement("strong");

  strong.textContent = `${label}: `;
  row.append(strong, document.createTextNode(String(value)));
  container.append(row);
}

function createPopup(device) {
  const container = document.createElement("div");
  const title = document.createElement("h3");

  container.className = "space-y-1 text-sm";
  title.className = "text-base font-bold";
  title.textContent = device.name || "Unnamed device";
  container.append(title);

  addRow(container, "Device ID", device.deviceId || "Not available");
  addRow(container, "Latitude", device.lat);
  addRow(container, "Longitude", device.lng);
  addRow(container, "Status", device.status || "unknown");

  if (device.positionSource) {
    addRow(container, "Position", device.positionSource);
  }

  if (device.lastSeen) {
    const timestamp = new Date(device.lastSeen);
    addRow(
      container,
      "Last update",
      Number.isNaN(timestamp.getTime())
        ? device.lastSeen
        : timestamp.toLocaleString()
    );
  }

  return container;
}

export default function ClusteredDeviceMarkers({ devices }) {
  const map = useMap();

  useEffect(() => {
    const group = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 50,
    });

    devices.forEach((device) => {
      const marker = L.marker([device.lat, device.lng], {
        icon: markerIcon,
      });

      marker.bindPopup(createPopup(device));
      group.addLayer(marker);
    });

    map.addLayer(group);

    return () => {
      map.removeLayer(group);
      group.clearLayers();
    };
  }, [devices, map]);

  return null;
}

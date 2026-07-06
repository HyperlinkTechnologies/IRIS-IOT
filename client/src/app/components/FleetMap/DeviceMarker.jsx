import L from "leaflet";
import { Marker } from "react-leaflet";
import markerIconUrl from "leaflet/dist/images/marker-icon.png";
import markerShadowUrl from "leaflet/dist/images/marker-shadow.png";

import DevicePopup from "./DevicePopup";

const markerIcon = new L.Icon({
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function DeviceMarker({ device }) {
  return (
    <Marker position={[device.lat, device.lng]} icon={markerIcon}>
      <DevicePopup device={device} />
    </Marker>
  );
}

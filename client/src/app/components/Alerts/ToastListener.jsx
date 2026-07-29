import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import ToastCard from "./ToastCard";

import triggeredAlertStore from "../../core/alerts/triggeredAlertStore";
import deviceRegistry from "../../core/devices/deviceRegistry";
import { getDevices } from "../../services/device.service";

export default function ToastListener() {

  const shown = useRef(new Set());

  useEffect(() => {

  const loadDevices = async () => {
    if (!deviceRegistry.isLoaded()) {
      const devices = await getDevices();
      deviceRegistry.setAll(devices);
    }
  };

  loadDevices();

  const unsubscribe =
      triggeredAlertStore.subscribe((alerts) => {

        alerts.forEach((alert) => {

          if (shown.current.has(alert.timestamp))
            return;

          shown.current.add(alert.timestamp);

          const device =
            deviceRegistry.get(alert.deviceId);

         toast.custom(
  (t) => (
    <ToastCard
      t={t}
      alert={alert}
      deviceName={
  device
    ? `${device.name} (${device.deviceId})`
    : alert.deviceId
}
      onClose={toast.dismiss}
    />
  ),
  {
    duration: 4000,
    position: "top-right",
  }
);

        });

      });

  return unsubscribe;

}, []);


  return null;

}
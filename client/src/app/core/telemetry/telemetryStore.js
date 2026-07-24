import telemetryHistory from "./telemetryHistory";
import alertEngine from "../alerts/alertEngine";
import triggeredAlertStore from "../alerts/triggeredAlertStore";

class TelemetryStore {

  constructor() {
    this.devices = {};
    this.listeners = new Set();

    setInterval(() => {

      Object.entries(this.devices).forEach(([deviceId, device]) => {
  console.log(deviceId, {
    online: device.online,
    lastUpdated: device.lastUpdated,
    uptime: device.telemetry?.uptime,
    rssi: device.telemetry?.rssi,
  });
});

  let changed = false;

  const now = Date.now();

  Object.keys(this.devices).forEach(deviceId => {

    const device = this.devices[deviceId];

    const isOnline =
      (now - device.lastUpdated) < 15000;

    if (device.online !== isOnline) {

      device.online = isOnline;

      changed = true;

    }

  });

  if (changed) {

    this.notify();

  }

}, 1000);
  }

  // Update telemetry for a device
  update(deviceId, telemetry) {

  const now = Date.now();

  this.devices = {

    ...this.devices,

    [deviceId]: {

      ...(this.devices[deviceId] || {}),

      deviceId,

      telemetry,

      lastUpdated: now,

      lastSeen: now,

      online: true,
      

    },

};

telemetryHistory.add(
  deviceId,
  telemetry
);

const triggeredAlerts =
  alertEngine.evaluate(
    deviceId,
    telemetry
  );

triggeredAlerts.forEach(alert => {

  triggeredAlertStore.add({

  ruleId: alert.id,

  ruleName: alert.name,

  severity: alert.severity,

  deviceId,

  telemetryKey: alert.telemetryKey,

  currentValue:
    telemetry[
      alert.telemetryKey
    ],

  threshold: alert.threshold,

  condition: alert.condition,

});

});

this.notify();

}

  // Get telemetry for one device
  get(deviceId) {
    return this.devices[deviceId] || {};
  }

  // Get all devices telemetry
  getAll() {
    return this.devices;
  }

  // Subscribe for updates
  subscribe(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

 notify() {

  const snapshot = { ...this.devices };

  this.listeners.forEach(listener =>
    listener(snapshot)
  );

}
}

const telemetryStore = new TelemetryStore();

export default telemetryStore;
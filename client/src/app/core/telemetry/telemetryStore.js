class TelemetryStore {

  constructor() {
    this.devices = {};
    this.listeners = new Set();

    setInterval(() => {

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

  this.devices = {

  ...this.devices,

  [deviceId]: {

    ...this.devices[deviceId],

    ...telemetry,

    lastUpdated: Date.now(),

    lastSeen: new Date().toLocaleTimeString(),

    online: true,

  },

};
console.log("Telemetry Store:", this.devices);

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
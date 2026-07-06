class TelemetryStore {

  constructor() {
    this.devices = {};
    this.listeners = new Set();
  }

  // Update telemetry for a device
  update(deviceId, telemetry) {

  this.devices = {

    ...this.devices,

    [deviceId]: {

      ...this.devices[deviceId],

      ...telemetry,

      lastUpdated: Date.now(),

    },

  };

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
class DeviceRegistry {
  constructor() {
    this.listeners = new Set();

    this.devices = [];

    this.loaded = false;
  }

  getAll() {
    return this.devices;
  }

  get(deviceId) {
    return this.devices.find(
      (device) => device.deviceId === deviceId,
    );
  }

  setAll(devices) {
    this.devices = devices;

    this.loaded = true;

    this.notify();
  }

  add(device) {
    this.devices = [...this.devices, device];

    this.notify();
  }

  update(deviceId, updates) {
    this.devices = this.devices.map((device) =>
      device.deviceId === deviceId
        ? {
            ...device,
            ...updates,
          }
        : device,
    );

    this.notify();
  }

  remove(deviceId) {
    this.devices = this.devices.filter(
      (device) => device.deviceId !== deviceId,
    );

    this.notify();
  }

  isLoaded() {
    return this.loaded;
  }

  subscribe(listener) {
    this.listeners.add(listener);

    listener(this.devices);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) =>
      listener(this.devices),
    );
  }
}

const deviceRegistry = new DeviceRegistry();

export default deviceRegistry;
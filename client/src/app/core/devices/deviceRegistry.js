const STORAGE_KEY = "iris_devices";

class DeviceRegistry {
  constructor() {
    this.listeners = new Set();
  }

  getAll() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  }

  get(deviceId) {
    return this.getAll().find((device) => device.deviceId === deviceId);
  }

  add(device) {
    const devices = this.getAll();

    devices.push(device);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));

    this.notify();
  }

  update(deviceId, updates) {
    const devices = this.getAll().map((device) =>
      device.deviceId === deviceId
        ? {
            ...device,
            ...updates,
          }
        : device,
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));

    this.notify();
  }

  remove(deviceId) {
    const devices = this.getAll().filter(
      (device) => device.deviceId !== deviceId,
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(devices));

    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.getAll()));
  }
}

const deviceRegistry = new DeviceRegistry();

export default deviceRegistry;

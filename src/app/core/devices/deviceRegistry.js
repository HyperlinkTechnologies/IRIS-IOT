const STORAGE_KEY = "iris_devices";

class DeviceRegistry {

  getAll() {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || [];
  }

  get(deviceId) {
    return this
      .getAll()
      .find(
        device =>
          device.deviceId === deviceId
      );
  }

  add(device) {

    const devices = this.getAll();

    devices.push(device);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(devices)
    );
  }

  update(deviceId, updates) {

    const devices = this.getAll().map(
      device =>

        device.deviceId === deviceId

          ? {
              ...device,
              ...updates,
            }

          : device
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(devices)
    );
  }

  remove(deviceId) {

    const devices = this.getAll().filter(
      device =>
        device.deviceId !== deviceId
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(devices)
    );
  }

}

const deviceRegistry =
  new DeviceRegistry();

export default deviceRegistry;
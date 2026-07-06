import telemetryStore from "./telemetryStore";

class TelemetryService {
  handleTelemetry(message) {
    const { deviceId, telemetry } = message;

    if (!deviceId || !telemetry) return;

    telemetryStore.update(deviceId, telemetry);
  }
}

const telemetryService = new TelemetryService();

export default telemetryService;
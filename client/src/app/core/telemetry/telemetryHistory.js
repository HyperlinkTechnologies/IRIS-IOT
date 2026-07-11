class TelemetryHistory {
  constructor() {
    this.history = {};
  }

  add(deviceId, telemetry) {
    if (!this.history[deviceId]) {
      this.history[deviceId] = [];
    }

    this.history[deviceId].push({
      timestamp: Date.now(),

      ...telemetry,
    });

    if (this.history[deviceId].length > 100) {
      this.history[deviceId].shift();
    }
  }

  get(deviceId) {
    return this.history[deviceId] || [];
  }

    getSeries(
    deviceId,
    telemetryKey,
    timeRange = "30m"
  ) {

    const history = this.get(deviceId);

    const now = Date.now();

    let duration = 30 * 60 * 1000;

    switch (timeRange) {

      case "5m":
        duration = 5 * 60 * 1000;
        break;

      case "30m":
        duration = 30 * 60 * 1000;
        break;

      case "1h":
        duration = 60 * 60 * 1000;
        break;

      case "24h":
        duration = 24 * 60 * 60 * 1000;
        break;

      default:
        duration = 30 * 60 * 1000;

    }

    return history

      .filter(
        entry =>
          (now - entry.timestamp) <= duration
      )

      .map(entry => ({

        timestamp: entry.timestamp,

        value: entry[telemetryKey],

      }))

      .filter(
        entry =>
          entry.value !== undefined
      );

  }

  clear(deviceId) {
    this.history[deviceId] = [];
  }
}

const telemetryHistory = new TelemetryHistory();

export default telemetryHistory;

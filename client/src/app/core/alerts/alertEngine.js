import alertRegistry from "./alertRegistry";
import triggeredAlertStore from "./triggeredAlertStore";

class AlertEngine {

  evaluate(deviceId, telemetry) {

  const alerts =
    alertRegistry.getAll();

  const triggered = [];

  alerts.forEach(alert => {

    if (!alert.enabled) return;

    if (alert.deviceId !== deviceId)
      return;

    const value =
      Number(
        telemetry[
          alert.telemetryKey
        ]
      );

    if (isNaN(value))
      return;

    const threshold =
      Number(alert.threshold);

    let matched = false;

    switch (alert.condition) {

      case ">":
        matched = value > threshold;
        break;

      case "<":
        matched = value < threshold;
        break;

      case "=":
        matched = value === threshold;
        break;

    }

    if (matched) {

      triggered.push(alert);

    }
    else {

      triggeredAlertStore.resolve(
        alert.id
      );

    }

  });

  return triggered;

}

}

export default new AlertEngine();
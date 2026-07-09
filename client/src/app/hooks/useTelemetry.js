import { useEffect, useState } from "react";

import telemetryStore from "../core/telemetry/telemetryStore";

export default function useTelemetry(deviceId) {
  const [telemetry, setTelemetry] = useState(telemetryStore.get(deviceId));

  useEffect(() => {
    const update = () => {
      setTelemetry(telemetryStore.get(deviceId));
    };

    update();

    const unsubscribe = telemetryStore.subscribe(update);

    return unsubscribe;
  }, [deviceId]);

  return telemetry;
}

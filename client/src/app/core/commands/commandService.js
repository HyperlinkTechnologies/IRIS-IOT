import mqttClient from "../mqtt/mqttClient";
import telemetryStore from "../telemetry/telemetryStore";

class CommandService {

  send(widget, value) {

    if (!widget.deviceId) return;

    mqttClient.publish(

      `iris/${widget.deviceId}/command`,

      {

        key: widget.telemetryKey,

        value,

        timestamp: Date.now(),

      }

    );

  }

}

export default new CommandService();
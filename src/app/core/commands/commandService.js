import mqttClient from "../mqtt/mqttClient";
import { MQTT_TOPICS } from "../mqtt/mqttTopics";

class CommandService {

  send(widget, value) {

    if (!widget.deviceId) return;

    const payload = {

      deviceId: widget.deviceId,

      command: widget.telemetryKey,

      value,

      timestamp: Date.now(),

    };

    mqttClient.publish(
      MQTT_TOPICS.COMMAND,
      payload
    );

  }

}

const commandService = new CommandService();

export default commandService;
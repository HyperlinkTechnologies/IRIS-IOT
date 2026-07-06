import mqtt from "mqtt";
import telemetryService from "../telemetry/telemetryService";

class MQTTClient {
  constructor() {
    this.client = null;
  }

  connect(url, options = {}) {
    if (this.client) return;

    this.client = mqtt.connect(url, options);

    this.client.on("connect", () => {
      console.log("✅ MQTT Connected");
    });

    this.client.on("error", (err) => {
      console.error("MQTT Error:", err);
    });

    this.client.on("close", () => {
      console.log("MQTT Disconnected");
    });
  }

  subscribe(topic) {

  if (!this.client) return;

  this.client.subscribe(topic);

  this.client.on("message", (receivedTopic, message) => {

    try {

      const payload =
        JSON.parse(message.toString());

      telemetryService.handleTelemetry(
        payload
      );

    } catch (error) {

      console.error(
        "Invalid MQTT payload:",
        error
      );

    }

  });

}

  publish(topic, payload) {
    if (!this.client) return;

    this.client.publish(
      topic,
      JSON.stringify(payload)
    );
  }

  disconnect() {
    if (!this.client) return;

    this.client.end();
    this.client = null;
  }
}

const mqttClient = new MQTTClient();

export default mqttClient;
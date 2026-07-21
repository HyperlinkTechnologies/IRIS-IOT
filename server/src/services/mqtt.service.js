import { connect } from "mqtt";
import { readFileSync } from "fs";

let mqttClient = null;

export function initializeMQTT() {
  mqttClient = connect({
    host: process.env.AWS_IOT_ENDPOINT,
    port: 8883,
    protocol: "mqtts",

    clientId: `iris-backend-${Math.random()
      .toString(16)
      .slice(2, 8)}`,

    key: readFileSync(process.env.AWS_PRIVATE_KEY),

    cert: readFileSync(process.env.AWS_DEVICE_CERT),

    ca: readFileSync(process.env.AWS_ROOT_CA),
  });

  return mqttClient;
}

export function getMQTTClient() {
  if (!mqttClient) {
    throw new Error("MQTT Client not initialized.");
  }

  return mqttClient;
}
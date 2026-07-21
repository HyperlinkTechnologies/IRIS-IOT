import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import { getIO } from "./socket.js";

import { io, iot, mqtt } from "aws-iot-device-sdk-v2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certsPath = path.join(__dirname, "../../certs");

const config = iot.AwsIotMqttConnectionConfigBuilder
  .new_mtls_builder_from_path(
    path.join(certsPath, "device-certificate.pem.crt"),
    path.join(certsPath, "private.pem.key")
  )
  .with_certificate_authority_from_path(
    undefined,
    path.join(certsPath, "AmazonRootCA1.pem")
  )
  .with_clean_session(false)
  .with_client_id(process.env.AWS_IOT_CLIENT_ID)
  .with_endpoint(process.env.AWS_IOT_ENDPOINT)
  .build();

const client = new io.ClientBootstrap();

const mqttClient = new mqtt.MqttClient(client);

export const connection = mqttClient.new_connection(config);

connection.on("connect", () => {
  console.log("✅ Connected to AWS IoT Core");
});

connection.on("disconnect", () => {
  console.log("❌ Disconnected from AWS IoT Core");
});

connection.on("interrupt", (error) => {
  console.log("⚠️ Connection interrupted", error);
});

connection.on("resume", () => {
  console.log("🔄 Connection resumed");
});

export async function connectIoT() {
  try {
    await connection.connect();

    console.log("📡 Subscribing to telemetry...");

    await connection.subscribe(
      process.env.AWS_IOT_TOPIC_TELEMETRY,
      mqtt.QoS.AtLeastOnce,
      (topic, payload) => {
       const message = new TextDecoder().decode(payload);

const telemetry = JSON.parse(message);

console.log("================================");
console.log("📥 Topic:", topic);
console.log("📦 Payload:", telemetry);
console.log("================================");

getIO().emit("telemetry", telemetry);
      }
    );

    console.log("✅ Telemetry subscription successful");
  } catch (error) {
    console.error("AWS IoT Connection Error:", error);
  }
}
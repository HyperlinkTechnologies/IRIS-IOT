import "dotenv/config";
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { getIO } from "./socket.js";
import { addTelemetry } from "../services/telemetryBuffer.js";

import { io, iot, mqtt } from "aws-iot-device-sdk-v2";
import * as deviceRepository from "../repositories/device.repository.js";
import * as limitService from "../services/subscriptionLimit.service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const certsPath = path.join(os.tmpdir(), "iris-iot-certs");

fs.mkdirSync(certsPath, { recursive: true });

const deviceCertPath = path.join(
  certsPath,
  "device-certificate.pem.crt"
);

const privateKeyPath = path.join(
  certsPath,
  "private.pem.key"
);

const caPath = path.join(
  certsPath,
  "AmazonRootCA1.pem"
);

if (
  !process.env.AWS_IOT_DEVICE_CERT ||
  !process.env.AWS_IOT_PRIVATE_KEY ||
  !process.env.AWS_IOT_CA
) {
  throw new Error(
    "AWS IoT certificate environment variables are required"
  );
}

fs.writeFileSync(
  deviceCertPath,
  Buffer.from(
    process.env.AWS_IOT_DEVICE_CERT,
    "base64"
  )
);

fs.writeFileSync(
  privateKeyPath,
  Buffer.from(
    process.env.AWS_IOT_PRIVATE_KEY,
    "base64"
  )
);

fs.writeFileSync(
  caPath,
  Buffer.from(
    process.env.AWS_IOT_CA,
    "base64"
  )
);

const config = iot.AwsIotMqttConnectionConfigBuilder
  .new_mtls_builder_from_path(
    deviceCertPath,
    privateKeyPath
  )
  .with_certificate_authority_from_path(
    undefined,
    caPath
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
      async (topic, payload) => {
       const message = new TextDecoder().decode(payload);

const telemetry = JSON.parse(message);

const userId =
  await deviceRepository.getDeviceOwner(
    telemetry.deviceId
  );

if (!userId) {

  console.log(
    "Unknown device:",
    telemetry.deviceId
  );

  return;

}

try {

  await limitService.reserveMessage(userId);

  getIO().emit(
    "subscription-restored",
    {
      feature: "Messages",
    }
  );

} catch (err) {

  if (err.name === "ConditionalCheckFailedException") {

    console.log(
      `Message limit reached for ${userId}`
    );

    getIO().emit("subscription-limit", {

      feature: "Messages",

      currentPlan: err.plan,

      currentLimit: err.limit,

    });

    return;

  }

  throw err;

}

console.log("================================");
console.log("📥 Topic:", topic);
console.log("📦 Payload:", telemetry);
console.log("================================");

addTelemetry({
  ...telemetry,
  userId,
});
getIO().emit("telemetry", telemetry);
      }
    );

    console.log("✅ Telemetry subscription successful");
  } catch (error) {
    console.error("AWS IoT Connection Error:", error);
  }
}
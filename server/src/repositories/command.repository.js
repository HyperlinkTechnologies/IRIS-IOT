import { connection } from "../config/iot.js";
import { mqtt } from "aws-iot-device-sdk-v2";

export async function publishCommand(
  deviceId,
  command,
  payload = {}
) {
  const topic = `${process.env.AWS_IOT_TOPIC_PREFIX}/${deviceId}/command`;

  const message = {
    command,
    payload,
  };

  await connection.publish(
    topic,
    JSON.stringify(message),
    mqtt.QoS.AtLeastOnce
  );

  return message;
}
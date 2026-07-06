export const MQTT_TOPICS = {

  TELEMETRY: "iris/+/telemetry",

  COMMAND: (deviceId) =>
    `iris/${deviceId}/command`,

  STATUS: "iris/+/status",

  HEARTBEAT: "iris/+/heartbeat",

};
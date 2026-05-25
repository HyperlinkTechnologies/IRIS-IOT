import mqtt from "mqtt";

/* ================= AWS CONFIG ================= */

const client = mqtt.connect(

  "wss://aiwxcvfxicr6k-ats.iot.us-east-1.amazonaws.com/mqtt",

  {

    protocolVersion: 5,

    clean: true,

    reconnectPeriod: 1000,

    connectTimeout: 4000,

    clientId:
      "iris_dashboard_" +
      Math.random()
        .toString(16)
        .slice(2),
  }
);

/* ================= CONNECT ================= */

client.on("connect", () => {

  console.log(
    "MQTT Connected"
  );
});

/* ================= ERROR ================= */

client.on("error", (err) => {

  console.error(
    "MQTT Error:",
    err
  );
});

export default client;
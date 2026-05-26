import { readFileSync } from "fs";

import express from "express";

import cors from "cors";

import { connect } from "mqtt";

import { Server } from "socket.io";

import http from "http";

const app = express();

app.use(cors());

const server =
  http.createServer(app);

const io =
  new Server(server, {
    cors: {
      origin: "*",
    },
  });

const mqttClient =
  connect({
    host:
      "aiwxcvfxicr6k-ats.iot.us-east-1.amazonaws.com",

    port: 8883,

    protocol: "mqtts",

    clientId:
      `backend-${Math.random()
        .toString(16)
        .slice(2, 8)}`,

    key:
      readFileSync(
        "./server/certs/private.pem.key"
      ),

    cert:
      readFileSync(
        "./server/certs/device.pem.crt"
      ),

    ca:
      readFileSync(
        "./server/certs/AmazonRootCA1.pem"
      ),
  });

const MQTT_TOPIC =
  "startup/bikes/+/telemetry";

mqttClient.on(
  "connect",
  () => {

    console.log(
      "AWS IoT Connected"
    );

    mqttClient.subscribe(
      MQTT_TOPIC,
      () => {

        console.log(
          "Subscribed:",
          MQTT_TOPIC
        );
      }
    );
  }
);

mqttClient.on(
  "message",
  (topic, message) => {

    try {

      const data =
        JSON.parse(
          message.toString()
        );

      console.log(
        "Telemetry:",
        data
      );

      io.emit(
        "telemetry",
        data
      );

    } catch (err) {

      console.error(err);
    }
  }
);

io.on(
  "connection",
  () => {

    console.log(
      "Dashboard Connected"
    );
  }
);

server.listen(
  4000,
  () => {

    console.log(
      "Realtime server running on 4000"
    );
  }
);
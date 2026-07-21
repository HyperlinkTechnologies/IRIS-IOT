import "dotenv/config";
import http from "http";
import { connectIoT } from "./config/iot.js";

import app from "./app.js";
import { initializeSocket } from "./config/socket.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(PORT, async () => {
  console.log(`🚀 IRIS Backend running on port ${PORT}`);

  await connectIoT();
});

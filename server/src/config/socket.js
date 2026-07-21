import { Server } from "socket.io";

let io = null;

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", () => {
    console.log("Dashboard Connected");
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
}
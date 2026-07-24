import mqttClient from "../mqtt/mqttClient";
import telemetryStore from "../telemetry/telemetryStore";

class CommandService {

 async send(widget, value) {
  if (!widget.deviceId) return;

  const response = await fetch(
    `http://localhost:4000/api/devices/${widget.deviceId}/commands`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        command: widget.telemetryKey,
        payload: {
          value,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to send command");
  }

  return response.json();
}

}

export default new CommandService();
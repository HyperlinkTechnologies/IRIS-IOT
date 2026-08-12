import request from "./api";

class CommandService {
  async send(widget, value) {
    if (!widget.deviceId) return;

    return request(`/devices/${widget.deviceId}/commands`, {
      method: "POST",
      body: JSON.stringify({
        command: widget.telemetryKey,
        payload: {
          value,
        },
      }),
    });
  }
}

export default new CommandService();
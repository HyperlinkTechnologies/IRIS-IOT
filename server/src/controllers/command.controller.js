import { publishCommand } from "../services/command.service.js";

export async function sendCommand(req, res) {
  try {
    const { deviceId } = req.params;
    const { command, payload } = req.body;

    if (!command) {
      return res.status(400).json({
        success: false,
        message: "Command is required.",
      });
    }

    const result = await publishCommand(
      deviceId,
      command,
      payload || {}
    );

    res.status(200).json({
      success: true,
      message: "Command published successfully.",
      data: result,
    });
  } catch (error) {
    console.error("Command Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to publish command.",
      error: error.message,
    });
  }
}
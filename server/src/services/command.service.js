import * as commandRepository from "../repositories/command.repository.js";

export async function publishCommand(
  deviceId,
  command,
  payload = {}
) {
  return commandRepository.publishCommand(
    deviceId,
    command,
    payload
  );
}
export function
formatTelemetry(data) {

  if (!data) {

    return null;
  }

  return {

    battery:
      data.battery,

    temperature:
      data.temperature,

    speed:
      data.speed,

    lockStatus:
      data.lockStatus,
  };
}
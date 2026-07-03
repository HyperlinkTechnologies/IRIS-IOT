export function getTelemetryValue(widget, telemetry) {

  if (!widget || !telemetry) {
    return 0;
  }

  const key = widget.telemetryKey;

  if (!key) {
    return 0;
  }

  return telemetry[key] ?? 0;

}
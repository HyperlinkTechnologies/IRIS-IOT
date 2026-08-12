import request from "./api";

export async function getTelemetryHistory(deviceId, range) {
  return request(
    `/telemetry/history?deviceId=${deviceId}&range=${range}`
  );
}

export async function exportTelemetry(deviceId, range) {
  const response = await request(
    `/telemetry/export?deviceId=${deviceId}&range=${range}`,
    {
      headers: {
        Accept: "text/csv",
      },
    }
  );

  const blob = new Blob([response], {
    type: "text/csv",
  });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;
  a.download = `${deviceId}-${range}.csv`;

  document.body.appendChild(a);

  a.click();

  a.remove();

  window.URL.revokeObjectURL(url);
}
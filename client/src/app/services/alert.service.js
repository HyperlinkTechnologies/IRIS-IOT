import request from "./api";

const API_URL = "/alerts";

export async function getAlerts() {
  const result = await request(API_URL);
  return result.data;
}

export async function getAlert(alertId) {
  const result = await request(`${API_URL}/${alertId}`);
  return result.data;
}

export async function createAlert(alert) {
  const result = await request(API_URL, {
    method: "POST",
    body: JSON.stringify(alert),
  });

  return result.data;
}

export async function updateAlert(alertId, updates) {
  const result = await request(`${API_URL}/${alertId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });

  return result.data;
}

export async function deleteAlert(alertId) {
  const result = await request(`${API_URL}/${alertId}`, {
    method: "DELETE",
  });

  return result.data;
}
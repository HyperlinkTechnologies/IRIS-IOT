const API_URL = "http://localhost:4000/api/alerts";
import { getCurrentUser } from "aws-amplify/auth";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result.data;
}

export async function getAlerts() {
  const currentUser = await getCurrentUser();

  return request(
    `${API_URL}?userId=${currentUser.userId}`
  );
}

export async function getAlert(alertId) {
  return request(`${API_URL}/${alertId}`);
}

export async function createAlert(alert) {
  const currentUser = await getCurrentUser();

  return request(API_URL, {
    method: "POST",
    body: JSON.stringify({
      ...alert,
      userId: currentUser.userId,
    }),
  });
}

export async function updateAlert(alertId, updates) {
  return request(`${API_URL}/${alertId}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteAlert(alertId) {
  return request(`${API_URL}/${alertId}`, {
    method: "DELETE",
  });
}
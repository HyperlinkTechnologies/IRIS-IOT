const API_URL = "http://localhost:4000/api/dashboards";
import { getCurrentUser } from "aws-amplify/auth";

export async function getDashboards() {
  const currentUser = await getCurrentUser();

  const response = await fetch(
    `${API_URL}?userId=${currentUser.userId}`
  );

  const result = await response.json();

  return result.data;
}

export async function createDashboard(dashboard) {
  const currentUser = await getCurrentUser();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...dashboard,
      userId: currentUser.userId,
    }),
  });

  return response.json();
}

export async function updateDashboard(dashboardId, dashboard) {
  const response = await fetch(`${API_URL}/${dashboardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dashboard),
  });

  return response.json();
}

export async function deleteDashboard(dashboardId) {
  const response = await fetch(`${API_URL}/${dashboardId}`, {
    method: "DELETE",
  });

  return response.json();
}
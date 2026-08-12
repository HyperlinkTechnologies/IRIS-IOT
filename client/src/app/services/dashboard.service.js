import { request } from "./api";

const API_URL = "/dashboards";

export async function getDashboards() {
  const result = await request(API_URL);

  return result.data;
}

export async function createDashboard(dashboard) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(dashboard),
  });
}

export async function updateDashboard(dashboardId, dashboard) {
  return request(`${API_URL}/${dashboardId}`, {
    method: "PUT",
    body: JSON.stringify(dashboard),
  });
}

export async function deleteDashboard(dashboardId) {
  return request(`${API_URL}/${dashboardId}`, {
    method: "DELETE",
  });
}
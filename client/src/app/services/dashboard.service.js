const API_URL = "http://localhost:4000/api/dashboards";

export async function getDashboards() {
  const response = await fetch(API_URL);
  const result = await response.json();
  return result.data;
}

export async function createDashboard(dashboard) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dashboard),
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
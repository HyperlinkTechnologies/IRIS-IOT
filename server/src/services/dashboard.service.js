import * as dashboardRepository from "../repositories/dashboard.repository.js";
import * as limitService from "./subscriptionLimit.service.js";
import * as billingRepository from "../repositories/billing.repository.js";

export async function createDashboard(dashboard) {

  let validation;

try {

  validation =
    await limitService.reserveDashboardSlot(
      dashboard.userId
    );

} catch (err) {

  if (err.name === "ConditionalCheckFailedException") {

    const error = new Error("Dashboard limit reached.");

    error.statusCode = 403;

    error.code = "DASHBOARD_LIMIT_REACHED";

    error.details = {
      feature: "Dashboards",
      currentPlan: err.plan,
      currentLimit: err.limit,
    };

    throw error;

  }

  throw err;

}

  const createdDashboard =
  await dashboardRepository.createDashboard(dashboard);

const dashboards =
  await dashboardRepository.getDashboards(
    dashboard.userId
  );

await billingRepository.updateUsage(
  dashboard.userId,
  {
    dashboards: dashboards.length,
  }
);

return createdDashboard;

}

export async function getDashboards(userId) {
  return dashboardRepository.getDashboards(userId);
}

export async function getDashboardById(dashboardId) {
  return dashboardRepository.getDashboardById(dashboardId);
}

export async function updateDashboard(dashboardId, data) {
  return dashboardRepository.updateDashboard(dashboardId, data);
}

export async function deleteDashboard(dashboardId) {

  const dashboard =
    await dashboardRepository.getDashboardById(dashboardId);

  await dashboardRepository.deleteDashboard(dashboardId);

  const dashboards =
  await dashboardRepository.getDashboards(
    dashboard.userId
  );

await billingRepository.updateUsage(
  dashboard.userId,
  {
    dashboards: dashboards.length,
  }
);

}
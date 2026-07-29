import {
  createDashboard,
  getDashboards,
  getDashboardById,
  updateDashboard,
  deleteDashboard,
} from "../services/dashboard.service.js";

export async function addDashboard(req, res) {
  try {
    const dashboard = req.body;

    await createDashboard(dashboard);

    res.status(201).json({
      success: true,
      message: "Dashboard created successfully.",
      data: dashboard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchDashboards(req, res) {
  try {
    const { userId } = req.query;

if (!userId) {
  return res.status(400).json({
    success: false,
    message: "userId is required.",
  });
}

const dashboards = await getDashboards(userId);

    res.json({
      success: true,
      data: dashboards,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchDashboardById(req, res) {
  try {
    const { dashboardId } = req.params;

    const dashboard = await getDashboardById(dashboardId);

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        message: "Dashboard not found.",
      });
    }

    res.json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editDashboard(req, res) {
  try {
    const { dashboardId } = req.params;

    await updateDashboard(dashboardId, req.body);

    res.json({
      success: true,
      message: "Dashboard updated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeDashboard(req, res) {
  try {
    const { dashboardId } = req.params;

    await deleteDashboard(dashboardId);

    res.json({
      success: true,
      message: "Dashboard deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
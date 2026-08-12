import {
  createAlert,
  getAlerts,
  getAlertById,
  updateAlert,
  deleteAlert,
} from "../services/alert.service.js";

export async function addAlert(req, res) {
  try {
    const result = await createAlert({
  ...req.body,
  userId: req.user.sub,
});

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchAlerts(req, res) {
  try {
    const result = await getAlerts(req.user.sub);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function fetchAlertById(req, res) {
  try {
    const result = await getAlertById(req.params.alertId);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function editAlert(req, res) {
  try {
    const result = await updateAlert(
      req.params.alertId,
      req.body
    );

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export async function removeAlert(req, res) {
  try {
    await deleteAlert(req.params.alertId);

    res.json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
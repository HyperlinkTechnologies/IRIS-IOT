import * as alertRepository from "../repositories/alert.repository.js";

export async function createAlert(alert) {
  return alertRepository.createAlert(alert);
}

export async function getAlerts(userId) {
  return alertRepository.getAlerts(userId);
}

export async function getAlertById(alertId) {
  return alertRepository.getAlertById(alertId);
}

export async function updateAlert(alertId, updates) {
  return alertRepository.updateAlert(alertId, updates);
}

export async function deleteAlert(alertId) {
  return alertRepository.deleteAlert(alertId);
}
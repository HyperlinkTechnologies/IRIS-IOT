import {
  getAlerts,
  createAlert,
  updateAlert,
  deleteAlert,
} from "../../services/alert.service";

class AlertRegistry {
  constructor() {
    this.alerts = [];
    this.listeners = new Set();
    this.loaded = false;
  }

  async load() {
    try {
      this.alerts = await getAlerts();
      this.loaded = true;
      this.notify();
    } catch (error) {
      console.error("Failed to load alerts:", error);
    }
  }

  getAll() {
    return this.alerts;
  }

  async add(alert) {
    try {
      await createAlert(alert);

      this.alerts = await getAlerts();

      this.notify();
    } catch (error) {
      console.error("Failed to create alert:", error);
    }
  }

  async update(alertId, updates) {
    try {
      await updateAlert(alertId, updates);

      this.alerts = await getAlerts();

      this.notify();
    } catch (error) {
      console.error("Failed to update alert:", error);
    }
  }

  async remove(alertId) {
    try {
      await deleteAlert(alertId);

      this.alerts = await getAlerts();

      this.notify();
    } catch (error) {
      console.error("Failed to delete alert:", error);
    }
  }

  subscribe(listener) {
    this.listeners.add(listener);

    if (!this.loaded) {
      this.load();
    } else {
      listener(this.alerts);
    }

    return () => {
      this.listeners.delete(listener);
    };
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.alerts));
  }
}

export default new AlertRegistry();
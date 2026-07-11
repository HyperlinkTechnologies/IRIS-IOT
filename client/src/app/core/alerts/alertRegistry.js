const STORAGE_KEY = "iris_alerts";

class AlertRegistry {

  constructor() {

    this.listeners = new Set();

  }

  getAll() {

    return JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || [];

  }

  add(alert) {

    const alerts = this.getAll();

    alerts.push(alert);

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(alerts)
    );

    this.notify();

  }

  update(id, updates) {

    const alerts = this.getAll().map(alert =>

      alert.id === id

        ? {
            ...alert,
            ...updates,
          }

        : alert

    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(alerts)
    );

    this.notify();

  }

  remove(id) {

    const alerts = this.getAll().filter(
      alert => alert.id !== id
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(alerts)
    );

    this.notify();

  }

  subscribe(listener) {

    this.listeners.add(listener);

    return () => {

      this.listeners.delete(listener);

    };

  }

  notify() {

    this.listeners.forEach(listener =>
      listener(this.getAll())
    );

  }

}

export default new AlertRegistry();
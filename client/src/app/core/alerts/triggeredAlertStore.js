class TriggeredAlertStore {

  constructor() {

    this.alerts = [];

    this.listeners = new Set();

  }

  getAll() {

    return this.alerts;

  }

  add(alert) {

    // Prevent duplicate alerts while
    // the same condition remains true

    const exists = this.alerts.find(

      item =>

        item.ruleId === alert.ruleId &&

        !item.resolved

    );

    if (exists) return;

    this.alerts.unshift({

      ...alert,

      timestamp: Date.now(),

      resolved: false,

    });

    this.notify();

  }

  resolve(ruleId) {

    this.alerts = this.alerts.map(alert =>

      alert.ruleId === ruleId

        ? {

            ...alert,

            resolved: true,

          }

        : alert

    );

    this.notify();

  }

  markAllAsRead() {

  this.alerts = this.alerts.map(alert => ({

    ...alert,

    resolved: true,

  }));

  this.notify();

}

remove(timestamp) {

  this.alerts = this.alerts.filter(

    alert =>

      alert.timestamp !== timestamp

  );

  this.notify();

}

clear() {

  this.alerts = [];

  this.notify();

}

  subscribe(listener) {

    this.listeners.add(listener);

    return () =>

      this.listeners.delete(listener);

  }

  notify() {

    this.listeners.forEach(listener =>

      listener(this.alerts)

    );

  }

}

export default new TriggeredAlertStore();
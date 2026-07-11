const STORAGE_KEY = "iris_settings";

class SettingsStore {

  get() {

    return JSON.parse(

      localStorage.getItem(STORAGE_KEY)

    ) || {

      emailNotifications: true,

      pushNotifications: true,

      criticalAlerts: true,

      offlineAlerts: true,

      darkMode: false,

      compactDashboard: false,

    };

  }

  save(settings) {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(settings)

    );

    window.dispatchEvent(

      new Event("settingsUpdated")

    );

  }

}

export default new SettingsStore();
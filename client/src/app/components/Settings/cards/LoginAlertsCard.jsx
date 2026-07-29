import { Bell } from "lucide-react";

export default function LoginAlertsCard({
  loginAlerts,
  handleToggleLoginAlerts,
  loginAlertsLoading,
}) {
  return (
    <div className="border rounded-xl p-5">
    <div className="flex items-center justify-between">

    <div>

      <h3 className="text-lg font-semibold">
        Login Alerts
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Receive an email whenever a new sign-in
        is detected.
      </p>

    </div>

    <button
      onClick={handleToggleLoginAlerts}
      disabled={loginAlertsLoading}
      className={`relative w-14 h-8 rounded-full transition ${
        loginAlerts
          ? "bg-[#ff5700]"
          : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition ${
          loginAlerts
            ? "translate-x-6"
            : ""
        }`}
      />
    </button>

  </div>
  </div>
  );
}
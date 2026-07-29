import { X, TriangleAlert, ShieldAlert } from "lucide-react";

export default function ToastCard({
  t,
  alert,
  deviceName,
  onClose,
}) {
  const critical = alert.severity === "Critical";



  return (
    <div
      className={`
        relative
        w-96
        rounded-2xl
       ${critical ? "bg-red-100" : "bg-amber-100"}
        shadow-xl
        border-l-4
        overflow-hidden
        transition-all
        duration-300
        ${t.visible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${critical ? "border-red-500" : "border-amber-500"}
      `}
    >
      <div className="p-3">

        {/* Header */}
        <div className="flex items-start justify-between">

          <div className="flex flex-1 items-center gap-4">

            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center 
                ${critical
          ? "bg-red-200 text-red-600"
          : "bg-amber-200 text-amber-600"}
              `}
            >
              {critical ? (
                <ShieldAlert size={20} />
              ) : (
                <TriangleAlert size={22} strokeWidth={2.5} />
              )}
            </div>

            <div>

  <div className="flex items-center gap-2">

    <h3 className="text-lg font-semibold text-gray-900">
      {alert.ruleName || `${alert.telemetryKey} Alert`}
    </h3>

    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${
        critical
          ? "bg-red-100 text-red-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {critical ? "CRITICAL" : "WARNING"}
    </span>

  </div>

  <p className="text-xs text-gray-500 mt-0.5">
    Just now
  </p>

</div>

          </div>

          {/* Single Close Button */}
          <button
            onClick={() => onClose(t.id)}
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={16} />
          </button>

        </div>

        {/* Body */}
        <div className="mt-2 space-y-1">

          <p className="text-sm font-medium text-gray-700 mt-2">
  {deviceName}
</p>

          <p className="text-sm text-gray-600 leading-5 mt-1">
  {alert.description ||
    `${alert.telemetryKey} ${
      alert.condition === ">"
        ? "exceeded"
        : alert.condition === "<"
        ? "dropped below"
        : "reached"
    } the configured threshold.`}
</p>

        </div>

      </div>


    </div>
  );
}
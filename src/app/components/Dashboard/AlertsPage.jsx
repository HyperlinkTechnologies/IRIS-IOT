import {
  Bell,
  TriangleAlert,
  ShieldAlert,
  Thermometer,
  Plus
} from "lucide-react";

export default function AlertsPage() {

  const alerts = [
    {
      id: 1,
      type: "Temperature High",
      device: "Boiler Sensor",
      severity: "Critical",
      time: "2 mins ago"
    },
    {
      id: 2,
      type: "Device Offline",
      device: "Pressure Monitor",
      severity: "Warning",
      time: "10 mins ago"
    },
    {
      id: 3,
      type: "Voltage Drop",
      device: "Energy Meter",
      severity: "Critical",
      time: "20 mins ago"
    }
  ];

  return (

    <div>

      {/* Header */}
      <div className="
        flex
        items-center
        justify-between
        mb-8
      ">

        <div>

          <h2 className="text-3xl font-bold">
            Alerts Management
          </h2>

          <p className="text-gray-400 mt-1">
            Configure and monitor alert rules
          </p>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            px-6
            py-3
            rounded-2xl
            bg-linear-to-r
            from-[#d84800]
            to-[#ff5700]
            hover:opacity-90
          "
        >

          <Plus size={18} />

          Create Alert

        </button>

      </div>

      {/* Alert Cards */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-8
      ">

        <AlertCard
          icon={<Bell />}
          title="Total Alerts"
          value="14"
        />

        <AlertCard
          icon={<ShieldAlert />}
          title="Critical"
          value="5"
          red
        />

        <AlertCard
          icon={<TriangleAlert />}
          title="Warnings"
          value="9"
          orange
        />

      </div>

      {/* Alert List */}
      <div className="
        bg-[#071633]
        border
        border-white/10
        rounded-3xl
        overflow-hidden
      ">

        <div className="
          px-6
          py-4
          border-b
          border-white/10
          font-semibold
        ">
          Recent Alerts
        </div>

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className="
              flex
              items-center
              justify-between
              px-6
              py-5
              border-b
              border-white/5
              hover:bg-white/2
            "
          >

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-12
                h-12
                rounded-2xl
                bg-orange-500/10
                flex
                items-center
                justify-center
                text-orange-400
              ">

                <Thermometer size={22} />

              </div>

              <div>

                <p className="font-semibold">
                  {alert.type}
                </p>

                <p className="
                  text-sm
                  text-gray-400
                ">
                  {alert.device}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p
                className={`
                  font-medium
                  ${
                    alert.severity === "Critical"
                      ? "text-red-400"
                      : "text-orange-400"
                  }
                `}
              >
                {alert.severity}
              </p>

              <p className="
                text-sm
                text-gray-400
              ">
                {alert.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

function AlertCard({
  icon,
  title,
  value,
  red,
  orange
}) {

  return (

    <div className="
      bg-[#071633]
      border
      border-white/10
      rounded-3xl
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-4
      ">

        <div className={`
          ${
            red
              ? "text-red-400"
              : orange
              ? "text-orange-400"
              : "text-[#ff5700]"
          }
        `}>
          {icon}
        </div>

      </div>

      <p className="text-gray-400 mb-2">
        {title}
      </p>

      <h3 className="text-4xl font-bold">
        {value}
      </h3>

    </div>
  );
}
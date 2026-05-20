import {
  Bell,
  TriangleAlert,
  ShieldAlert,
  Thermometer,
  Plus,
} from "lucide-react";

export default function AlertsPage() {

  const alerts = [
    {
      id: 1,
      type: "Temperature High",
      device: "Boiler Sensor",
      severity: "Critical",
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "Device Offline",
      device: "Pressure Monitor",
      severity: "Warning",
      time: "10 mins ago",
    },
    {
      id: 3,
      type: "Voltage Drop",
      device: "Energy Meter",
      severity: "Critical",
      time: "20 mins ago",
    },
  ];

  return (

    <div className="w-full">

      {/* ================= HEADER ================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >

        {/* Left */}
        <div>

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
              text-[#010c29]
            "
          >
            Alerts Management
          </h2>

          <p
            className="
              text-gray-400
              mt-2
              text-sm
              sm:text-base
            "
          >
            Configure and monitor alert rules
          </p>

        </div>

        {/* Button */}
        <button
          className="
            w-full
            sm:w-auto

            flex
            items-center
            justify-center
            gap-2

            px-6
            py-3

            rounded-2xl

            bg-linear-to-r
            from-[#d84800]
            to-[#ff5700]

            hover:opacity-90
            hover:scale-[1.02]

            transition-all
            duration-300

            cursor-pointer

            text-white
            font-medium

            shadow-lg
          "
        >

          <Plus size={18} />

          Create Alert

        </button>

      </div>

      {/* ================= ALERT CARDS ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
          sm:gap-6
          mb-8
        "
      >

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

      {/* ================= ALERT LIST ================= */}

      <div
        className="
          bg-black/5

          border
          border-black/10

          shadow-lg

          rounded-3xl

          overflow-hidden
        "
      >

        {/* ================= HEADER ================= */}

        <div
          className="
            px-5
            sm:px-6

            py-4

            border-b
            border-black/10

            font-semibold

            text-[#010c29]

            text-sm
            sm:text-base
          "
        >
          Recent Alerts
        </div>

        {/* ================= ALERT ITEMS ================= */}

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className="
              flex
              flex-col
              sm:flex-row

              sm:items-center
              sm:justify-between

              gap-4

              px-5
              sm:px-6

              py-5

              border-b
              border-black/5

              hover:bg-black/2

              transition-all
            "
          >

            {/* ================= LEFT ================= */}

            <div
              className="
                flex
                items-start
                sm:items-center
                gap-4
              "
            >

              {/* Icon */}
              <div
                className="
                  w-12
                  h-12

                  rounded-2xl

                  bg-orange-500/10

                  flex
                  items-center
                  justify-center

                  text-orange-500

                  shrink-0
                "
              >

                <Thermometer size={22} />

              </div>

              {/* Text */}
              <div>

                <p
                  className="
                    font-semibold
                    text-[#010c29]

                    text-sm
                    sm:text-base
                  "
                >
                  {alert.type}
                </p>

                <p
                  className="
                    text-sm
                    text-gray-400
                    mt-1
                  "
                >
                  {alert.device}
                </p>

              </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div
              className="
                sm:text-right
              "
            >

              <p
                className={`
                  font-medium
                  text-sm
                  sm:text-base

                  ${
                    alert.severity === "Critical"
                      ? "text-red-500"
                      : "text-orange-500"
                  }
                `}
              >
                {alert.severity}
              </p>

              <p
                className="
                  text-sm
                  text-gray-400
                  mt-1
                "
              >
                {alert.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

/* ================= ALERT CARD ================= */

function AlertCard({
  icon,
  title,
  value,
  red,
  orange
}) {

  return (

    <div
      className="
        bg-black/5

        border
        border-black/10

        shadow-md

        rounded-3xl

        p-5
        sm:p-6

        hover:shadow-lg
        hover:border-[#ff5700]/20

        transition-all
        duration-300
      "
    >

      {/* Top */}
      <div
        className="
          flex
          items-center
          justify-between
          mb-5
        "
      >

        <div
          className={`
            ${
              red
                ? "text-red-500"
                : orange
                ? "text-orange-500"
                : "text-[#ff5700]"
            }
          `}
        >
          {icon}
        </div>

      </div>

      {/* Title */}
      <p
        className="
          text-gray-400

          text-sm
          sm:text-base

          mb-2
        "
      >
        {title}
      </p>

      {/* Value */}
      <h3
        className="
          text-3xl
          sm:text-4xl
          lg:text-5xl

          font-bold

          text-[#010c29]
        "
      >
        {value}
      </h3>

    </div>
  );
}
import { Plus, Search, Trash2, Wifi, WifiOff } from "lucide-react";

import { useState } from "react";

export default function DevicesPage() {
  const [search, setSearch] = useState("");

  const devices = [
    {
      id: "IRIS-001",
      name: "Boiler Sensor",
      status: "online",
      location: "Chennai Plant",
      lastSeen: "2 sec ago",
      firmware: "v1.2.0",
    },
    {
      id: "IRIS-002",
      name: "Pressure Monitor",
      status: "offline",
      location: "Mumbai Plant",
      lastSeen: "15 mins ago",
      firmware: "v1.0.3",
    },
    {
      id: "IRIS-003",
      name: "Temperature Node",
      status: "online",
      location: "Delhi Factory",
      lastSeen: "5 sec ago",
      firmware: "v1.4.1",
    },
  ];

  const filteredDevices = devices.filter((device) =>
    device.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="w-full">
      {/* ================= TOP CARDS ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          sm:gap-6
          mb-8
        "
      >
        <StatusCard title="Total Devices" value="124" />

        <StatusCard title="Online" value="118" green />

        <StatusCard title="Offline" value="6" red />

        <StatusCard title="Alerts" value="3" orange />
      </div>

      {/* ================= TOP ACTIONS ================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-4
          mb-8
        "
      >
        {/* ================= SEARCH ================= */}

        <div
          className="
            flex
            items-center
            gap-3

            bg-black/5

            border
            border-black/10

            px-4
            py-3

            rounded-2xl

            w-full
            lg:max-w-105

            shadow-sm
          "
        >
          <Search className="text-gray-400 shrink-0" size={20} />

          <input
            type="text"
            placeholder="Search Devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              bg-transparent
              outline-none
              w-full

              text-[#010c29]

              placeholder:text-gray-500

              text-sm
              sm:text-base
            "
          />
        </div>

        {/* ================= ADD BUTTON ================= */}

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

            font-medium
            text-white

            shadow-lg
          "
        >
          <Plus size={20} />
          Add Device
        </button>
      </div>

      {/* ================= DEVICE TABLE ================= */}

      <div
        className="
          bg-black/5

          border
          border-black/10

          rounded-3xl

          overflow-hidden

          shadow-lg
        "
      >
        {/* ================= TABLE HEADER ================= */}

        <div
          className="
            hidden
            lg:grid

            grid-cols-6

            gap-4

            px-6
            py-4

            border-b
            border-black/10

            text-sm
            font-semibold

            text-gray-500
          "
        >
          <p>Device</p>

          <p>Status</p>

          <p>Location</p>

          <p>Last Seen</p>

          <p>Firmware</p>

          <p>Actions</p>
        </div>

        {/* ================= TABLE BODY ================= */}

        {/* <div>

          {filteredDevices.map((device) => (

            <div
              key={device.id}
              className="
                grid
                grid-cols-1
                lg:grid-cols-6

                gap-4

                px-5
                sm:px-6

                py-5

                border-b
                border-black/5

                hover:bg-black/[0.02]

                transition-all
              "
            > */}

        {/* Device */}
        {/* <div>

                <p className="
                  font-semibold
                  text-[#010c29]
                ">
                  {device.name}
                </p>

                <p className="
                  text-sm
                  text-gray-500
                ">
                  {device.id}
                </p>

              </div> */}

        {/* Status */}
        {/* <div className="
                flex
                items-center
              ">

                {device.status === "online" ? (

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-green-500
                      font-medium
                    "
                  >

                    <Wifi size={18} />

                    Online

                  </div>

                ) : (

                  <div
                    className="
                      flex
                      items-center
                      gap-2

                      text-red-500
                      font-medium
                    "
                  >

                    <WifiOff size={18} />

                    Offline

                  </div>

                )}

              </div> */}

        {/* Location */}
        {/* <div className="text-gray-600">
                {device.location}
              </div> */}

        {/* Last Seen */}
        {/* <div className="text-gray-600">
                {device.lastSeen}
              </div> */}

        {/* Firmware */}
        {/* <div className="text-gray-600">
                {device.firmware}
              </div> */}

        {/* Actions */}
        {/* <div className="
                flex
                items-center
                justify-start
              ">

                <button
                  className="
                    p-2.5

                    rounded-xl

                    bg-red-500/10

                    hover:bg-red-500/20

                    text-red-500

                    transition-all
                  "
                >

                  <Trash2 size={18} />

                </button>

              </div>

            </div>

          ))}

        </div> */}
      </div>
    </div>
  );
}

/* ================= STATUS CARD ================= */

function StatusCard({ title, value, green, red, orange }) {
  return (
    <div
      className="
        bg-black/5

        border
        border-black/10

        rounded-3xl

        p-5
        sm:p-6

        shadow-md

        hover:shadow-lg
        hover:border-[#ff5700]/20

        transition-all
        duration-300
      "
    >
      <p
        className="
          text-gray-500

          text-sm
          sm:text-base

          mb-3
        "
      >
        {title}
      </p>

      <h3
        className={`
          text-3xl
          sm:text-4xl
          lg:text-5xl

          font-bold

          ${
            green
              ? "text-green-500"
              : red
                ? "text-red-500"
                : orange
                  ? "text-orange-500"
                  : "text-[#010c29]"
          }
        `}
      >
        {value}
      </h3>
    </div>
  );
}

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
    <div>
      {/* ================= TOP CARDS ================= */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-6
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
        md:flex-row
        md:items-center
        md:justify-between
        gap-4
        mb-6
      "
      >
        {/* Search */}
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
          md:w-87.5
        "
        >
          <Search className="text-gray-400" size={20} />

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
            "
          />
        </div>

        {/* Add Button */}
        <button
          className="
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
            transition-all
            duration-300
            font-medium
          "
        >
          <Plus size={20} />
          Add Device
        </button>
      </div>

      {/* ================= TABLE ================= */}

      {/* <div
        className="
        bg-black/5
        border
        border-black/10
        rounded-3xl
        overflow-hidden
        shadow-lg
      "
      > */}
        {/* Table Header */}
        {/* <div
          className="
          grid
          grid-cols-6
          gap-4
          px-6
          py-4
          border-b
          border-black/10
          text-sm
          text-gray-400
          font-medium
        "
        >
          <p>Device</p>

          <p>Status</p>

          <p>Location</p>

          <p>Last Seen</p>

          <p>Firmware</p>

          <p>Actions</p>
        </div> */}

        {/* Table Body */}
        {/* <div>
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              className="
                grid
                grid-cols-6
                gap-4
                px-6
                py-5
                items-center
                hover:bg-white/2
                transition-all
                s
              "
            > */}
              {/* Device */}
              {/* <div>
                <p className="font-semibold">{device.name}</p>

                <p
                  className="
                  text-sm
                  text-gray-400
                "
                >
                  {device.id}
                </p>
              </div> */}

              {/* Status */}
              {/* <div>
                {device.status === "online" ? (
                  <div
                    className="
                    flex
                    items-center
                    gap-2
                    text-green-400
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
                    text-red-400
                  "
                  >
                    <WifiOff size={18} />
                    Offline
                  </div>
                )}
              </div> */}

              {/* Location */}
              {/* <p className="text-gray-300">{device.location}</p> */}

              {/* Last Seen */}
              {/* <p className="text-gray-300">{device.lastSeen}</p> */}

              {/* Firmware */}
              {/* <p className="text-gray-300">{device.firmware}</p> */}

              {/* Actions */}
              {/* <div className="flex items-center gap-3"> */}
                {/* <button
                  className="
                    p-2
                    rounded-xl
                    bg-red-500/10
                    hover:bg-red-500/20
                    text-red-400
                    transition-all
                  "
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div> */}
      {/* </div> */}
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
      p-6
      shadow-lg
    "
    >
      <p className="text-gray-500 mb-3">{title}</p>

      <h3
        className={`
          text-4xl
          font-bold
          ${
            green
              ? "text-green-400"
              : red
                ? "text-red-400"
                : orange
                  ? "text-orange-400"
                  : "text-[#010c29"
          }
        `}
      >
        {value}
      </h3>
    </div>
  );
}

import {
  Plus,
  Search,
  Trash2,
  Wifi,
  WifiOff,
  Pencil,
  X,
  Activity,
  Copy,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function DevicesPage() {
  /* ================= STATES ================= */

  const [search, setSearch] = useState("");

  const [devices, setDevices] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const [editingDevice, setEditingDevice] = useState(null);

  const [errors, setErrors] = useState({});

  const [deviceForm, setDeviceForm] = useState({
    name: "",

    location: "",

    description: "",
  });

  /* ================= LOAD DEVICES ================= */

  useEffect(() => {
    setDevices(deviceRegistry.getAll());
  }, []);

  /* ================= SAVE DEVICES ================= */

  const refreshDevices = () => {
    setDevices(deviceRegistry.getAll());
  };

  /* ================= GENERATE IDS ================= */

  const generateDeviceId = () => {
    return `IRIS-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const generateApiKey = () => {
    return `iris_${Math.random().toString(36).substring(2, 14)}`;
  };

  /* ================= ADD DEVICE ================= */

  const handleAddDevice = () => {
    /* ================= VALIDATION ================= */

    let validationErrors = {};

    if (!deviceForm.name.trim()) {
      validationErrors.name = "Device name is required";
    }

    setErrors(validationErrors);

    /* ================= STOP IF ERROR ================= */

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    /* ================= CREATE DEVICE ================= */

    const newDevice = {
      id: Date.now(),

      deviceId: generateDeviceId(),

      apiKey: generateApiKey(),

      name: deviceForm.name,

      location: deviceForm.location,

      description: deviceForm.description,

      firmware: "v1.0.0",

      status: "offline",

      telemetry: [],

      lastSeen: "Never",

      createdAt: new Date().toLocaleString(),
    };

    deviceRegistry.add(newDevice);
    refreshDevices();

    /* ================= RESET ================= */

    setShowAddModal(false);

    setErrors({});

    setDeviceForm({
      name: "",

      location: "",

      description: "",
    });
  };

  /* ================= DELETE DEVICE ================= */

  const handleDeleteDevice = (deviceId) => {
    deviceRegistry.remove(deviceId);

    refreshDevices();
  };

  /* ================= EDIT DEVICE ================= */

  const handleEditDevice = () => {
    deviceRegistry.update(editingDevice.deviceId, editingDevice);

    refreshDevices();

    setEditingDevice(null);
    setEditingDevice(null);
  };

  /* ================= FILTER DEVICES ================= */

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
        <StatusCard title="Total Devices" value={devices.length} />

        <StatusCard
          title="Online"
          value={devices.filter((d) => d.status === "online").length}
          green
        />

        <StatusCard
          title="Offline"
          value={devices.filter((d) => d.status === "offline").length}
          red
        />

        <StatusCard title="Telemetry" value={124} orange />
      </div>

      {/* ================= ACTIONS ================= */}

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
        {/* SEARCH */}

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
          <Search
            className="
              text-gray-400
            "
            size={20}
          />

          <input
            type="text"
            placeholder="Search Devices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              bg-transparent
              outline-none
              w-full
            "
          />
        </div>

        {/* ADD BUTTON */}

        <button
          onClick={() => setShowAddModal(true)}
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
            text-white
            shadow-lg
            hover:opacity-90
            cursor-pointer
          "
        >
          <Plus size={20} />
          Add Device
        </button>
      </div>

      {/* ================= DEVICE LIST ================= */}

      <div className="grid gap-5">
        {filteredDevices.map((device) => (
          <div
            key={device.id}
            className="
                bg-black/5
                border
                border-black/10
                rounded-3xl
                p-5
                shadow-md
              "
          >
            <div
              className="
                  flex
                  flex-col
                  lg:flex-row
                  lg:items-center
                  lg:justify-between
                  gap-5
                "
            >
              {/* LEFT */}

              <div>
                <div
                  className="
                      flex
                      items-center
                      gap-3
                    "
                >
                  <h3
                    className="
                        text-xl
                        font-bold
                      "
                  >
                    {device.name}
                  </h3>

                  {device.status === "online" ? (
                    <Wifi
                      className="
                          text-green-500
                        "
                    />
                  ) : (
                    <WifiOff
                      className="
                          text-red-500
                        "
                    />
                  )}
                </div>

                <p
                  className="
                      text-gray-500
                      mt-1
                    "
                >
                  {device.deviceId}
                </p>

                <p
                  className="
                      text-sm
                      text-gray-400
                      mt-2
                    "
                >
                  {device.location}
                </p>
              </div>

              {/* RIGHT */}

              <div
                className="
                    flex
                    flex-wrap
                    gap-3
                  "
              >
                {/* VIEW */}

                <button
                  onClick={() => setSelectedDevice(device)}
                  className="group relative
                      px-4
                      py-2
                      rounded-xl
                      bg-blue-500/10
                      text-blue-500
                      hover:bg-blue-500/90
                      cursor-pointer
                      hover:text-white
                    "
                >
                  <Activity size={18} />
                  <span
                    className="
                    absolute
                    -top-10
                    left-[50%]
                    translate-x-[-50%]
                    z-20
                    origin-bottom
                    scale-0
                    px-3
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    py-2
                    text-sm
                    font-bold
                    shadow-md
                    transition-all
                    duration-300
                    group-hover:scale-100
                    group-hover:text-blue-500
                    "
                  >
                    Details
                  </span>
                </button>

                {/* EDIT */}

                <button
                  onClick={() => setEditingDevice(device)}
                  className="group relative
                      px-4
                      py-2
                      rounded-xl
                      bg-orange-500/10
                      text-orange-500
                      cursor-pointer
                      hover:bg-orange-500/90
                      hover:text-white

                    "
                >
                  <Pencil size={18} />
                  <span
                    className="
                    absolute
                    -top-10
                    left-[50%]
                    translate-x-[-50%]
                    z-20
                    origin-bottom
                    scale-0
                    px-3
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    py-2
                    text-sm
                    font-bold
                    shadow-md
                    transition-all
                    duration-300
                    group-hover:scale-100
                    group-hover:text-[#ff5700]
                    "
                  >
                    Edit
                  </span>
                </button>

                {/* DELETE */}

                <button
                  onClick={() => handleDeleteDevice(device.deviceId)}
                  className="group relative
                      px-4
                      py-2
                      rounded-xl
                      bg-red-500/10
                      text-red-500
                      hover:bg-red-500/90
                      hover:text-white
                      cursor-pointer
                    "
                >
                  <Trash2 size={18} />
                  <span
                    className="
                    absolute
                    -top-10
                    left-[50%]
                    translate-x-[-50%]
                    z-20
                    origin-bottom
                    scale-0
                    px-3
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    py-2
                    text-sm
                    font-bold
                    shadow-md
                    transition-all
                    duration-300
                    group-hover:scale-100
                    group-hover:text-red-500
                    "
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= ADD DEVICE MODAL ================= */}

      {showAddModal && (
        <Modal title="Add Device" onClose={() => setShowAddModal(false)}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Device Name *"
              value={deviceForm.name}
              onChange={(e) => {
                setDeviceForm({
                  ...deviceForm,

                  name: e.target.value,
                });

                /* REMOVE ERROR LIVE */

                if (errors.name) {
                  setErrors({
                    ...errors,

                    name: "",
                  });
                }
              }}
              className={`
                  w-full
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  transition-all

                  ${
                    errors.name
                      ? `
                        border
                        border-red-500
                        focus:border-red-500
                      `
                      : `
                        border
                        border-gray-300
                        focus:border-[#ff5700]
                      `
                  }
                `}
            />

            {/* ERROR MESSAGE */}

            {errors.name && (
              <p
                className="
                    text-red-500
                    text-sm
                    mt-2
                    font-medium
                  "
              >
                {errors.name}
              </p>
            )}

            <input
              type="text"
              placeholder="Location"
              value={deviceForm.location}
              onChange={(e) =>
                setDeviceForm({
                  ...deviceForm,

                  location: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <textarea
              placeholder="Description"
              value={deviceForm.description}
              onChange={(e) =>
                setDeviceForm({
                  ...deviceForm,

                  description: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <button
              onClick={handleAddDevice}
              className="
                w-full
                py-3
                rounded-xl
                bg-[#ff5700]
                text-white
                cursor-pointer
              "
            >
              Create Device
            </button>
          </div>
        </Modal>
      )}

      {/* ================= VIEW DEVICE ================= */}

      {selectedDevice && (
        <Modal title="Device Details" onClose={() => setSelectedDevice(null)}>
          <div className="space-y-4">
            <InfoRow label="Device ID" value={selectedDevice.deviceId} />

            <InfoRow label="API Key" value={selectedDevice.apiKey} />

            <InfoRow label="Firmware" value={selectedDevice.firmware} />

            <InfoRow label="Last Seen" value={selectedDevice.lastSeen} />

            <InfoRow label="Created At" value={selectedDevice.createdAt} />

            <div>
              <h4
                className="
                  font-bold
                  mb-3
                "
              >
                Latest Telemetry
              </h4>

              <div className="p-6 text-black">
                <h1 className="text-2xl mb-4">Live Telemetry</h1>

                {telemetry ? (
                  <div className="space-y-2">
                    <p>Device: {telemetry.deviceId}</p>
                    <p>Battery: {telemetry.battery}%</p>
                    <p>Temperature: {telemetry.temperature}°C</p>
                    <p>Speed: {telemetry.speed} km/h</p>
                    <p>Lock Status: {telemetry.lockStatus}</p>
                  </div>
                ) : (
                  <p>Waiting for telemetry...</p>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ================= EDIT DEVICE ================= */}

      {editingDevice && (
        <Modal title="Edit Device" onClose={() => setEditingDevice(null)}>
          <div className="space-y-4">
            <input
              type="text"
              value={editingDevice.name}
              onChange={(e) =>
                setEditingDevice({
                  ...editingDevice,

                  name: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <input
              type="text"
              placeholder="Location"
              value={editingDevice.location}
              onChange={(e) =>
                setEditingDevice({
                  ...editingDevice,

                  location: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <textarea
              placeholder="Description"
              value={editingDevice.description}
              onChange={(e) =>
                setEditingDevice({
                  ...editingDevice,

                  description: e.target.value,
                })
              }
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
              "
            />

            <button
              onClick={handleEditDevice}
              className="
                w-full
                py-3
                rounded-xl
                bg-[#ff5700]
                text-white
                cursor-pointer
              "
            >
              Save Changes
            </button>
          </div>
        </Modal>
      )}
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
      "
    >
      <p className="text-gray-500">{title}</p>

      <h3
        className={`
          text-4xl
          font-bold
          mt-3

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

/* ================= MODAL ================= */

function Modal({ title, children, onClose }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-xl
          p-6
          shadow-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            mb-6
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="cursor-pointer hover:bg-gray-100 rounded-full p-1.5"
          >
            <X />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* ================= INFO ROW ================= */

function InfoRow({ label, value }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-black/5
        pb-3
      "
    >
      <p className="font-medium">{label}</p>

      <p
        className="
          text-gray-500
          break-all
        "
      >
        {value}
      </p>
    </div>
  );
}

import { Plus, Search } from "lucide-react";

import { useEffect, useState } from "react";
import { useRef } from "react";
import StatusCard from "../../components/Devices/statusCard";
import DeviceDetailsModal from "../../components/Devices/deviceDetailsModal";
import Modal from "../../components/Common/Modal";
import DeviceCard from "../../components/Devices/DeviceCard";
import telemetryStore from "../../core/telemetry/telemetryStore";
import deviceRegistry from "../../core/devices/deviceRegistry";
import SubscriptionLimitDialog from "../../components/Common/subscriptionLimitDialog";
import { useBilling } from "../../../context/BillingContext";
import SubscriptionWarningCard from "../../components/Common/SubscriptionWarningCard";
import { useSubscriptionWarning } from "../../../context/SubscriptionWarningContext";
import {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../../services/device.service";

export default function DevicesPage() {
  const [telemetry, setTelemetry] = useState(telemetryStore.getAll());
  const { openPlansModal } = useBilling();
  const {
  warning,
  clearWarning,
} = useSubscriptionWarning();
  const warningShown = useRef(false);

  useEffect(() => {
    const unsubscribe = telemetryStore.subscribe((snapshot) => {
      setTelemetry(snapshot);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {

  if (!warning || warningShown.current) {
    return;
  }

  warningShown.current = true;

  setLimitInfo({
    feature: warning.feature,
    currentPlan: warning.currentPlan,
    currentLimit: warning.currentLimit,
  });

  setShowLimitDialog(true);

}, [warning]);
  /* ================= STATES ================= */

  const [search, setSearch] = useState("");

  const [devices, setDevices] = useState(
  deviceRegistry.getAll(),
);

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

const [billingOpen, setBillingOpen] = useState(false);

const [limitInfo, setLimitInfo] = useState(null);

const [showLimitDialog, setShowLimitDialog] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedDevice, setSelectedDevice] = useState(null);

  const [editingDevice, setEditingDevice] = useState(null);

  const [errors, setErrors] = useState({});

  const [deviceForm, setDeviceForm] = useState({
    name: "",

    location: "",

    description: "",
  });

  const [creatingDevice, setCreatingDevice] = useState(false);

  /* ================= LOAD DEVICES ================= */

const loadDevices = async () => {
  try {
    if (deviceRegistry.isLoaded()) return;

    const data = await getDevices();

    deviceRegistry.setAll(data);
  } catch (error) {
    console.error("Failed to load devices:", error);
  }
};
useEffect(() => {
  const unsubscribe = deviceRegistry.subscribe(setDevices);

  loadDevices();

  return unsubscribe;
}, []);

  /* ================= SAVE DEVICES ================= */

const refreshDevices = async () => {
  const data = await getDevices();

  deviceRegistry.setAll(data);
};

  /* ================= GENERATE IDS ================= */

  const generateDeviceId = () => {
    return `IRIS-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const generateApiKey = () => {
    return `iris_${Math.random().toString(36).substring(2, 14)}`;
  };

  /* ================= ADD DEVICE ================= */

  const handleAddDevice = async () => {
    if (creatingDevice) return;

setCreatingDevice(true);

  let validationErrors = {};

  if (!deviceForm.name.trim()) {
    validationErrors.name = "Device name is required";
  }

  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    setCreatingDevice(false);
    return;
}

  const newDevice = {
    deviceId: generateDeviceId(),
    deviceName: deviceForm.name,
    gatewayId: "GW-001",
    firmwareVersion: "1.0.0",
    apiKey: generateApiKey(),
    location: deviceForm.location,
    description: deviceForm.description,
    status: "offline",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {

    await createDevice(newDevice);

    await refreshDevices();

    setShowAddModal(false);

    setErrors({});

    setDeviceForm({
      name: "",
      location: "",
      description: "",
    });
    setCreatingDevice(false);

  } catch (error) {

    if (error.code === "DEVICE_LIMIT_REACHED") {

        setLimitInfo(error.details);

        setShowLimitDialog(true);

        setCreatingDevice(false);

        return;

    }

    console.error(error);
    setCreatingDevice(false);

}

};

  /* ================= DELETE DEVICE ================= */

  const handleDeleteDevice = async (deviceId) => {
  try {
    await deleteDevice(deviceId);

    await refreshDevices();
  } catch (error) {
    console.error(error);
  }
};

  /* ================= EDIT DEVICE ================= */

 const handleEditDevice = async () => {
  try {
    await updateDevice(editingDevice.deviceId, {
      deviceName: editingDevice.name,
      location: editingDevice.location,
      description: editingDevice.description,
      status: editingDevice.status,
    });

    await refreshDevices();

    setEditingDevice(null);
  } catch (error) {
    console.error(error);
  }
};

  /* ================= FILTER DEVICES ================= */
  const devicesWithTelemetry = devices.map((device) => ({
  ...device,
  ...telemetry[device.deviceId],
}));

  const filteredDevices = devicesWithTelemetry.filter((device) =>
  (device.deviceName || "")
    .toLowerCase()
    .includes(search.toLowerCase()),
);

  const onlineCount = devices.filter(
    (device) => telemetry[device.deviceId]?.online,
  ).length;

  const offlineCount = devices.length - onlineCount;

  return (
    <div className="w-full">
      {/* ================= TOP CARDS ================= */}

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
        <StatusCard title="Total Devices" value={devices.length} />

        <StatusCard title="Online" value={onlineCount} green />

        <StatusCard title="Offline" value={offlineCount} red />
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

      <SubscriptionWarningCard
        warning={warning}
        onClick={() => {
          setLimitInfo({
            feature: warning.feature,
            currentPlan: warning.currentPlan,
            currentLimit: warning.currentLimit,
          });

          setShowLimitDialog(true);
        }}
      />

      {/* ================= DEVICE LIST ================= */}

      <div className="grid gap-5">
        {filteredDevices.map((device) => (
          <DeviceCard
            key={device.deviceId}
            device={device}
            onDetails={() => setSelectedDevice(device)}
            onEdit={() => setEditingDevice(device)}
            onDelete={() => handleDeleteDevice(device.deviceId)}
          />
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
              disabled={creatingDevice}
              className={`
                  w-full
                  py-3
                  rounded-xl
                  text-white
                  transition-all
                  ${
                    creatingDevice
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#ff5700] hover:bg-[#e74f00] cursor-pointer"
                  }
              `}
            >
              {creatingDevice ? "Creating..." : "Create Device"}
            </button>
          </div>
        </Modal>
      )}

      {selectedDevice && (
        <DeviceDetailsModal
          selectedDevice={selectedDevice}
          onClose={() => setSelectedDevice(null)}
        />
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

      {/* UPGRADE MODAL */}
      <SubscriptionLimitDialog
        open={showLimitDialog}
        limitInfo={limitInfo}
        onClose={() => setShowLimitDialog(false)}
        onUpgrade={() => {
          setShowLimitDialog(false);

          openPlansModal();
        }}
      />
    </div>
  );
}

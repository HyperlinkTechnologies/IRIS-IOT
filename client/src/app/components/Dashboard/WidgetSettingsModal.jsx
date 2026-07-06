import { useState, useEffect } from "react";

import { X, Save } from "lucide-react";

import WidgetSpecificSettings from "./WidgetSpecificSettings";

export default function WidgetSettingsModal({
  open,

  onClose,

  widget,

  dashboards,

  dashboardId,

  saveDashboards,
}) {
  /* ================= STATES ================= */

  const [formData, setFormData] = useState({
    title: "",

    deviceId: "",

    telemetryKey: "",

    unit: "%",

    color: "#ff5700",

    min: 0,

    max: 100,

    threshold: 0,

    refreshRate: 1000,

    defaultState: "OFF",

    controlMode: "readwrite",

    fontSize: "large",

    textAlign: "center",

    latitude: 12.9716,

    longitude: 77.5946,

    zoom: 13,

    mapMode: "single",

    showRouteHistory: true,

    geofenceEnabled: false,

    geofenceRadius: 500,
  });

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    if (widget) {
      setFormData({
        title: widget.title || "",

        deviceId: widget.deviceId || "",

        telemetryKey: widget.telemetryKey || "",

        unit: widget.unit || "%",

        color: widget.color || "#ff5700",

        min: widget.min ?? 0,

        max: widget.max ?? 100,

        threshold: widget.threshold ?? 0,

        refreshRate: widget.refreshRate ?? 1000,

        defaultState: widget.defaultState || "OFF",

        controlMode: widget.controlMode || "readwrite",

        fontSize: widget.fontSize || "large",

        textAlign: widget.textAlign || "center",

        latitude: widget.latitude ?? 12.9716,

        longitude: widget.longitude ?? 77.5946,

        zoom: widget.zoom ?? 13,

        mapMode: widget.mapMode || "single",

        showRouteHistory: widget.showRouteHistory ?? true,

        geofenceEnabled: widget.geofenceEnabled ?? false,

        geofenceRadius: widget.geofenceRadius ?? 500,
      });
    }
  }, [widget]);

  if (!open || !widget) return null;

  /* ================= SAVE ================= */

  const handleSave = () => {
    const updatedDashboards = dashboards.map((dashboard) => {
      if (dashboard.id === dashboardId) {
        return {
          ...dashboard,

          widgets: dashboard.widgets.map((item) => {
            if (item.id === widget.id) {
              return {
                ...item,

                ...formData,
              };
            }

            return item;
          }),
        };
      }

      return dashboard;
    });

    saveDashboards(updatedDashboards);

    onClose();
  };

  /* ================= DEVICES ================= */

  const devices = JSON.parse(localStorage.getItem("iris_devices")) || [];

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
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
            max-w-2xl
            shadow-2xl
            relative

            max-h-[90vh]

            flex
            flex-col

            overflow-hidden
        "
        >
        {/* CLOSE */}

        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            w-10
            h-10
            rounded-full
            hover:bg-gray-100
            flex
            items-center
            justify-center
            cursor-pointer
          "
        >
          <X size={22} />
        </button>

        <div
            className="
                p-8

                overflow-y-auto
                custom-scrollbar

                flex-1
            "
            >
          {/* HEADER */}

          <h2
            className="
              text-3xl
              font-bold
              mb-2
            "
          >
            Widget Settings
          </h2>

          <p
            className="
              text-gray-500
              mb-8
            "
          >
            Configure widget settings
          </p>

          {/* FORM */}

          <div className="space-y-6">
            {/* TITLE */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                "
              >
                Widget Title
              </label>

              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    title: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#ff5700]
                "
              />
            </div>

            {/* DEVICE */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                "
              >
                Device
              </label>

              <select
                value={formData.deviceId}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    deviceId: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#ff5700]
                "
              >
                <option value="">Select Device</option>

                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TELEMETRY */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                "
              >
                Telemetry Key
              </label>

              <input
                type="text"
                placeholder="temperature"
                value={formData.telemetryKey}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    telemetryKey: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#ff5700]
                "
              />
            </div>

            {/* UNIT */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                "
              >
                Unit
              </label>

              <input
                type="text"
                placeholder="%"
                value={formData.unit}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    unit: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-2xl
                  px-5
                  py-4
                  outline-none
                  focus:border-[#ff5700]
                "
              />
            </div>

            {/* SPECIFIC SETTINGS */}

            <div className="pt-4">

            <h3
                className="
                text-xl
                font-bold
                mb-6
                "
            >

                Widget Specific Settings

            </h3>

            <WidgetSpecificSettings

                widget={widget}

                formData={formData}

                setFormData={setFormData}

            />

            </div>

            {/* COLOR */}

            <div className="flex items-center justify-between">
              <label
                className="
                mb-2
                font-medium
                w-50
                "
              >
                Widget Color
              </label>

              <input
                type="color"
                value={formData.color}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    color: e.target.value,
                  })
                }
                className="w-full
                h-14
                rounded
                cursor-pointer
                overflow-visible
                "
              />
            </div>

            {/* MIN/MAX */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
            "
            >
              {/* MIN */}

              <div>
                <label
                  className="
                    block
                    mb-2
                    font-medium
                "
                >
                  Minimum Value
                </label>

                <input
                  type="number"
                  value={formData.min}
                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      min: Number(e.target.value),
                    })
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:border-[#ff5700]
                "
                />
              </div>

              {/* MAX */}

              <div>
                <label
                  className="
                    block
                    mb-2
                    font-medium
                "
                >
                  Maximum Value
                </label>

                <input
                  type="number"
                  value={formData.max}
                  onChange={(e) =>
                    setFormData({
                      ...formData,

                      max: Number(e.target.value),
                    })
                  }
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-2xl
                    px-5
                    py-4
                    outline-none
                    focus:border-[#ff5700]
                "
                />
              </div>
            </div>

            {/* THRESHOLD */}

            <div>
              <label
                className="
                block
                mb-2
                font-medium
                "
              >
                Threshold
              </label>

              <input
                type="number"
                value={formData.threshold}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    threshold: Number(e.target.value),
                  })
                }
                className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-[#ff5700]
                "
              />
            </div>

            {/* REFRESH RATE */}

            <div>
              <label
                className="
                block
                mb-2
                font-medium
                "
              >
                Refresh Rate (ms)
              </label>

              <input
                type="number"
                value={formData.refreshRate}
                onChange={(e) =>
                  setFormData({
                    ...formData,

                    refreshRate: Number(e.target.value),
                  })
                }
                className="
                w-full
                border
                border-gray-300
                rounded-2xl
                px-5
                py-4
                outline-none
                focus:border-[#ff5700]
                "
              />
            </div>
          </div>

          {/* FOOTER */}

          <div
            className="
              flex
              justify-end
              mt-10
            "
          >
            <button
              onClick={handleSave}
              className="
                flex
                items-center
                gap-2
                px-8
                py-4
                rounded-2xl
                bg-[#ff5700]
                text-white
                hover:opacity-90
                cursor-pointer
              "
            >
              <Save size={18} />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

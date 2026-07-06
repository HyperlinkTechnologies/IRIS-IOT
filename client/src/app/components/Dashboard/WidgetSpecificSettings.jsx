export default function WidgetSpecificSettings({

  widget,

  formData,

  setFormData,

}) {

  /* ================= COMMON INPUT ================= */

  const inputClass = `
    w-full
    border
    border-gray-300
    rounded-2xl
    px-5
    py-4
    outline-none
    focus:border-[#ff5700]
  `;

  /* ================= MAP SETTINGS ================= */

  if (widget.type === "map") {
    return (
      <div className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">
            Display Mode
          </label>
          <select
            value={formData.mapMode}
            onChange={(e) =>
              setFormData({
                ...formData,
                mapMode: e.target.value,
              })
            }
            className={inputClass}
          >
            <option value="single">Selected Device</option>
            <option value="fleet">All Live Devices</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              min="-90"
              max="90"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  latitude: Number(e.target.value),
                })
              }
              className={inputClass}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              min="-180"
              max="180"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  longitude: Number(e.target.value),
                })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Default Zoom ({formData.zoom})
          </label>
          <input
            type="range"
            min="2"
            max="19"
            value={formData.zoom}
            onChange={(e) =>
              setFormData({
                ...formData,
                zoom: Number(e.target.value),
              })
            }
            className="w-full accent-[#ff5700]"
          />
        </div>

        <label className="flex items-center gap-3 font-medium">
          <input
            type="checkbox"
            checked={formData.showRouteHistory}
            onChange={(e) =>
              setFormData({
                ...formData,
                showRouteHistory: e.target.checked,
              })
            }
            className="h-5 w-5 accent-[#ff5700]"
          />
          Show route history
        </label>

        <label className="flex items-center gap-3 font-medium">
          <input
            type="checkbox"
            checked={formData.geofenceEnabled}
            onChange={(e) =>
              setFormData({
                ...formData,
                geofenceEnabled: e.target.checked,
              })
            }
            className="h-5 w-5 accent-[#ff5700]"
          />
          Enable geofence
        </label>

        {formData.geofenceEnabled && (
          <div>
            <label className="block mb-2 font-medium">
              Geofence Radius (meters)
            </label>
            <input
              type="number"
              min="25"
              step="25"
              value={formData.geofenceRadius}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  geofenceRadius: Math.max(25, Number(e.target.value)),
                })
              }
              className={inputClass}
            />
          </div>
        )}
      </div>
    );
  }

  /* ================= GAUGE SETTINGS ================= */

  if (

    widget.type === "gauge" ||

    widget.type === "semicirclegauge" ||

    widget.type ===
      "verticalgauge" ||

    widget.type ===
      "horizontalgauge"

  ) {

    return (

      <div className="space-y-6">

        {/* MIN/MAX */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
          "
        >

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

                  min:
                    Number(
                      e.target.value
                    ),
                })
              }

              className={inputClass}

            />

          </div>

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

                  max:
                    Number(
                      e.target.value
                    ),
                })
              }

              className={inputClass}

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

                threshold:
                  Number(
                    e.target.value
                  ),
              })
            }

            className={inputClass}

          />

        </div>

      </div>
    );
  }

  /* ================= TOGGLE SETTINGS ================= */

  if (widget.type === "toggle") {

    return (

      <div className="space-y-6">

        {/* DEFAULT STATE */}

        <div>

          <label
            className="
              block
              mb-2
              font-medium
            "
          >

            Default State

          </label>

          <select

            value={
              formData.defaultState
            }

            onChange={(e) =>

              setFormData({

                ...formData,

                defaultState:
                  e.target.value,
              })
            }

            className={inputClass}

          >

            <option value="OFF">
              OFF
            </option>

            <option value="ON">
              ON
            </option>

          </select>

        </div>

        {/* MODE */}

        <div>

          <label
            className="
              block
              mb-2
              font-medium
            "
          >

            Control Mode

          </label>

          <select

            value={
              formData.controlMode
            }

            onChange={(e) =>

              setFormData({

                ...formData,

                controlMode:
                  e.target.value,
              })
            }

            className={inputClass}

          >

            <option value="read">
              Read Only
            </option>

            <option value="write">
              Write Only
            </option>

            <option value="readwrite">
              Read & Write
            </option>

          </select>

        </div>

      </div>
    );
  }

  /* ================= TEXT DISPLAY ================= */

  if (widget.type === "textdisplay") {

    return (

      <div className="space-y-6">

        {/* FONT SIZE */}

        <div>

          <label
            className="
              block
              mb-2
              font-medium
            "
          >

            Font Size

          </label>

          <select

            value={
              formData.fontSize
            }

            onChange={(e) =>

              setFormData({

                ...formData,

                fontSize:
                  e.target.value,
              })
            }

            className={inputClass}

          >

            <option value="small">
              Small
            </option>

            <option value="medium">
              Medium
            </option>

            <option value="large">
              Large
            </option>

          </select>

        </div>

        {/* ALIGNMENT */}

        <div>

          <label
            className="
              block
              mb-2
              font-medium
            "
          >

            Text Alignment

          </label>

          <select

            value={
              formData.textAlign
            }

            onChange={(e) =>

              setFormData({

                ...formData,

                textAlign:
                  e.target.value,
              })
            }

            className={inputClass}

          >

            <option value="left">
              Left
            </option>

            <option value="center">
              Center
            </option>

            <option value="right">
              Right
            </option>

          </select>

        </div>

      </div>
    );
  }

  return null;
}

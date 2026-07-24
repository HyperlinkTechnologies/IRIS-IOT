import { useEffect, useState } from "react";

import Modal from "./Modal";

import deviceRegistry from "../../core/devices/deviceRegistry";

export default function AlertModal({
  alert = null,
  onClose,
  onSave,
}) {

  const [devices, setDevices] = useState(
    deviceRegistry.getAll()
  );

  const [form, setForm] = useState(

  alert ?? {

    name: "",

    deviceId: "",

    telemetryKey: "",

    condition: ">",

    threshold: "",

    description: "",

    severity: "Warning",

    enabled: true,

  }

);

  useEffect(() => {

    const unsubscribe =
      deviceRegistry.subscribe(setDevices);

    return unsubscribe;

  }, []);

  return (

    <Modal
  title={
    alert
      ? "Edit Alert"
      : "Create Alert"
  }
  
  onClose={onClose}
    >

      <div className="space-y-4">

        {/* Alert Name */}

        <input
          type="text"
          placeholder="Alert Name"
          value={form.name}
          onChange={(e)=>

            setForm({

              ...form,

              name: e.target.value,

            })

          }
          className="w-full border rounded-xl px-4 py-3"
        />

        {/* Device */}

        <select
          value={form.deviceId}
          onChange={(e)=>

            setForm({

              ...form,

              deviceId: e.target.value,

            })

          }
          className="w-full border rounded-xl px-4 py-3"
        >

          <option value="">
            Select Device
          </option>

          {devices.map(device => (

            <option
              key={device.deviceId}
              value={device.deviceId}
            >
              {device.name}
            </option>

          ))}

        </select>

        {/* Telemetry */}

        <input
          type="text"
          placeholder="Telemetry Key"
          value={form.telemetryKey}
          onChange={(e)=>

            setForm({

              ...form,

              telemetryKey: e.target.value,

            })

          }
          className="w-full border rounded-xl px-4 py-3"
        />

        {/* Condition */}

        <select
          value={form.condition}
          onChange={(e)=>

            setForm({

              ...form,

              condition: e.target.value,

            })

          }
          className="w-full border rounded-xl px-4 py-3"
        >

          <option value=">">Greater Than</option>

          <option value="<">Less Than</option>

          <option value="=">Equal To</option>

        </select>

        {/* Threshold */}

        <input
          type="number"
          placeholder="Threshold"
          value={form.threshold}
          onChange={(e)=>

            setForm({

              ...form,

              threshold: e.target.value,

            })

          }
          className="w-full border rounded-xl px-4 py-3"
        />

        <div>
          
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              placeholder="Description: Boiler temperature exceeded the safe operating limit."
              className="w-full rounded-lg border px-3 py-2"
            />
        </div>

        {/* Severity */}

        <select
          value={form.severity}
          onChange={(e)=>

            setForm({

              ...form,

              severity: e.target.value,

            })

          }
          className="w-full border rounded-xl px-4 py-3"
        >

          <option>
            Warning
          </option>

          <option>
            Critical
          </option>

        </select>

        {/* Save */}

        <button
          onClick={() => onSave(form)}
          className="
            w-full
            py-3
            rounded-xl
            bg-[#ff5700]
            text-white
            font-medium
          "
        >

          {alert
  ? "Update Alert"
  : "Save Alert"}


        </button>

      </div>

    </Modal>

  );

}
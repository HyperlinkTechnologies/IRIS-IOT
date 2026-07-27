import { useState } from "react";
import { X } from "lucide-react";

export default function CreateDashboardModal({ open, onClose, onCreate, devices, }) {
  const [formData, setFormData] = useState({
    name: "",
    device: "",
  });

  if (!open) return null;

  const handleSubmit = () => {
    if (!formData.name) return;

    onCreate({
      dashboardId: Date.now().toString(),
      ...formData,
      widgets: [],
    });

    setFormData({
      name: "",
      device: "",
    });

    onClose();

  };
  

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
        p-3
        sm:p-6
      "
    >
      {/* Modal */}

      <div
        className="
          relative
          bg-white
          w-full
          max-w-3xl
          rounded-2xl
          sm:rounded-3xl
          shadow-2xl
          max-h-[95vh]
          overflow-y-auto
        "
      >
        {/* Content */}

        <div
          className="
            p-5
            sm:p-8
            lg:p-10
          "
        >
          {/* Close */}

          <button
            onClick={onClose}
            className="
              absolute
              top-4
              right-4
              sm:top-5
              sm:right-5
              w-10
              h-10
              rounded-full
              flex
              items-center
              justify-center
              hover:bg-gray-100
              transition-all
              cursor-pointer
            "
          >
            <X size={22} />
          </button>

          {/* Header */}

          <div className="pr-10">
            <h2
              className="
                text-2xl
                sm:text-3xl
                font-bold
                text-[#010c29]
                mb-2
              "
            >
              Create Dashboard
            </h2>

            <p
              className="
                text-sm
                sm:text-base
                text-gray-500
                mb-8
              "
            >
              Configure your IoT monitoring dashboard
            </p>
          </div>

          {/* Form */}

          <div className="space-y-5 sm:space-y-6">
            {/* Dashboard Name */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-sm
                  sm:text-base
                "
              >
                Dashboard Name
              </label>

              <input
                type="text"
                placeholder="Factory Monitoring"
                value={formData.name}
                required
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  sm:rounded-2xl
                  px-4
                  sm:px-5
                  py-3
                  sm:py-4
                  outline-none
                  text-sm
                  sm:text-base
                  focus:border-[#ff5700]
                  transition-all
                "
              />
            </div>

            {/* Device */}

            <div>
              <label
                className="
                  block
                  mb-2
                  font-medium
                  text-sm
                  sm:text-base
                "
              >
                Select Device
              </label>

              <select
                value={formData.device}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    device: e.target.value,
                  })
                }
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  sm:rounded-2xl
                  px-4
                  sm:px-5
                  py-3
                  sm:py-4
                  outline-none
                  text-sm
                  sm:text-base
                  focus:border-[#ff5700]
                  transition-all
                "
              >
                <option value="">
                  Select Device
                </option>

                {devices.length > 0 ? (

                  devices.map((device) => (

                    <option
  key={device.deviceId}
  value={device.deviceId}
>
  {device.name} ({device.deviceId})
</option>
                  ))

                ) : (

                  <option disabled>
                    No Devices Available
                  </option>

                )}
              </select>
            </div>

            
          </div>

          {/* Footer Buttons */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-end
              gap-3
              mt-8
            "
          >
            {/* Cancel */}

            <button
              onClick={onClose}
              className="
                w-full
                sm:w-auto
                px-6
                py-3
                rounded-xl
                border
                border-gray-300
                hover:bg-gray-100
                transition-all
                cursor-pointer
                text-sm
                sm:text-base
              "
            >
              Cancel
            </button>

            {/* Create */}

            <button
              onClick={handleSubmit}
              className="
                w-full
                sm:w-auto
                px-8
                py-3
                rounded-xl
                bg-linear-to-r
                from-[#d84800]
                to-[#ff5700]
                text-white
                hover:opacity-90
                transition-all
                cursor-pointer
                text-sm
                sm:text-base
                font-medium
              "
            >
              Create Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

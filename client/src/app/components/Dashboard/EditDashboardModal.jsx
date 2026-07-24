import { useState, useEffect }
from "react";

import { X }
from "lucide-react";

export default function EditDashboardModal({

  open,

  onClose,

  dashboard,

  dashboards,

  saveDashboards,

  devices,

}) {

  const [
    formData,

    setFormData,

  ] = useState({

    name: "",

    device: "",
  });

  /* ================= LOAD DATA ================= */

  useEffect(() => {

    if (dashboard) {

      setFormData({

        name:
          dashboard.name || "",

        device:
          dashboard.device || "",
      });
    }

  }, [dashboard]);

  if (!open || !dashboard)
    return null;

  /* ================= SAVE ================= */

  const handleSave = () => {

    if (!formData.name)
      return;

    const updatedDashboards =
      dashboards.map(
        (item) => {

          if (
            item.id ===
            dashboard.id
          ) {

            return {

              ...item,

              name:
                formData.name,

              device:
                formData.device,
            };
          }

          return item;
        }
      );

    saveDashboards(
      updatedDashboards
    );

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

        <div className="p-8">

          {/* HEADER */}

          <h2
            className="
              text-3xl
              font-bold
              mb-2
            "
          >

            Edit Dashboard

          </h2>

          <p
            className="
              text-gray-500
              mb-8
            "
          >

            Update dashboard details

          </p>

          {/* FORM */}

          <div className="space-y-6">

            {/* NAME */}

            <div>

              <label
                className="
                  block
                  mb-2
                  font-medium
                "
              >

                Dashboard Name

              </label>

              <input

                type="text"

                value={formData.name}

                onChange={(e) =>

                  setFormData({

                    ...formData,

                    name:
                      e.target.value,
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

                Select Device

              </label>

              <select

                value={formData.device}

                onChange={(e) =>

                  setFormData({

                    ...formData,

                    device:
                      e.target.value,
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

                <option value="">
                  Select Device
                </option>

                {devices.map(
                  (device) => (

                    <option
  key={device.deviceId}
  value={device.deviceId}
>
  {device.name} ({device.deviceId})
</option>
                  )
                )}

              </select>

            </div>

          </div>

          {/* FOOTER */}

          <div
            className="
              flex
              justify-end
              gap-4
              mt-10
            "
          >

            <button

              onClick={onClose}

              className="
                px-6
                py-3
                rounded-2xl
                border
                border-gray-300
                hover:bg-gray-100
                cursor-pointer
              "
            >

              Cancel

            </button>

            <button

              onClick={handleSave}

              className="
                px-8
                py-3
                rounded-2xl
                bg-[#ff5700]
                text-white
                hover:opacity-90
                cursor-pointer
              "
            >

              Save Changes

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
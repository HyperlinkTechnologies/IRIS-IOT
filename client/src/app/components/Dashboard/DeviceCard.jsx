import { Wifi, WifiOff, Activity, Pencil, Trash2 } from "lucide-react";
import useTelemetry from "../../hooks/useTelemetry";

export default function DeviceCard({ device, onDetails, onEdit, onDelete }) {
  const telemetry = useTelemetry(device.deviceId);

  return (
    <div
      className="
        bg-black/5
        border
        border-black/10
        rounded-3xl
        p-5
        shadow-md
      "
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold">{device.name}</h3>

            {telemetry?.online ? (
              <Wifi className="text-green-500" />
            ) : (
              <WifiOff className="text-red-500" />
            )}
          </div>

          <p className="text-gray-500 mt-1">{device.deviceId}</p>

          <p className="text-sm text-gray-400 mt-2">{device.location}</p>

        </div>

        <div className="flex gap-3">
          <button
            onClick={onDetails}
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
            onClick={onEdit}
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
            onClick={onDelete}
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
  );
}

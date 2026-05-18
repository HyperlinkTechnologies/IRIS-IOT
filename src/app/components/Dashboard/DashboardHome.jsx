import {
  LayoutDashboard
} from "lucide-react";

export default function DashboardHome() {

  return (

    <div
      className="
        w-full
      "
    >

      {/* ================= EMPTY DASHBOARD ================= */}

      <div
  className="
    border
    border-dashed
    border-gray-300
    rounded-2xl
    sm:rounded-3xl

    min-h-[70vh]
    lg:min-h-[calc(100vh-160px)]

    flex
    flex-col
    items-center
    justify-center

    bg-black/5

    px-6
    sm:px-10

    text-center
  "
>

        {/* Icon */}
        <div
          className="
            w-20
            h-20
            sm:w-24
            sm:h-24
            rounded-2xl
            bg-orange-500/10
            border
            border-orange-500/20
            flex
            items-center
            justify-center
            mb-5
            sm:mb-6
          "
        >

          <LayoutDashboard
            size={40}
            className="text-[#ff5700]"
          />

        </div>

        {/* Title */}
        <h3
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            mb-3
            text-[#010c29]
            leading-tight
          "
        >
          Dashboard is Empty
        </h3>

        {/* Subtitle */}
        <p
          className="
            text-gray-500
            text-sm
            sm:text-base
            lg:text-lg
            mb-6
            sm:mb-8
            max-w-125
            leading-relaxed
          "
        >
          Click the edit dashboard button to add widgets,
          analytics and live monitoring components.
        </p>

        {/* Button */}
        <button
          className="
            px-6
            sm:px-8
            py-3
            sm:py-4
            rounded-xl
            bg-linear-to-r
            from-[#d84800]
            to-[#ff5700]
            hover:opacity-90
            transition-all
            duration-300
            text-white
            cursor-pointer
            hover:scale-105
            font-medium
            text-sm
            sm:text-base
            shadow-lg
          "
        >
          Edit Dashboard
        </button>

      </div>

    </div>
  );
}
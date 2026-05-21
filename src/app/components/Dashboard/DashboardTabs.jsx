import { ChevronDown } from "lucide-react";

import { useState } from "react";

export default function DashboardTabs({
  dashboards,

  activeDashboard,

  setActiveDashboard,
}) {
  const [open, setOpen] = useState(false);

  const currentDashboard = dashboards.find(
    (dash) => dash.id === activeDashboard,
  );

  return (
    <div className="relative mb-6 flex items-center justify-between gap-4">
      {/* ================= SELECT BUTTON ================= */}

      <button
        onClick={() => setOpen(!open)}
        className="
          min-w-55
          px-5
          py-2
          rounded-lg
          bg-white
          border
          border-black/10
          shadow-sm
          flex
          items-center
          justify-between
          gap-4
          hover:border-[#ff5700]/40
          transition-all
          cursor-pointer
        "
      >
        <span
          className="
            font-semibold
            text-[#010c29]
            truncate
          "
        >
          {currentDashboard?.name || "Select Dashboard"}
        </span>

        <ChevronDown
          size={20}
          className={`
            transition-all
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* ================= DROPDOWN ================= */}
         
      {open && (
        <div
          className="
            absolute
            top-16
            left-0
            w-150
            bg-white
            border
            border-black/10
            rounded-2xl
            shadow-xl
            overflow-hidden
            z-50
          "
        >
          {dashboards.map((dashboard) => (
            <button
              key={dashboard.id}
              onClick={() => {
                setActiveDashboard(dashboard.id);

                setOpen(false);
              }}
              className={`
                  w-full
                  text-left
                  px-5
                  py-3
                  transition-all
                  cursor-pointer
                  border-b
                  border-black/5
                  last:border-none
                  ${
                    activeDashboard === dashboard.id
                      ? "bg-[#ff5700] text-white"
                      : "hover:bg-orange-50 text-[#010c29]"
                  }
                `}
            >
              {dashboard.name}
            </button>
          ))}
        </div>
      )}
      {/* Top Actions */}

      <div
        className="
          flex
          justify-center
          items-center
        "
      >
        <button
          onClick={() => setModalOpen(true)}
          className="
            text-sm
            px-6
            py-3
            rounded-xl
            bg-[#ff5700]
            text-white
            hover:opacity-90
            cursor-pointer
            sm:text-base
          "
        >
          + New Dashboard
        </button>
      </div>

    </div>
  );
}

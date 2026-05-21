import { Trash2, Plus } from "lucide-react";

import DashboardGrid from "./DashboardGrid";

export default function DashboardCanvas({
  dashboard,
  onDeleteDashboard,
  onOpenWidgetModal,
  onDeleteWidget,
  layouts,
  handleSaveLayouts,
}) {

  if (!dashboard) return null;

  return (

    <div>

      {/* ================= HEADER ================= */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-5
          mb-8
        "
      >

        {/* ================= LEFT ================= */}

        <div>

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
            "
          >
            {dashboard.name}
          </h2>

          <p
            className="
              text-gray-500
              mt-2
              text-sm
              sm:text-base
            "
          >
            {dashboard.description}
          </p>

        </div>

        {/* ================= ACTIONS ================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
          "
        >

          {/* ================= ADD WIDGET ================= */}

          <button
            onClick={onOpenWidgetModal}
            className="
              px-6
              py-3
              rounded-xl
              bg-white
              text-[#ff5700]
              border
              border-[#ff5700]
              hover:shadow-[0px_5px_10px_#ff5700]
              flex
              items-center
              justify-center
              gap-2
              cursor-pointer
              hover:opacity-90
              transition-all
            "
          >

            <Plus size={18} />

            Add Widget

          </button>

          {/* ================= DELETE DASHBOARD ================= */}

          <button
            onClick={() =>
              onDeleteDashboard(
                dashboard.id
              )
            }
            className="
              px-6
              py-3
              rounded-xl
              bg-red-500
              text-white
              flex
              items-center
              justify-center
              gap-2
              cursor-pointer
              hover:bg-red-600
              hover:-translate-y-1
              transition-all
            "
          >

            <Trash2 size={18} />

            Delete Dashboard

          </button>

        </div>

      </div>

      {/* ================= EMPTY STATE ================= */}

      {dashboard.widgets.length === 0 && (

        <div
          className="
            border
            border-dashed
            border-gray-300
            rounded-3xl
            h-screen
             -150px
            flex
            flex-col
            items-center
            justify-center
            bg-black/5
            px-6
            text-center
          "
        >

          <div>

            <h3
              className="
                text-2xl
                font-bold
                mb-3
              "
            >
              No Widgets Added
            </h3>

            <p className="text-gray-500">

              Click "Add Widget"
              to start building
              your dashboard

            </p>

          </div>

        </div>

      ) }

      {/* ================= GRID ================= */}

      {dashboard.widgets.length > 0 && (
        <div className="bg-black/2 rounded-3xl  p-4 border border-dashed border-gray-200">

        <DashboardGrid
          widgets={dashboard.widgets}
          onDeleteWidget={
            onDeleteWidget
          }
          layouts={layouts}
          setLayouts={
            handleSaveLayouts
          }
        />
        </div>

      )}

    </div>
  );
}
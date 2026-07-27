import DashboardGrid
from "./DashboardGrid";

export default function DashboardCanvas({

  dashboard,

  dashboards,

  saveDashboards,

  onDeleteWidget,

  layouts,

  handleSaveLayouts,

}) {

  if (!dashboard)
    return null;

  return (

    <div>

      {/* EMPTY STATE */}

      {dashboard.widgets.length === 0 && (

        <div
          className="
            border
            border-dashed
            border-gray-300
            rounded-3xl
            h-screen
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

      )}

      {/* GRID */}

      {dashboard.widgets.length > 0 && (

        <div
          className="
            bg-black/2
            rounded-3xl
            p-4
            border
            border-dashed
            border-gray-200
          "
        >

          <DashboardGrid

            widgets={
              dashboard.widgets
            }

            dashboards={
              dashboards
            }

            dashboardId={
              dashboard.dashboardId
            }

            saveDashboards={
              saveDashboards
            }

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
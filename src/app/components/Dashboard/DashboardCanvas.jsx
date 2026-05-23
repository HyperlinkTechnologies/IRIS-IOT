import DashboardGrid
from "./DashboardGrid";

export default function DashboardCanvas({

  dashboard,

  dashboards,

  saveDashboards,

  onDeleteWidget,

}) {

  if (!dashboard) return null;

  /* ================= SAVE LAYOUTS ================= */

  const handleSaveLayouts = (
    updatedLayouts
  ) => {

    const updatedDashboards =
      dashboards.map(
        (item) => {

          if (
            item.id === dashboard.id
          ) {

            return {

              ...item,

              widgets:
                item.widgets.map(
                  (widget) => {

                    const newLayout =
                      updatedLayouts.find(
                        (layout) =>

                          layout.i ===
                          widget.id.toString()
                      );

                    return {

                      ...widget,

                      layout:
                        newLayout
                          ? {

                              x:
                                newLayout.x,

                              y:
                                newLayout.y,

                              w:
                                newLayout.w,

                              h:
                                newLayout.h,

                              minW:
                                newLayout.minW,

                              minH:
                                newLayout.minH,
                            }

                          : widget.layout,
                    };
                  }
                ),
            };
          }

          return item;
        }
      );

    /* ================= SAVE ================= */

    saveDashboards(
      updatedDashboards
    );
  };

  /* ================= GENERATE LAYOUTS ================= */

  const layouts =
    dashboard.widgets.map(
      (widget) => ({

        i:
          widget.id.toString(),

        x:
          widget.layout?.x ?? 0,

        y:
          widget.layout?.y ?? 0,

        w:
          widget.layout?.w ?? 4,

        h:
          widget.layout?.h ?? 6,

        minW:
          widget.layout?.minW ?? 2,

        minH:
          widget.layout?.minH ?? 4,
      })
    );

  return (

    <div>

      {/* ================= EMPTY STATE ================= */}

      {dashboard.widgets.length === 0 && (

        <div
          className="
            border
            border-dashed
            border-gray-300
            rounded-3xl
            h-[70vh]
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

      {/* ================= GRID ================= */}

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
import {
  useState,
} from "react";

import {
  ArrowLeft,
  Plus,
} from "lucide-react";

import DashboardCanvas
from "../../components/Dashboard/DashboardCanvas";

import AddWidgetModal
from "../../components/Dashboard/AddWidgetModal";

export default function DashboardWorkspace({

  dashboard,

  dashboards,

  saveDashboards,

  onBack,

  onSwitchDashboard,

}) {

  /* ================= STATES ================= */

  const [
    widgetModalOpen,
    setWidgetModalOpen,
  ] = useState(false);



  /* ================= ADD WIDGET ================= */

  const handleAddWidget = (
    widget
  ) => {

    const updatedDashboards =
      dashboards.map(
        (item) => {

          if (
            item.id ===
            dashboard.id
          ) {
              /* ================= AUTO POSITION ================= */

            const widgetCount = item.widgets.length;

            const widgetsPerRow = 3;

            const widgetWidth = 3;

            return {

              ...item,

              widgets: [

                ...item.widgets,

                {

                  id:
                    Date.now(),

                  widgetId:
                    `${widget.type}_${Date.now()}`,

                  type:
                    widget.type,

                  title:
                    widget.title,

                  value: 0,

                  layout: {

                    x:
                    (widgetCount % widgetsPerRow)
                    * widgetWidth,

                    y:
                    Math.floor(
                        widgetCount / widgetsPerRow
                    ) * 6,

                    w: 3,

                    h: 6,
                    },
                },
              ],
            };
          }

          return item;
        }
      );

    saveDashboards(
      updatedDashboards
    );
  };

  /* ================= DELETE WIDGET ================= */

  const handleDeleteWidget = (
    widgetId
  ) => {

    const updatedDashboards =
      dashboards.map(
        (item) => {

          if (
            item.id ===
            dashboard.id
          ) {

            return {

              ...item,

              widgets:
                item.widgets.filter(

                  (widget) =>

                    widget.id !==
                    widgetId
                ),
            };
          }

          return item;
        }
      );

    saveDashboards(
      updatedDashboards
    );
  };

  /* ================= CURRENT DASHBOARD ================= */

  const currentDashboard =
    dashboards.find(

      (item) =>
        item.id ===
        dashboard.id
    );

  return (

    <div className="w-full custom-scrollbar">

      {/* ================= HEADER ================= */}
      <button

            onClick={onBack}

            className="
              flex
              items-center
              gap-2
              text-gray-500
              mb-4
              cursor-pointer
              hover:bg-gray-100/90
              px-4 py-3 rounded-full
            "
          >

            <ArrowLeft
              size={18}
            />

            Back

          </button>

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

        {/* LEFT */}
        

        <div
            className="
                flex
                flex-col
                gap-3
            "
            >

            <p
                className="
                text-sm
                text-gray-500
                font-medium
                "
            >

                Select Dashboard

            </p>

            <select

                value={
                currentDashboard?.id || ""
                }

                onChange={(e) => {

                const selected =
                    dashboards.find(

                    (item) =>

                        item.id.toString() ===
                        e.target.value
                    );

                onSwitchDashboard(
                    selected
                );
                }}

                className="
                px-5
                py-3
                rounded-lg
                border
                border-black/10
                bg-white
                min-w-70
                outline-none
                focus:border-[#ff5700]
                shadow-sm
                font-medium
                cursor-pointer
                "
            >

                {dashboards.map(
                (item) => (

                    <option
                    key={item.id}
                    value={item.id}
                    >

                    {item.name}

                    </option>
                )
                )}

            </select>

            </div>

        {/* RIGHT */}

        <button

          onClick={() =>
            setWidgetModalOpen(true)
          }

          className="
            flex
            items-center
            justify-center
            gap-2
            px-6
            py-3
            rounded-2xl
            bg-[#ff5700]
            text-white
            font-medium
            hover:opacity-90
            cursor-pointer
          "
        >

          <Plus size={20} />

          Add Widget

        </button>

      </div>

      {/* ================= DASHBOARD ================= */}

      <DashboardCanvas

        dashboard={
          currentDashboard
        }

        dashboards={
          dashboards
        }

        saveDashboards={
          saveDashboards
        }

        onDeleteWidget={
          handleDeleteWidget
        }

        layouts={
          currentDashboard?.widgets?.map(
            (widget) => ({

              i:
                widget.id.toString(),

              ...(widget.layout || {}),
            })
          )
        }

        handleSaveLayouts={(
          updatedLayouts
        ) => {

          const updatedDashboards =
            dashboards.map(
              (item) => {

                if (
                  item.id ===
                  dashboard.id
                ) {

                  return {

                    ...item,

                    widgets:
                      item.widgets.map(
                        (widget) => {

                          const layout =
                            updatedLayouts.find(
                              (layoutItem) =>

                                layoutItem.i ===
                                widget.id.toString()
                            );

                          return {

                            ...widget,

                            layout:
                              layout || widget.layout,
                          };
                        }
                      ),
                  };
                }

                return item;
              }
            );

          saveDashboards(
            updatedDashboards
          );
        }}

      />

      {/* ================= MODAL ================= */}

      <AddWidgetModal

        open={widgetModalOpen}

        onClose={() =>
          setWidgetModalOpen(false)
        }

        onAddWidget={
          handleAddWidget
        }

      />

    </div>
  );
}
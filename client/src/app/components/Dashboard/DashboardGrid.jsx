import {
  Responsive,
} from "react-grid-layout";

import { useState } from "react";

import "react-grid-layout/css/styles.css";

import "react-resizable/css/styles.css";

import {
  Settings2,
  Trash2,
} from "lucide-react";

import WidgetRenderer
from "../Widgets/WidgetRender";

import WidgetSettingsModal from "../Widgets/WidgetSettingsModal";

/* ================= GRID ================= */

export default function DashboardGrid({

   widgets,

  dashboards,

  dashboardId,

  saveDashboards,

  onDeleteWidget,

  layouts = [],

  setLayouts,


}) {

  /* ================= SAVE LAYOUT ================= */

  const handleLayoutChange = (currentLayout) => {
  const updatedDashboards = dashboards.map((dashboard) => {
    if (dashboard.dashboardId !== dashboardId) {
      return dashboard;
    }

    return {
      ...dashboard,
      widgets: dashboard.widgets.map((widget) => {
        const layout = currentLayout.find(
          (item) => item.i === widget.widgetId.toString()
        );

        if (!layout) return widget;

        return {
          ...widget,
          layout: {
            x: layout.x,
            y: layout.y,
            w: layout.w,
            h: layout.h,
            minW: layout.minW,
            minH: layout.minH,
          },
        };
      }),
    };
  });

  saveDashboards(updatedDashboards);
};

  const [

    settingsOpen,

    setSettingsOpen,

  ] = useState(false);

  const [

    selectedWidget,

    setSelectedWidget,

  ] = useState(null);

  return (

    <div className="w-full">

      <Responsive

        className="layout"

        layouts={{
          lg: layouts,
        }}

        breakpoints={{
          lg: 1400,
          md: 1024,
          sm: 768,
          xs: 480,
          xxs: 0,
        }}

        cols={{
          lg: 12,
          md: 10,
          sm: 6,
          xs: 4,
          xxs: 2,
        }}

        rowHeight={30}

        width={1200}

        autoSize={true}

        measureBeforeMount={false}

        useCSSTransforms={true}

        onLayoutChange={
          handleLayoutChange
        }

        draggableHandle=".drag-handle"

        draggableCancel=".no-drag"

        isResizable={true}

        isDraggable={true}

        compactType="vertical"

        preventCollision={false}

        margin={[10, 10]}

        containerPadding={[0, 0]}

        resizeHandles={["se"]}

      >

        {widgets.map((widget) => (

          <div

            key={widget.widgetId.toString()}

            data-grid={{

            i:
              widget.widgetId.toString(),

            x:
              widget.layout?.x || 0,

            y:
              widget.layout?.y || 0,

            w:
              widget.layout?.w || 3,

            h:
              widget.layout?.h || 6,

            minW:
              widget.layout?.minW || 2,

            minH:
              widget.layout?.minH || 5,
          }}

            className="
              bg-white
              rounded-2xl
              overflow-hidden
              border
              border-black/10
              shadow-lg
              flex
              flex-col
              relative
              h-full
              w-full
            "
          >

            {/* ================= HEADER ================= */}

            <div
              className="
                drag-handle
                h-14
                px-5
                py-3
                flex
                items-center
                justify-between
                border-b
                border-black/5
                cursor-move
                bg-gray-50
                shrink-0
              "
            >

              {/* TITLE */}

              <h3
                className="
                  font-bold
                  truncate
                  text-sm
                  sm:text-base
                "
              >

                {widget.title}

              </h3>

              <div className="flex items-center gap-2">

                {/* SETTINGS */}

                <button

                  onClick={(e) => {

                    e.preventDefault();

                    e.stopPropagation();

                    setSelectedWidget(widget);

                    setSettingsOpen(true);
                  }}

                  className="
                    no-drag
                    text-gray-500
                    cursor-pointer
                    hover:bg-gray-100
                    p-2
                    rounded-full
                    transition-all
                  "
                >

                  <Settings2 size={18} />

                </button>

                {/* DELETE */}

                <button

                  onClick={(e) => {

                    e.preventDefault();

                    e.stopPropagation();

                    onDeleteWidget(
                      widget.widgetId
                    );
                  }}

                  className="
                    no-drag
                    text-red-500
                    cursor-pointer
                    hover:bg-red-100
                    p-2
                    rounded-full
                    relative
                    z-50
                    transition-all
                    shrink-0
                  "
                >

                  <Trash2 size={18} />

                </button>

              </div>

            </div>

            {/* ================= CONTENT ================= */}

            <div
              className="
                flex-1
                w-full
                h-full
                flex
                items-center
                justify-center
                overflow-hidden
                p-2
                sm:p-3
                md:p-4
              "
            >

              <div
                className="
                  w-full
                  h-full
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                "
              >

                <WidgetRenderer
                  widget={widget}
                />

              </div>

            </div>

            {/* ================= RESIZE HANDLE ================= */}

            <div
              className="
                absolute
                bottom-2
                right-2
                w-4
                h-4
                opacity-70
                pointer-events-none
              "
            >

              <div
                className="
                  w-full
                  h-full
                  border-r-2
                  border-b-2
                  border-gray-400
                "
              />

            </div>

          </div>

        ))}

      </Responsive>

      <WidgetSettingsModal

        open={settingsOpen}

        onClose={() =>
          setSettingsOpen(false)
        }

        widget={selectedWidget}

        dashboards={dashboards}

        dashboardId={dashboardId}

        saveDashboards={
          saveDashboards
        }

      />

    </div>
  );
}
import { Responsive } from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { Trash2 } from "lucide-react";

import WidgetRenderer from "./WidgetRender";

/* ================= GRID ================= */

export default function DashboardGrid({
  widgets,
  onDeleteWidget,
  layouts,
  setLayouts,
}) {

  /* ================= SAVE LAYOUT ================= */

  const handleLayoutChange = (
    currentLayout
  ) => {

    setLayouts(currentLayout);
  };

  return (
    <div className="w-full">
      <Responsive
        className="layout"
        layouts={{
          lg: layouts,
        }}
        breakpoints={{
          lg: 1200,
          md: 996,
          sm: 768,
          xs: 480,
        }}
        cols={{
          lg: 12,
          md: 10,
          sm: 6,
          xs: 2,
        }}
        rowHeight={30}
        width={1200}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        isResizable={true}
        isDraggable={true}
        compactType="vertical"
        preventCollision={false}
        margin={[20, 20]}
      >
        {widgets.map((widget) => (
          <div
            key={widget.id.toString()}
            data-grid={{
              x: widget.layout?.x || 0,

              y: widget.layout?.y || 0,

              w: widget.layout?.w || 4,

              h: widget.layout?.h || 8,

              minW: widget.layout?.minW || 3,

              minH: widget.layout?.minH || 5,
            }}
            className="
                bg-white
                rounded-4xl
                overflow-hidden
                border
                border-black/10
                shadow-lg
                h-full
                w-full
                flex
                flex-col
            "
          >
            {/* ================= HEADER ================= */}

            <div
              className="
                drag-handle
                h-14
                px-5
                flex
                items-center
                justify-between
                border-b
                border-black/5
                cursor-move
                bg-gray-50
              "
            >
              <h3 className="font-bold">{widget.title}</h3>

              {/* ================= DELETE ================= */}

              <button
                onClick={() => onDeleteWidget(widget.id)}
                className="
                  text-red-500
                  cursor-pointer
                  hover:bg-red-100
                  p-2
                  rounded-full
                "
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* ================= CONTENT ================= */}

            <div
                className="
                    flex-1
                    p-4
                    h-[calc(100%-56px)]
                "
                >
              <WidgetRenderer widget={widget} />
            </div>
          </div>
        ))}
      </Responsive>
    </div>
  );
}
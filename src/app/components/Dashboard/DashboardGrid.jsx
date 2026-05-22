import { Responsive } from "react-grid-layout";

import "react-grid-layout/css/styles.css";

import "react-resizable/css/styles.css";

import { Trash2 }
from "lucide-react";

import WidgetRenderer
from "./WidgetRender";

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
          lg: 18,
          md: 15,
          sm: 8,
          xs: 5,
        }}

        rowHeight={30}

        width={1300}

        onLayoutChange={
          handleLayoutChange
        }

        draggableHandle=".drag-handle"

        draggableCancel=".no-drag"

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

              x:
                widget.layout?.x || 0,

              y:
                widget.layout?.y || 0,

              w:
                widget.layout?.w || 4,

              h:
                widget.layout?.h || 6,

              minW:
                widget.layout?.minW || 3,

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
              "
            >

              <h3 className="font-bold">

                {widget.title}

              </h3>

              {/* ================= DELETE ================= */}

              <button

                onClick={(e) => {

                  e.preventDefault();

                  e.stopPropagation();

                  onDeleteWidget(
                    widget.id
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
                "
              >

                <Trash2 size={18} />

              </button>

            </div>

            {/* ================= CONTENT ================= */}

            <div
              className="
                w-full
                h-full
                flex
                justify-center
                overflow-hidden
              "
            >

              <WidgetRenderer
                widget={widget}
              />

            </div>

            {/* ================= RESIZE HANDLE ================= */}

            <div
              className="
                absolute
                bottom-2
                right-2
                w-5
                h-5
                opacity-60
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

    </div>
  );
}
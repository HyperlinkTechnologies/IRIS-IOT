import { X } from "lucide-react";

const widgetOptions = [

  {
    type: "temperature",
    title: "Temperature Widget",
  },

  {
    type: "pressure",
    title: "Pressure Widget",
  },

  {
    type: "gauge",
    title: "Gauge Widget",
  },

  {
    type: "status",
    title: "Device Status",
  },

  {
    type: "chart",
    title: "Line Chart",
  },

];

export default function AddWidgetModal({
  open,
  onClose,
  onAddWidget,
}) {

  if (!open) return null;

  return (

    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >

      {/* Modal */}

      <div
        className="
          bg-white
          w-full
          max-w-2xl
          rounded-3xl
          p-6
          sm:p-8
          relative
          max-h-[90vh]
          overflow-y-auto
        "
      >

        {/* Close */}

        <button
          onClick={onClose}
          className="
            absolute
            top-5
            right-5
            p-2
            rounded-full
            hover:bg-gray-100
            cursor-pointer
          "
        >

          <X />

        </button>

        {/* Title */}

        <h2
          className="
            text-2xl
            sm:text-3xl
            font-bold
            mb-2
          "
        >
          Add Widget
        </h2>

        <p
          className="
            text-gray-500
            mb-8
            text-sm
            sm:text-base
          "
        >
          Select widgets for your dashboard
        </p>

        {/* Widgets */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-5
          "
        >

          {widgetOptions.map((widget) => (

            <button
              key={widget.type}
              onClick={() => {

                onAddWidget({
                  id: Date.now(),
                  type: widget.type,
                  title: widget.title,
                });

                onClose();
              }}
              className="
                p-6
                rounded-2xl
                border
                border-gray-300
                hover:border-[#ff5700]
                hover:bg-orange-50
                transition-all
                text-left
                cursor-pointer
              "
            >

              <h3
                className="
                  font-bold
                  text-lg
                "
              >
                {widget.title}
              </h3>

              <p
                className="
                  text-gray-500
                  text-sm
                  mt-2
                "
              >
                Click to add widget
              </p>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
}
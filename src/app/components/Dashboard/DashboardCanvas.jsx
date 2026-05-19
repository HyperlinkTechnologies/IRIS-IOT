import {
  Trash2,
  Plus,
} from "lucide-react";

export default function DashboardCanvas({
  dashboard,
  onDeleteDashboard,
  onOpenWidgetModal,
  onDeleteWidget,
}) {

  if (!dashboard) return null;

  return (

    <div>

      {/* Header */}

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

        {/* Left */}

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

        {/* Actions */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-3
          "
        >

          {/* Add Widget */}

          <button
            onClick={onOpenWidgetModal}
            className="
              px-6
              py-3
              rounded-xl
              bg-[#ff5700]
              text-white
              flex
              items-center
              justify-center
              gap-2
              cursor-pointer
              hover:opacity-90
            "
          >

            <Plus size={18} />

            Add Widget

          </button>

          {/* Delete Dashboard */}

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
            "
          >

            <Trash2 size={18} />

            Delete Dashboard

          </button>

        </div>

      </div>

      {/* Empty State */}

      {dashboard.widgets.length === 0 && (

        <div
          className="
            border
            border-dashed
            border-gray-300
            rounded-3xl
            min-h-[45vh]
            flex
            items-center
            justify-center
            text-center
            p-8
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

      {/* Widgets */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        {dashboard.widgets.map((widget) => (

          <div
            key={widget.id}
            className="
              bg-black/5
              border
              border-black/10
              rounded-3xl
              p-6
              relative
              shadow-lg
            "
          >

            {/* Delete Widget */}

            <button
              onClick={() =>
                onDeleteWidget(
                  widget.id
                )
              }
              className="
                absolute
                top-4
                right-4
                text-red-500
                cursor-pointer
              "
            >

              <Trash2 size={18} />

            </button>

            {/* Widget */}

            <h3
              className="
                text-xl
                font-bold
                mb-3
              "
            >
              {widget.title}
            </h3>

            <p className="text-gray-500">
              Widget Type:
              {" "}
              {widget.type}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
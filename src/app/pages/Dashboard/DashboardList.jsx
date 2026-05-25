import { useState } from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  LayoutDashboard,
} from "lucide-react";

import CreateDashboardModal from "../../components/Dashboard/CreateDashboardModal";
import EditDashboardModal from "../../components/Dashboard/EditDashboardModal";

export default function DashboardList({
  dashboards,
  saveDashboards,
  onOpenDashboard,
}) {
  /* ================= STATES ================= */

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);

  const [selectedDashboard, setSelectedDashboard] =
    useState(null);

  /* ================= CREATE DASHBOARD ================= */

  const handleCreateDashboard = (dashboard) => {
    const newDashboard = {
      ...dashboard,

      widgets: [],

      createdAt: new Date().toLocaleString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      ),
    };

    const updatedDashboards = [
      ...dashboards,
      newDashboard,
    ];

    saveDashboards(updatedDashboards);
  };

  /* ================= DELETE DASHBOARD ================= */

  const handleDeleteDashboard = (id) => {
    const updatedDashboards = dashboards.filter(
      (dashboard) => dashboard.id !== id
    );

    saveDashboards(updatedDashboards);
  };

  /* ================= FILTER ================= */

  const filteredDashboards = dashboards.filter(
    (dashboard) =>
      dashboard.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="w-full px-3 sm:px-5 lg:px-0">
      {/* ================= HEADER ================= */}

      <div
        className="
          flex
          flex-col
          xl:flex-row
          xl:items-center
          xl:justify-between
          gap-5
          mb-8
        "
      >
        {/* LEFT */}

        <div>
          <h2
            className="
              text-2xl
              sm:text-3xl
              font-bold
            "
          >
            Dashboards
          </h2>

          <p
            className="
              text-sm
              sm:text-base
              text-gray-500
              mt-2
            "
          >
            Manage your dashboards
          </p>
        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
            w-full
            xl:w-auto
          "
        >
          {/* SEARCH */}

          <div
            className="
              flex
              items-center
              gap-3
              bg-black/5
              border
              border-black/10
              rounded-2xl
              px-4
              py-3
              w-full
              sm:min-w-75
            "
          >
            <Search
              size={20}
              className="text-gray-400 shrink-0"
            />

            <input
              type="text"
              placeholder="Search dashboard..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                bg-transparent
                outline-none
                w-full
                text-sm
                sm:text-base
              "
            />
          </div>

          {/* CREATE */}

          <button
            onClick={() => setModalOpen(true)}
            className="
              flex
              items-center
              justify-center
              gap-2
              px-5
              sm:px-6
              py-3
              rounded-2xl
              bg-[#ff5700]
              text-white
              font-medium
              hover:opacity-90
              transition-all
              cursor-pointer
              w-full
              sm:w-auto
            "
          >
            <Plus size={20} />
            Add Dashboard
          </button>
        </div>
      </div>

      {/* ================= TABLE / MOBILE CARDS ================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-black/10
          overflow-hidden
        "
      >
        {/* ================= DESKTOP HEADER ================= */}

        <div
          className="
            hidden
            lg:grid
            grid-cols-12
            px-6
            py-5
            bg-gray-50
            border-b
            border-black/10
            font-bold
            text-gray-500
            text-center
          "
        >
          <div className="col-span-3">
            Created Time
          </div>

          <div className="col-span-3">
            Dashboard
          </div>

          <div className="col-span-2">
            Widgets
          </div>

          <div className="col-span-2">
            Status
          </div>

          <div className="col-span-2">
            Actions
          </div>
        </div>

        {/* ================= ROWS ================= */}

        {[...filteredDashboards]
          .reverse()
          .map((dashboard) => (
            <div
              key={dashboard.id}
              className="
                flex
                flex-col
                lg:grid
                lg:grid-cols-12
                gap-5
                px-4
                sm:px-6
                py-5
                border-b
                border-black/5
                hover:bg-black/5
                transition-all
              "
            >
              {/* MOBILE TOP */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-4
                  lg:hidden
                "
              >
                <div>
                  <button
                    onClick={() =>
                      onOpenDashboard(
                        dashboard
                      )
                    }
                    className="
                      text-left
                      font-bold
                      text-lg
                      hover:text-[#ff5700]
                      transition-all
                    "
                  >
                    {dashboard.name}
                  </button>

                  <p className="text-sm text-gray-500 mt-1">
                    {dashboard.createdAt}
                  </p>
                </div>

                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-green-500/10
                    text-green-600
                    text-xs
                    whitespace-nowrap
                  "
                >
                  Active
                </span>
              </div>

              {/* DESKTOP CREATED */}

              <div
                className="
                  hidden
                  lg:flex
                  lg:col-span-3
                  items-center
                  justify-center
                "
              >
                <p className="text-sm">
                  {dashboard.createdAt}
                </p>
              </div>

              {/* DESKTOP NAME */}

              <div
                className="
                  hidden
                  lg:flex
                  lg:col-span-3
                  items-center
                  justify-center
                "
              >
                <button
                  onClick={() =>
                    onOpenDashboard(
                      dashboard
                    )
                  }
                  className="
                    font-bold
                    hover:text-[#ff5700]
                    transition-all
                    cursor-pointer
                  "
                >
                  {dashboard.name}
                </button>
              </div>

              {/* WIDGETS */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  lg:justify-center
                  lg:col-span-2
                "
              >
                <p className="lg:hidden font-medium">
                  Widgets
                </p>

                <p>
                  {dashboard.widgets?.length ||
                    0}
                </p>
              </div>

              {/* STATUS */}

              <div
                className="
                  hidden
                  lg:flex
                  lg:col-span-2
                  items-center
                  justify-center
                "
              >
                <span
                  className="
                    px-3
                    py-1
                    rounded-full
                    bg-green-500/10
                    text-green-600
                    text-sm
                  "
                >
                  Active
                </span>
              </div>

              {/* ACTIONS */}

              <div
                className="
                  lg:col-span-2
                  flex
                  items-center
                  justify-between
                  sm:justify-center
                  gap-3
                  pt-2
                "
              >
                {/* OPEN */}

                <button
                  onClick={() =>
                    onOpenDashboard(
                      dashboard
                    )
                  }
                  className="
                    group
                    relative
                    w-10
                    h-10
                    rounded-xl
                    bg-[#ff5700]/10
                    hover:bg-[#ff5700]/80
                    text-[#ff5700]
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                  "
                >
                  <LayoutDashboard
                    size={18}
                  />

                  <span
                    className="
                      hidden
                      lg:block
                      absolute
                      -top-10
                      left-1/2
                      -translate-x-1/2
                      z-20
                      origin-bottom
                      scale-0
                      px-3
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      py-2
                      text-sm
                      font-bold
                      shadow-md
                      transition-all
                      duration-300
                      group-hover:scale-100
                      group-hover:text-[#ff5700]
                    "
                  >
                    Open
                  </span>
                </button>

                {/* EDIT */}

                <button
                  onClick={() => {
                    setSelectedDashboard(
                      dashboard
                    );

                    setEditModalOpen(true);
                  }}
                  className="
                    group
                    relative
                    w-10
                    h-10
                    rounded-xl
                    bg-blue-500/10
                    text-blue-500
                    hover:bg-blue-500/80
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                  "
                >
                  <Pencil size={18} />

                  <span
                    className="
                      hidden
                      lg:block
                      absolute
                      -top-10
                      left-1/2
                      -translate-x-1/2
                      z-20
                      origin-bottom
                      scale-0
                      px-3
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      py-2
                      text-sm
                      font-bold
                      shadow-md
                      transition-all
                      duration-300
                      group-hover:scale-100
                      group-hover:text-blue-500
                    "
                  >
                    Edit
                  </span>
                </button>

                {/* DELETE */}

                <button
                  onClick={() =>
                    handleDeleteDashboard(
                      dashboard.id
                    )
                  }
                  className="
                    group
                    relative
                    w-10
                    h-10
                    rounded-xl
                    bg-red-500/10
                    hover:bg-red-500/80
                    text-red-500
                    hover:text-white
                    flex
                    items-center
                    justify-center
                    transition-all
                  "
                >
                  <Trash2 size={18} />

                  <span
                    className="
                      hidden
                      lg:block
                      absolute
                      -top-10
                      left-1/2
                      -translate-x-1/2
                      z-20
                      origin-bottom
                      scale-0
                      px-3
                      rounded-lg
                      border
                      border-gray-300
                      bg-white
                      py-2
                      text-sm
                      font-bold
                      shadow-md
                      transition-all
                      duration-300
                      group-hover:scale-100
                      group-hover:text-red-500
                    "
                  >
                    Delete
                  </span>
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* ================= CREATE MODAL ================= */}

      <CreateDashboardModal
        open={modalOpen}
        onClose={() =>
          setModalOpen(false)
        }
        onCreate={handleCreateDashboard}
        devices={
          JSON.parse(
            localStorage.getItem(
              "iris_devices"
            )
          ) || []
        }
      />

      {/* ================= EDIT MODAL ================= */}

      <EditDashboardModal
        open={editModalOpen}
        onClose={() =>
          setEditModalOpen(false)
        }
        dashboard={selectedDashboard}
        dashboards={dashboards}
        saveDashboards={saveDashboards}
        devices={
          JSON.parse(
            localStorage.getItem(
              "iris_devices"
            )
          ) || []
        }
      />
    </div>
  );
}
import {
  useState,
} from "react";

import {
  Plus,
  Pencil,
  Trash2,
  Search,
  LayoutDashboard,
  Trash,
} from "lucide-react";

import CreateDashboardModal
from "../../components/Dashboard/CreateDashboardModal";

import EditDashboardModal from "../../components/Dashboard/EditDashboardModal";

export default function DashboardList({

  dashboards,

  saveDashboards,

  onOpenDashboard,

}) {

  /* ================= STATES ================= */

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [

  editModalOpen,

  setEditModalOpen,

] = useState(false);

const [

  selectedDashboard,

  setSelectedDashboard,

] = useState(null);

  /* ================= CREATE DASHBOARD ================= */

  const handleCreateDashboard = (
    dashboard
  ) => {

    const newDashboard = {

      ...dashboard,

      widgets: [],

      createdAt:
        new Date().toLocaleString(),
    };

    const updatedDashboards = [

      ...dashboards,

      newDashboard,
    ];

    saveDashboards(
      updatedDashboards
    );
  };

  /* ================= DELETE DASHBOARD ================= */

  const handleDeleteDashboard = (
    id
  ) => {

    const updatedDashboards =
      dashboards.filter(

        (dashboard) =>
          dashboard.id !== id
      );

    saveDashboards(
      updatedDashboards
    );
  };

  /* ================= FILTER ================= */

  const filteredDashboards =
    dashboards.filter(

      (dashboard) =>

        dashboard.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (

    <div className="w-full">

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

        {/* LEFT */}

        <div>

          <h2
            className="
              text-3xl
              font-bold
            "
          >

            Dashboards

          </h2>

          <p
            className="
              text-gray-500
              mt-2
            "
          >

            Manage Your dashboards

          </p>

        </div>

        {/* RIGHT */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            gap-4
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
              min-w-70
            "
          >

            <Search
              size={20}
              className="
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search dashboard..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                bg-transparent
                outline-none
                w-full
              "
            />

          </div>

          {/* CREATE */}

          <button

            onClick={() =>
              setModalOpen(true)
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

            Add Dashboard

          </button>

        </div>

      </div>

      {/* ================= TABLE ================= */}

      <div
        className="
          bg-white
          rounded-2xl
          border
          border-black/10
          overflow-hidden
        "
      >

        {/* ================= TABLE HEADER ================= */}

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

        {[...filteredDashboards].reverse().map(
          (dashboard) => (

            <div
              key={dashboard.id}
              className="
                grid
                grid-cols-1
                lg:grid-cols-12
                gap-4
                px-6
                py-4
                border-b
                border-black/5
                hover:bg-black/5
                transition-all
                items-center
                text-center
              "
            >

              {/* CREATED */}

              <div className="lg:col-span-3">

                <p className="lg:hidden font-bold">
                  Created Time
                </p>

                <p className="text-sm">
                  {dashboard.createdAt}
                </p>

              </div>

              {/* NAME */}

              <div className="lg:col-span-3">

                <p className="lg:hidden font-bold">
                  Dashboard
                </p>

                <button

                  onClick={() =>
                    onOpenDashboard(
                      dashboard
                    )
                  }

                  className="
                    font-bold
                    text-left
                    hover:text-[#ff5700]
                    transition-all
                    cursor-pointer
                  "
                >

                  {dashboard.name}

                </button>

              </div>

              {/* WIDGET COUNT */}

              <div className="lg:col-span-2">

                <p className="lg:hidden font-bold">
                  Widgets
                </p>

                <p>
                  {
                    dashboard.widgets
                      ?.length || 0
                  }
                </p>

              </div>

              {/* STATUS */}

              <div className="lg:col-span-2">

                <p className="lg:hidden font-bold">
                  Status
                </p>

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
                  justify-evenly
                  gap-3
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
                    cursor-pointer
                  "
                >

                  <LayoutDashboard
                    size={18}
                  />
                  <span className="
                    absolute
                    -top-10
                    left-[50%]
                    translate-x-[-50%]
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
                    ">
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
                    cursor-pointer
                  "
                >

                  <Pencil
                    size={18}
                  />
                  <span className="
                    absolute
                    -top-10
                    left-[50%]
                    translate-x-[-50%]
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
                    ">
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
                    cursor-pointer
                  "
                >

                  <Trash2
                    size={18} 
                  />
                  <span className="
                    absolute
                    -top-10
                    left-[50%]
                    translate-x-[-50%]
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
                    ">
                    Delete
                    </span>
                    

                    </button>
                
                

              </div>

            </div>
          )
        )}

      </div>

      {/* ================= MODAL ================= */}

      <CreateDashboardModal

        open={modalOpen}

        onClose={() =>
            setModalOpen(false)
        }

        onCreate={
            handleCreateDashboard
        }

        devices={
            JSON.parse(
            localStorage.getItem(
                "iris_devices"
            )
            ) || []
        }

        />

        <EditDashboardModal

            open={editModalOpen}

            onClose={() =>
                setEditModalOpen(false)
            }

            dashboard={
                selectedDashboard
            }

            dashboards={
                dashboards
            }

            saveDashboards={
                saveDashboards
            }

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
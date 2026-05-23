import { useEffect, useState } from "react";

import { LayoutDashboard } from "lucide-react";

import CreateDashboardModal from "../../components/Dashboard/CreateDashboardModal";
import DashboardTabs from "../../components/Dashboard/DashboardTabs";
import DashboardCanvas from "../../components/Dashboard/DashboardCanvas";
import AddWidgetModal from "../../components/Dashboard/AddWidgetModal";

export default function DashboardHome() {
  /* ================= STATES ================= */

  const [modalOpen, setModalOpen] = useState(false);

  const [addWidgetModalOpen, setAddWidgetModalOpen] = useState(false);

  const [dashboards, setDashboards] = useState([]);

  const [activeDashboard, setActiveDashboard] = useState(null);


  /* ================= LOAD ================= */

  useEffect(() => {
    const savedDashboards =
      JSON.parse(localStorage.getItem("iris_dashboards")) || [];

    setDashboards(savedDashboards);

    if (savedDashboards.length > 0) {
      setActiveDashboard(savedDashboards[0].id);
    }
  }, []);

  /* ================= SAVE ================= */

  useEffect(() => {
    localStorage.setItem("iris_dashboards", JSON.stringify(dashboards));
  }, [dashboards]);

  /* ================= CREATE ================= */

  const handleCreateDashboard = (dashboard) => {
    const updatedDashboards = [
      ...dashboards,
      {
        ...dashboard,
        widgets: [],
      },
    ];

    setDashboards(updatedDashboards);

    setActiveDashboard(dashboard.id);
  };

  const handleAddWidget = (
  widget
) => {

  const currentDashboard =
    dashboards.find(
      (dashboard) =>
        dashboard.id ===
        activeDashboard
    );

  if (!currentDashboard)
    return;

  /* ================= GRID CONFIG ================= */

  const TOTAL_COLS = 12;

  const DEFAULT_W = 4;

  const DEFAULT_H = 6;

  /* ================= EXISTING COUNT ================= */

  const widgetCount =
    currentDashboard.widgets.length;

  /* ================= CALCULATE POSITION ================= */

  const widgetsPerRow =
    TOTAL_COLS / DEFAULT_W;

  const row =
    Math.floor(
      widgetCount /
      widgetsPerRow
    );

  const col =
    widgetCount %
    widgetsPerRow;

  const x =
    col * DEFAULT_W;

  const y =
    row * DEFAULT_H;

  /* ================= CREATE WIDGET ================= */

  const newWidget = {

  id: Date.now(),

  widgetId:
    `${widget.type}_${Date.now()}`,

  type: widget.type,

  title: widget.title,

  value: 0,

  layout: {

    x,

    y,

    w: 4,

    h: 6,

    minW: 2,

    minH: 4,
  },
};

  /* ================= UPDATE DASHBOARDS ================= */

  const updatedDashboards =
    dashboards.map(
      (dashboard) => {

        if (
          dashboard.id ===
          activeDashboard
        ) {

          return {

            ...dashboard,

            widgets: [
              ...dashboard.widgets,
              newWidget,
            ],
          };
        }

        return dashboard;
      }
    );

  setDashboards(
    updatedDashboards
  );
};

  const handleDeleteDashboard = (dashboardId) => {
    const updatedDashboards = dashboards.filter(
      (dashboard) => dashboard.id !== dashboardId,
    );

    setDashboards(updatedDashboards);

    /* Set next dashboard */

    if (updatedDashboards.length > 0) {
      setActiveDashboard(updatedDashboards[0].id);
    } else {
      setActiveDashboard(null);
    }
  };

  const handleDeleteWidget = (widgetId) => {
    const updatedDashboards = dashboards.map((dashboard) => {
      if (dashboard.id === activeDashboard) {
        return {
          ...dashboard,

          widgets: dashboard.widgets.filter((widget) => widget.id !== widgetId),
        };
      }

      return dashboard;
    });

    setDashboards(updatedDashboards);
  };

  const handleSaveLayouts = (
  newLayouts
) => {

  const updatedDashboards =
    dashboards.map((dashboard) => {

      if (
        dashboard.id === activeDashboard
      ) {

        return {

          ...dashboard,

          widgets:
            dashboard.widgets.map(
              (widget) => {

                const foundLayout =
                  newLayouts.find(
                    (layout) =>
                      layout.i ===
                      widget.id.toString()
                  );

                if (!foundLayout)
                  return widget;

                return {

                  ...widget,

                  layout: {

                    x:
                      foundLayout.x,

                    y:
                      foundLayout.y,

                    w:
                      foundLayout.w,

                    h:
                      foundLayout.h,
                  },
                };
              }
            ),
        };
      }

      return dashboard;
    });

  setDashboards(updatedDashboards);
};

  /* ================= ACTIVE DASHBOARD ================= */

  const currentDashboard = dashboards.find((d) => d.id === activeDashboard);

  const layouts =
  currentDashboard?.widgets.map(
    (widget) => ({

      i: widget.id.toString(),

      x:
        widget.layout?.x || 0,

      y:
        widget.layout?.y || 0,

      w:
        widget.layout?.w || 4,

      h:
        widget.layout?.h || 8,
    })
  ) || [];

  /* ================= EMPTY ================= */

  if (dashboards.length === 0) {
    return (
      <>
        <div
          className="
            border
            border-dashed
            border-gray-300
            rounded-3xl
            h-[calc(100vh-150px)]
            flex
            flex-col
            items-center
            justify-center
            bg-black/5
            px-6
            text-center
          "
        >
          <LayoutDashboard size={60} className="text-[#ff5700] mb-6" />

          <h3 className="text-4xl font-bold mb-4">Dashboard is Empty</h3>

          <p
            className="
              text-gray-500
              mb-8
              max-w-2xl
              text-md
            "
          >
            Click the edit dashboard button to add widgets, analytics and live
            monitoring components.
          </p>

          <button
            onClick={() => setModalOpen(true)}
            className="
              px-8
              py-4
              rounded-2xl
              bg-linear-to-r
              from-[#d84800]
              to-[#ff5700]
              hover:opacity-90
              text-white
              cursor-pointer
              text-lg
              font-medium
            "
          >
            Edit Dashboard
          </button>
        </div>

        {/* Modal */}

        <CreateDashboardModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreateDashboard}
        />
      </>
    );
  }

  /* ================= DASHBOARDS ================= */

  return (
    <div>
      {/* Tabs */}

      <DashboardTabs
        dashboards={dashboards}
        activeDashboard={activeDashboard}
        setActiveDashboard={setActiveDashboard}
      />

      

      {/* Canvas */}

      <DashboardCanvas
        dashboard={currentDashboard}
        onDeleteDashboard={handleDeleteDashboard}
        onOpenWidgetModal={() => setAddWidgetModalOpen(true)}
        onDeleteWidget={handleDeleteWidget}
        layouts={layouts}
        handleSaveLayouts={handleSaveLayouts}
      />

      <AddWidgetModal
        open={addWidgetModalOpen}
        onClose={() => setAddWidgetModalOpen(false)}
        onAddWidget={handleAddWidget}
      />
      {/* Modal */}

      <CreateDashboardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateDashboard}
      />
    </div>
  );
}

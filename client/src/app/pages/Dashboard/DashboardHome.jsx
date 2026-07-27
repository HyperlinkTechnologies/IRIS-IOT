import {
  useEffect,
  useState,
} from "react";

import DashboardList
from "./DashboardList";

import DashboardWorkspace
from "./DashboardWorkspace";

import {
  getDashboards,
  createDashboard,
  updateDashboard,
  deleteDashboard,
} from "../../services/dashboard.service";


export default function DashboardHome() {

  /* ================= STATES ================= */
  const [
    dashboards,
    setDashboards,
  ] = useState([]);

  const [
    selectedDashboard,
    setSelectedDashboard,
  ] = useState(null);

  /* ================= LOAD DASHBOARDS ================= */

  useEffect(() => {
  loadDashboards();
}, []);

async function loadDashboards() {
  const data = await getDashboards();
  setDashboards(data);
}



  /* ================= SAVE DASHBOARDS ================= */

  const saveDashboards = async (updatedDashboards) => {
  // Delete removed dashboards
  for (const dashboard of dashboards) {
    const stillExists = updatedDashboards.find(
      (d) => d.dashboardId === dashboard.dashboardId
    );

    if (!stillExists) {
      await deleteDashboard(dashboard.dashboardId);
    }
  }

  // Create / Update dashboards
  for (const dashboard of updatedDashboards) {
    const exists = dashboards.find(
      (d) => d.dashboardId === dashboard.dashboardId
    );

    if (exists) {
      await updateDashboard(
        dashboard.dashboardId,
        dashboard
      );
    } else {
      await createDashboard(dashboard);
    }
  }

  await loadDashboards();
};

  return (

    <div className="w-full">

      {/* ================= DASHBOARD LIST ================= */}

      {!selectedDashboard && (

        <DashboardList

          dashboards={dashboards}

          saveDashboards={
            saveDashboards
          }

          onOpenDashboard={
            setSelectedDashboard
          }

        />

      )}

      {/* ================= DASHBOARD WORKSPACE ================= */}

      {selectedDashboard && (

        <DashboardWorkspace

          dashboard={
            selectedDashboard
          }

          dashboards={dashboards}

          saveDashboards={
            saveDashboards
          }

          onBack={() =>
            setSelectedDashboard(
              null
            )
          }

          onSwitchDashboard={
            setSelectedDashboard
          }

        />

      )}

    </div>
  );
}
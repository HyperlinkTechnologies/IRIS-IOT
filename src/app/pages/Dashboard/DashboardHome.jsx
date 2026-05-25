import {
  useEffect,
  useState,
} from "react";

import DashboardList
from "./DashboardList";

import DashboardWorkspace
from "./DashboardWorkspace";

import useMQTTTelemetry from "../../hooks/useMQTTTelemetry";

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

    const savedDashboards =
      JSON.parse(

        localStorage.getItem(
          "iris_dashboards"
        )

      ) || [];

    setDashboards(
      savedDashboards
    );

  }, []);



  /* ================= SAVE DASHBOARDS ================= */

  const saveDashboards = (
    updatedDashboards
  ) => {

    setDashboards(
      updatedDashboards
    );

    localStorage.setItem(

      "iris_dashboards",

      JSON.stringify(
        updatedDashboards
      )
    );
  };

useMQTTTelemetry({

  dashboards,

  saveDashboards,
});

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
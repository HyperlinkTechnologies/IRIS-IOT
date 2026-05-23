import {
  createContext,
  useContext,
  useState,
} from "react";

const DashboardContext =
  createContext();

export function DashboardProvider({
  children,
}) {

  const [widgets, setWidgets] =
    useState([]);

  /* ================= UPDATE WIDGET ================= */

  const updateWidgetValue = (
    widgetId,
    value
  ) => {

    setWidgets((prev) =>

      prev.map((widget) =>

        widget.widgetId ===
        widgetId

          ? {
              ...widget,
              value,
            }

          : widget
      )
    );
  };

  return (

    <DashboardContext.Provider
      value={{

        widgets,

        setWidgets,

        updateWidgetValue,
      }}
    >

      {children}

    </DashboardContext.Provider>
  );
}

export function useDashboard() {

  return useContext(
    DashboardContext
  );
}
import { useState } from "react";

import {
  Menu,
  PanelLeftCloseIcon
} from "lucide-react";

import DashboardHome from "../../components/Dashboard/DashboardHome";
import DevicesPage from "../../components/Dashboard/Devicespage";
import AlertsPage from "../../components/Dashboard/AlertsPage";
import BillingPage from "../../components/Dashboard/BillingPage";
import SettingsPage from "../../components/Dashboard/SettingsPage";
import GetStartedPage from "../../components/Dashboard/GetStartedPage";
import DocumentationPage from "../../components/Dashboard/DocumentationPage";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";

export default function DashboardPage() {

  const [activeTab, setActiveTab] =
    useState("getstarted");

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  /* Sidebar Toggle */
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  return (

    <div className="
  flex
  h-screen
  bg-white
  overflow-hidden
">

  {/* ================= SIDEBAR ================= */}

  <Sidebar
    activeTab={activeTab}
    setActiveTab={setActiveTab}
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
  />

  {/* ================= MAIN ================= */}

  <main
  className={`
    flex-1
    flex
    flex-col
    overflow-hidden
    transition-all
    duration-300
    ${
      sidebarOpen
        ? "lg:ml-72.5"
        : "ml-0"
    }
  `}
>

    {/* ================= HEADER ROW ================= */}

    <div className="
      h-20
      flex
      items-center
      gap-4
      px-4
      sm:px-6
      lg:px-8
      border-b
      border-black/5
      bg-gray-200
      sticky
      top-0
      z-30
      mt-2 ml-2 mr-2
      rounded-2xl
    ">

      {/* ================= HAMBURGER ================= */}

      <button
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
        className="
          w-11
          h-11
          min-w-11
          rounded-lg
          cursor-pointer
          border
          border-black/10
          flex
          items-center
          justify-center
          bg-white
          hover:bg-gray-100
          transition-all
          shadow-sm
        "
      >

        {/* Icon */}
        <PanelLeftCloseIcon size={24} />

      </button>

      {/* ================= TOPBAR ================= */}

      <div className="flex-1">

        <Topbar
          activeTab={activeTab}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
          setActiveTab={setActiveTab}
        />

      </div>

    </div>

    {/* ================= PAGE CONTENT ================= */}

    <section className="
      flex-1
      overflow-y-auto
      p-4
      sm:p-6
      lg:p-8
    ">

      {activeTab === "dashboard" && (
        <DashboardHome />
      )}

      {activeTab === "devices" && (
        <DevicesPage />
      )}

      {activeTab === "alerts" && (
        <AlertsPage />
      )}

      {activeTab === "billing" && (
        <BillingPage />
      )}

      {activeTab === "settings" && (
        <SettingsPage />
      )}

      {activeTab === "getstarted" && (
        <GetStartedPage />
      )}

      {activeTab === "documentation" && (
        <DocumentationPage />
      )}

    </section>

  </main>

</div>
  );
}
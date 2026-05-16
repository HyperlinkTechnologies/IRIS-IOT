import { useState } from "react";
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

  return (

    <div className="flex h-screen bg-white text-[#010c29] overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main */}
      <main className="flex-1 overflow-y-auto">

        {/* Topbar */}
        <Topbar
          activeTab={activeTab}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
        />

        {/* Content */}
        <section className="p-8">

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
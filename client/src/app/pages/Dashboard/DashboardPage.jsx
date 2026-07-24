import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth";

import { PanelLeftCloseIcon } from "lucide-react";

/* ================= PAGES ================= */

import DashboardHome from "./DashboardHome";

import DevicesPage from "./Devicespage";

import AlertsPage from "./AlertsPage";

import BillingPage from "./BillingPage";

import SettingsPage from "./SettingsPage";

import GetStartedPage from "./GetStartedPage";

import DocumentationPage from "./DocumentationPage";

import AnalyticsPage from "./AnalyticsPage";

/* ================= COMPONENTS ================= */

import Sidebar from "../../components/Dashboard/Sidebar";

import Topbar from "../../components/Dashboard/Topbar";

import ToastListener from "../../components/Dashboard/ToastListener";

export default function DashboardPage() {
  /* ================= STATES ================= */

  const [activeTab, setActiveTab] = useState("getstarted");

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */

  useEffect(() => {
    const checkUser = async () => {
      try {
        /* Current Cognito User */

        const user = await getCurrentUser();

        /* Current Session */

        const session = await fetchAuthSession();

        /* User Data */

        const payload = session.tokens?.idToken?.payload;

        const userData = {
          username:
            payload?.name ||
            payload?.preferred_username ||
            payload?.email?.split("@")[0] ||
            "User",

          email: payload?.email || "",
        };

        /* Store User */

        localStorage.setItem("iris_user", JSON.stringify(userData));
      } catch (error) {
        console.error("AUTH ERROR:", error);

        /* Remove Invalid User */

        localStorage.removeItem("iris_user");

        /* Redirect to Home */

        navigate("/");
      }
    };

    checkUser();
  }, []);

  return (
    <div
      className="
        flex
        h-screen
        bg-white
        overflow-hidden
      "
    >
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
          ${sidebarOpen ? "lg:ml-72" : "ml-0"}
        `}
      >
        {/* ================= HEADER ================= */}

        <div
          className="
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
            mx-4
            sm:mx-6
            lg:mx-8
            mt-4
            mb-6
            rounded-2xl
          "
        >
          {/* ================= SIDEBAR TOGGLE ================= */}

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
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

            <ToastListener/>
          </div>
        </div>

        {/* ================= CONTENT ================= */}

        <section
          className="
            flex-1
            overflow-y-auto
            p-4
            sm:px-6
            lg:px-8 
            custom-scrollbar
          "
        >
          {/* Dashboard */}

          {activeTab === "dashboard" && <DashboardHome />}

          {/* Devices */}

          {activeTab === "devices" && <DevicesPage />}

          {/* Alerts */}

          {activeTab === "alerts" && <AlertsPage />}

          {/* Billing */}

          {activeTab === "billing" && <BillingPage />}

          {/* Settings */}

          {activeTab === "settings" && <SettingsPage />}

          {/* Get Started */}

          {activeTab === "getstarted" && (
            <GetStartedPage setActiveTab={setActiveTab} />
          )}

          {/* Documentation */}

          {activeTab === "documentation" && <DocumentationPage />}

          {/* Analytics */}
          {activeTab === "analytics" && <AnalyticsPage />}
        </section>
      </main>
    </div>
  );
}

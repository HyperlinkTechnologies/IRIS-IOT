import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import {Menu,PanelLeftCloseIcon} from "lucide-react";

import DashboardHome from "../../components/Dashboard/DashboardHome";
import DevicesPage from "../../components/Dashboard/Devicespage";
import AlertsPage from "../../components/Dashboard/AlertsPage";
import BillingPage from "../../components/Dashboard/BillingPage";
import SettingsPage from "../../components/Dashboard/SettingsPage";
import GetStartedPage from "../../components/Dashboard/GetStartedPage";
import DocumentationPage from "../../components/Dashboard/DocumentationPage";

import Sidebar from "../../components/Dashboard/Sidebar";
import Topbar from "../../components/Dashboard/Topbar";

import {
  CLIENT_ID,
  REDIRECT_SIGN_IN,
  TOKEN_URL
} from "../../aws-config";

export default function DashboardPage() {

  const [activeTab, setActiveTab] =
    useState("getstarted");

  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  /* Sidebar Toggle */
  const [sidebarOpen, setSidebarOpen] =
    useState(true);

    const navigate = useNavigate();

    useEffect(() => {

  const authenticateUser = async () => {

    const urlParams =
      new URLSearchParams(window.location.search);

    const code = urlParams.get("code");

    // =========================
    // CASE 1:
    // Already logged in
    // =========================

    const existingUser =
      localStorage.getItem("iris_user");

    if (existingUser) {
      return;
    }

    // =========================
    // CASE 2:
    // No login code
    // =========================

    if (!code) {
      navigate("/");
      return;
    }

    try {

      const body = new URLSearchParams({
        grant_type: "authorization_code",
        client_id: CLIENT_ID,
        code: code,
        redirect_uri: REDIRECT_SIGN_IN,
      });

      const response = await fetch(TOKEN_URL, {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body,
      });

      const data = await response.json();

      console.log("TOKEN RESPONSE:", data);

      // Decode JWT
      const decoded =
        jwtDecode(data.id_token);

      console.log("DECODED USER:", decoded);

      const userData = {

        username:
          decoded.name ||
          decoded["cognito:username"] ||
          "User",

        email:
          decoded.email ||
          "No Email",
      };

      // Store user
      localStorage.setItem(
        "iris_user",
        JSON.stringify(userData)
      );

      // Remove ?code=
      window.history.replaceState(
        {},
        document.title,
        "/Dashboard"
      );

    } catch (error) {

      console.error(
        "AUTH ERROR:",
        error
      );

      localStorage.removeItem("iris_user");

      navigate("/");
    }
  };

  authenticateUser();

}, []);

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
import {
  LayoutDashboard,
  Cpu,
  Bell,
  CreditCard,
  Settings,
  FileText,
  Rocket,
  LogOut,
  X
} from "lucide-react";

import SidebarItem from "./SidebarItem";

import IrisLogo from "../../../assets/iris-logo.png";
import { logout } from "../../auth";
import { logoutUrl } from "../../aws-config";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen
}) {

  const handleLogout = () => {

    logout();

    window.location.href = logoutUrl;
  };

  return (

    <>
      {/* ================= MOBILE OVERLAY ================= */}

      {sidebarOpen && (

        <div
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0
            bg-black/40
            backdrop-blur-[2px]
            z-40
            lg:hidden
          "
        />

      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed
          lg:fixed
          top-0
          left-0
          h-screen
          z-50
          bg-gray-300
          border-r
          border-white/10
          flex
          flex-col
          transition-all
          duration-300
          ease-in-out

          w-72.5

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* ================= HEADER ================= */}

        <div className="
          h-20
          flex
          items-center
          justify-between
          px-5
          border-b
          border-white/10
        ">

          {/* Logo */}
          <img
            src={IrisLogo}
            alt="IRIS Logo"
            className="
              w-32.5
              sm:w-40
              object-contain
            "
          />

          {/* Close Button Mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="
              lg:hidden
              w-10
              h-10
              rounded-xl
              flex
              items-center
              justify-center
              hover:bg-black/5
              transition-all
            "
          >

            <X size={22} />

          </button>

        </div>

        {/* ================= MENU ================= */}

        <nav className="
          flex-1
          p-4
          space-y-2
          overflow-y-auto
        ">

          <SidebarItem
            icon={<Rocket />}
            text="Get Started"
            active={activeTab === "getstarted"}
            onClick={() => {
              setActiveTab("getstarted");
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />

          <SidebarItem
            icon={<LayoutDashboard />}
            text="Dashboard"
            active={activeTab === "dashboard"}
            onClick={() => {
              setActiveTab("dashboard");
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />

          <SidebarItem
            icon={<Cpu />}
            text="Devices"
            active={activeTab === "devices"}
            onClick={() => {
              setActiveTab("devices");
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />

          <SidebarItem
            icon={<Bell />}
            text="Alerts"
            active={activeTab === "alerts"}
            onClick={() => {
              setActiveTab("alerts");
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />

          <SidebarItem
            icon={<CreditCard />}
            text="Billing"
            active={activeTab === "billing"}
            onClick={() => {
              setActiveTab("billing");
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />

          <SidebarItem
            icon={<Settings />}
            text="Settings"
            active={activeTab === "settings"}
            onClick={() => {
              setActiveTab("settings");
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />

          <SidebarItem
            icon={<FileText />}
            text="Documentation"
            active={activeTab === "documentation"}
            onClick={() => {
              setActiveTab("documentation");
              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />

        </nav>

        {/* ================= LOGOUT ================= */}

        <div className="
          p-4
          border-t
          border-white/10
        ">

          <button
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-3
              py-3
              rounded-xl
              bg-linear-to-r
              from-[#d84800]
              to-[#ff5700]
              hover:opacity-90
              transition-all
              duration-300
              cursor-pointer
              text-white
              font-medium
            "
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

      </aside>

    </>
  );
}
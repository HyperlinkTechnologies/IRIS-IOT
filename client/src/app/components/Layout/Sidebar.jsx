import {
  LayoutDashboard,
  Cpu,
  Bell,
  CreditCard,
  Settings,
  FileText,
  Rocket,
  LogOut,
  X,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import IrisLogo from "../../../assets/iris-logo.png";
import IrisIcon from "../../../assets/IRIS icon.png";
import { signOut } from "aws-amplify/auth";
import { useUser } from "../../../context/UserContext";
import { deleteSession } from "../../services/session.service";

export default function Sidebar({
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) {
  const { setUser } = useUser();

  const handleLogout = async () => {
    try {
      const sessionId = sessionStorage.getItem("iris_session_id");

      if (sessionId) {
        await deleteSession(sessionId);
        sessionStorage.removeItem("iris_session_id");
      }

      await signOut();

      setUser(null);

      window.location.href = "/";
    } catch (error) {
      console.error(error);
    }
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
  top-[88px]
left-0
h-[calc(100vh-104px)]
  z-50
m-2
mt-2
rounded-xl
  bg-gray-300
  border-r
  border-white/10

  flex
  flex-col

  transition-all
  duration-300
  ease-in-out

  ${
    sidebarOpen
      ? "w-60 translate-x-0"
      : "w-20 -translate-x-full lg:translate-x-0"
  }
`}
      >
        {/* ================= MENU ================= */}

        <nav
          className="
          flex-1
          p-4
          space-y-2
          overflow-y-auto
          custom-scrollbar
        "
        >
          <SidebarItem
            icon={<Rocket />}
            text="Get Started"
            active={activeTab === "getstarted"}
            collapsed={!sidebarOpen}
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
            collapsed={!sidebarOpen}
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
            collapsed={!sidebarOpen}
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
            collapsed={!sidebarOpen}
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
            collapsed={!sidebarOpen}
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
            collapsed={!sidebarOpen}
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
            collapsed={!sidebarOpen}
            onClick={() => {
              setActiveTab("documentation");

              if (window.innerWidth < 1024) {
                setSidebarOpen(false);
              }
            }}
          />
        </nav>

        {/* ================= LOGOUT ================= */}

        <div
          className={`
    border-t
    border-white/10
    ${sidebarOpen ? "p-4" : "p-3"}
  `}
        >
          <button
            onClick={handleLogout}
            title={!sidebarOpen ? "Logout" : undefined}
            className={`
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

    ${!sidebarOpen ? "px-0" : ""}
  `}
          >
            <LogOut size={20} />

            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

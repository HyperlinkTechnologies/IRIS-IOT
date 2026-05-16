import {
  LayoutDashboard,
  Cpu,
  Bell,
  CreditCard,
  Settings,
  FileText,
  Rocket,
  LogOut,
} from "lucide-react";

import SidebarItem from "./SidebarItem";
import IrisLogo from "../../../assets/iris-logo.png";
import { logoutUrl } from "../../aws-config";

export default function Sidebar({ activeTab, setActiveTab }) {
  const handleLogout = () => {
    localStorage.clear();

    window.location.href = logoutUrl;
  };
  return (
    <aside className="w-72 bg-gray-300 border-r border-white/10 flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center px-6 border-b border-white/10 justify-center">
        <img 
        src={IrisLogo} 
        alt="IRIS Logo"
        width={160} 
        />
      </div>
      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        <SidebarItem
          icon={<Rocket />}
          text="Get Started"
          active={activeTab === "getstarted"}
          onClick={() => setActiveTab("getstarted")}
        />

        <SidebarItem
          icon={<LayoutDashboard />}
          text="Dashboard"
          active={activeTab === "dashboard"}
          onClick={() => setActiveTab("dashboard")}
        />

        <SidebarItem
          icon={<Cpu />}
          text="Devices"
          active={activeTab === "devices"}
          onClick={() => setActiveTab("devices")}
        />

        <SidebarItem
          icon={<Bell />}
          text="Alerts"
          active={activeTab === "alerts"}
          onClick={() => setActiveTab("alerts")}
        />

        <SidebarItem
          icon={<CreditCard />}
          text="Billing"
          active={activeTab === "billing"}
          onClick={() => setActiveTab("billing")}
        />

        <SidebarItem
          icon={<Settings />}
          text="Settings"
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />

        <SidebarItem
          icon={<FileText />}
          text="Documentation"
          active={activeTab === "documentation"}
          onClick={() => setActiveTab("documentation")}
        />
      </nav>
      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center text-white
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
          "
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

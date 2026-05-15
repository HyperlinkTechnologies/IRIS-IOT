import {
  LayoutDashboard,
  Cpu,
  Bell,
  CreditCard,
  Settings,
  FileText,
  Rocket,
  LogOut
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { logoutUrl } from "../../aws-config";

export default function DashboardPage() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.clear();

    window.location.href =()=>window .location.href = logoutUrl; // Redirect to home page after logout

  };

  return (
    <div className="flex h-screen bg-[#010c29] text-white overflow-hidden pt-15">

      {/* Sidebar */}
      <aside className="w-72 bg-[#071633] border-r border-white/10 flex flex-col">

        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <h1 className="text-2xl font-bold">
            IRIS
            <span className="text-[#ff5700] ml-2">
              Dashboard
            </span>
          </h1>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">

          <SidebarItem icon={<Rocket />} text="Get Started" />
          <SidebarItem icon={<LayoutDashboard />} text="Dashboard" active />
          <SidebarItem icon={<Cpu />} text="Devices" />
          <SidebarItem icon={<Bell />} text="Alerts" />
          <SidebarItem icon={<CreditCard />} text="Billing" />
          <SidebarItem icon={<Settings />} text="Settings" />
          <SidebarItem icon={<FileText />} text="Documentation" />

        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">

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
            "
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">

        {/* Topbar */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8">

          <div>
            <h2 className="text-2xl font-bold">
              Dashboard
            </h2>

            <p className="text-gray-400 text-sm">
              Welcome back to IRIS Platform
            </p>
          </div>

          {/* Profile */}
          <div className="flex items-center gap-4">

            <div className="text-right">
              <p className="font-semibold">
                Admin User
              </p>

              <p className="text-sm text-gray-400">
                Super Admin
              </p>
            </div>

            <div className="
              w-12
              h-12
              rounded-full
              bg-linear-to-br
              from-[#ff5700]
              to-[#d84800]
              flex
              items-center
              justify-center
              font-bold
            ">
              A
            </div>

          </div>

        </header>

        {/* Dashboard Widgets */}
        {/* <section className="p-8"> */}

          {/* Cards */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            <DashboardCard
              title="Total Devices"
              value="124"
            />

            <DashboardCard
              title="Online Devices"
              value="118"
            />

            <DashboardCard
              title="Offline Devices"
              value="6"
            />

          </div> */}

          {/* Empty Dashboard */}
          {/* <div className="
            border
            border-dashed
            border-white/20
            rounded-3xl
            h-100
            flex
            flex-col
            items-center
            justify-center
            bg-[#071633]
          ">

            <LayoutDashboard
              size={60}
              className="text-[#ff5700] mb-4"
            />

            <h3 className="text-2xl font-bold mb-2">
              Dashboard is Empty
            </h3>

            <p className="text-gray-400 mb-6">
              Click the edit button to add widgets
            </p>

            <button
              className="
                px-6
                py-3
                rounded-xl
                bg-linear-to-r
                from-[#d84800]
                to-[#ff5700]
                hover:opacity-90
                transition-all
              "
            >
              Edit Dashboard
            </button>

          </div>

        </section> */}

      </main>

    </div>
  );
}

/* Sidebar Item */
function SidebarItem({ icon, text, active }) {

  return (
    <button
      className={`
        w-full
        flex
        items-center
        gap-4
        px-4
        py-3
        rounded-xl
        transition-all
        duration-300
        ${
          active
            ? "bg-linear-to-r from-[#d84800] to-[#ff5700] text-white"
            : "hover:bg-white/5 text-gray-300"
        }
      `}
    >
      {icon}

      <span className="font-medium">
        {text}
      </span>

    </button>
  );
}

/* Dashboard Card */
function DashboardCard({ title, value }) {

  return (
    <div className="
      p-6
      rounded-2xl
      bg-[#071633]
      border
      border-white/10
    ">

      <p className="text-gray-400 mb-2">
        {title}
      </p>

      <h3 className="text-4xl font-bold">
        {value}
      </h3>

    </div>
  );
}
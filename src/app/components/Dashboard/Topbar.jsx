import { Settings, User } from "lucide-react";
import { logoutUrl } from "../../aws-config";

export default function Topbar({
  activeTab,
  showProfileMenu,
  setShowProfileMenu,
}) {
  const handleLogout = () => {
    localStorage.clear();

    window.location.href = logoutUrl;
  };
  return (
    <header className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-gray-200">
      {/* Title */}
      <div>
        <h2 className="text-3xl font-bold capitalize text-[#010c29]">{activeTab}</h2>

        <p className="text-gray-500 text-sm">Welcome back to IRIS Platform</p>
      </div>
      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-4 cursor-pointer"
        >
          <div className="text-right">
            <p className="font-semibold text-[#010c29]">Admin</p>
          </div>

          <div
            className="
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
          "
          >
            <User className="text-white" />
          </div>
        </button>
        {/* Dropdown */}
        {showProfileMenu && (
          <div
            className="
            absolute
            right-0
            top-16
            w-64
            rounded-2xl
            bg-white
            border
            border-black/20
            shadow-[0px_0px_10px_0px_#ff5700]
            p-4
            z-50
          "
          >
            <div className="mb-4">
              <p className="font-semibold text-[#010c29]">Admin User</p>

              <p className="text-sm text-gray-500">admin@irisiot.com</p>

              <div className="absolute right-5 top-3 cursor-pointer hover:bg-gray-700/10 p-3 rounded-full">
                <Settings className="text-gray-500" />
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="
                w-full
                py-3
                rounded-xl
                bg-linear-to-r
                from-[#d84800]
                to-[#ff5700]
                hover:opacity-90
                transition-all
                cursor-pointer
                text-white
              "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

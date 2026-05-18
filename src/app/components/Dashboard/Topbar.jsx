import { signOut } from "aws-amplify/auth";

import { Settings, User } from "lucide-react";

export default function Topbar({
  activeTab,
  showProfileMenu,
  setShowProfileMenu,
  setActiveTab,
}) {
  /* ================= USER ================= */

  const user = JSON.parse(localStorage.getItem("iris_user"));

  /* ================= LOGOUT ================= */

  const handleLogout = async () => {
    localStorage.removeItem("iris_user");

    await signOut();
  };

  return (
    <header
      className="
        w-full
        flex
        items-center
        justify-between
      "
    >
      {/* ================= LEFT ================= */}

      <div
        className="
          flex
          items-center
          gap-3
          sm:gap-4
        "
      >
        {/* Title */}

        <div>
          <h2
            className="
              text-xl
              sm:text-2xl
              lg:text-3xl
              font-bold
              capitalize
              text-[#010c29]
              leading-tight
            "
          >
            {activeTab}
          </h2>

          <p
            className="
              text-gray-500
              text-xs
              sm:text-sm
              hidden
              sm:block
            "
          >
            Welcome back to IRIS Platform
          </p>
        </div>
      </div>

      {/* ================= PROFILE ================= */}

      <div className="relative">
        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="
            flex
            items-center
            gap-2
            sm:gap-4
            cursor-pointer
          "
        >
          {/* Name */}

          <div
            className="
              text-right
              hidden
              sm:block
            "
          >
            <p
              className="
                font-semibold
                text-[#010c29]
                text-sm
                sm:text-base
              "
            >
              {user?.username || "Admin"}
            </p>
          </div>

          {/* Avatar */}

          <div
            className="
              w-11
              h-11
              sm:w-12
              sm:h-12
              rounded-full
              bg-linear-to-br
              from-[#ff5700]
              to-[#d84800]
              flex
              items-center
              justify-center
              font-bold
              shadow-lg
            "
          >
            <User className="text-white" size={20} />
          </div>
        </button>

        {/* ================= DROPDOWN ================= */}

        {showProfileMenu && (
          <div
            className="
              absolute
              right-0
              top-16
              w-90
              rounded-2xl
              bg-white
              border
              border-black/10
              shadow-[0px_0px_20px_0px_rgba(255,87,0,0.15)]
              p-5
              z-50
            "
          >
            {/* Top */}

            <div
              className="
                flex
                items-start
                justify-between
                gap-2
                mb-5
              "
            >
              <div>
                <p
                  className="
                    font-semibold
                    text-[#010c29]
                    text-lg
                  "
                >
                  {user?.username || "Admin User"}
                </p>

                <p
                  className="
                    text-sm
                    text-gray-500
                    break-all
                  "
                >
                  {user?.email || "admin@irisiot.com"}
                </p>
              </div>

              {/* Settings */}

              <button
                onClick={() => {
                  setActiveTab("settings");

                  setShowProfileMenu(false);
                }}
                className="
                  p-2.5
                  rounded-full
                  hover:bg-gray-200
                  transition-all
                  shrink-0
                  cursor-pointer
                "
              >
                <Settings className="text-gray-500" size={20} />
              </button>
            </div>

            {/* Divider */}

            <div
              className="
                h-px
                bg-black/10
                mb-5
              "
            />

            {/* Logout */}

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
                font-medium
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

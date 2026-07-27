import { signOut } from "aws-amplify/auth";

import { Settings, User, Bell, X } from "lucide-react";

import { useEffect, useState, useRef } from "react";

import triggeredAlertStore from "../../core/alerts/triggeredAlertStore";
import deviceRegistry from "../../core/devices/deviceRegistry";

export default function Topbar({
  activeTab,
  showProfileMenu,
  setShowProfileMenu,
  setActiveTab,
}) {
  /* ================= USER ================= */

  const notificationRef = useRef(null);

  const [user, setUser] = useState(() => {

  const authUser = JSON.parse(
    localStorage.getItem("iris_user")
  );

  const profile = JSON.parse(
    localStorage.getItem("iris_profile") || "{}"
  );

  return {

    ...authUser,

    username:
      profile.username ||
      authUser?.username,

    image:
      profile.image || "",

  };

});

  const [notifications, setNotifications] = useState(
    triggeredAlertStore.getAll(),
  );

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {

    const unsubscribe =
        triggeredAlertStore.subscribe((data) => {

            setNotifications([...data]);

        });

    return unsubscribe;

}, []);
  useEffect(() => {

  const updateProfile = () => {

    const authUser = JSON.parse(
      localStorage.getItem("iris_user")
    );

    const profile = JSON.parse(
      localStorage.getItem("iris_profile") || "{}"
    );

    setUser({

      ...authUser,

      username:
        profile.username ||
        authUser?.username,

      image:
        profile.image || "",

    });

  };

  window.addEventListener(
    "profileUpdated",
    updateProfile
  );

  return () =>

    window.removeEventListener(
      "profileUpdated",
      updateProfile
    );

}, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.resolved,
  ).length;

  const getDeviceDisplay = (deviceId) => {
  const device = deviceRegistry.get(deviceId);

  if (!device) return deviceId;

  return `${device.name} (${device.deviceId})`;
};


  const getRelativeTime = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 5) return "Just now";

    if (seconds < 60) return `${seconds} sec ago`;

    const minutes = Math.floor(seconds / 60);

    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);

    return `${days} day ago`;
  };

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  }

  if (showNotifications) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [showNotifications]);

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

      <div
        className="
    flex
    items-center
    gap-5
  "
      >
        {/* Notification Bell */}
      <div ref={notificationRef} className="relative">
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);

            setShowProfileMenu(false);
          }}
          className="
      relative
      w-11
      h-11
      rounded-full
      hover:bg-black/5
      flex
      items-center
      justify-center
      transition-all
      cursor-pointer
    "
        >
          <Bell size={22} className="text-[#010c29]" />

          {unreadCount > 0 && (
            <span
              className="
          absolute
          -top-1
          -right-1
          min-w-5
          h-5
          rounded-full
          bg-red-500
          text-white
          text-[10px]
          font-bold
          flex
          items-center
          justify-center
          px-1
        "
            >
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <div
            className="
              absolute
              right-0
              top-14
              w-104
              max-h-125
              overflow-y-auto
              rounded-2xl
              bg-white
              border
              border-black/10
              shadow-[0px_0px_20px_0px_rgba(255,87,0,0.15)]
              z-50
            "
          >
            {/* Header */}

            <div
  className="
    px-5
    py-4
    border-b
    border-black/10
  "
>

  {/* Top Row */}

  <div
    className="
      flex
      items-center
      justify-between
    "
  >

    <h3 className="text-lg font-semibold text-[#010c29]">
  Notifications ({notifications.length})
</h3>

    <div
      className="
        flex
        items-center
        gap-4
      "
    >

      {unreadCount > 0 && (

        <button
          onClick={() =>
            triggeredAlertStore.markAllAsRead()
          }
          className="
            text-sm
            text-[#ff5700]
            hover:bg-orange-100
            px-2
            py-1
            rounded-full
            cursor-pointer
          "
        >
          Mark all as read
        </button>

      )}

      {notifications.length > 0 && (

        <button
          onClick={() =>
            triggeredAlertStore.clear()
          }
          className="
            text-sm
            text-red-500
            hover:bg-red-100
            px-2
            py-1
            rounded-full
            cursor-pointer
          "
        >
          Clear all
        </button>

      )}

    </div>

  </div>

  {/* Unread Count */}

  <p className="mt-1 text-sm text-gray-500">
  Latest alerts and events
</p>

</div>

            {/* Empty State */}

            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">

  <Bell
    size={36}
    className="text-gray-300 mb-3"
  />

  <p className="font-medium text-gray-600">
    No notifications yet
  </p>

  <p className="text-sm text-gray-400 mt-1">
    Triggered alerts will appear here.
  </p>

</div>
            ) : (
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="
            px-5
            py-4
            border-b
            border-black/5
            hover:bg-black/5
            transition-all
          "
                >
                  <div
                    className="
    flex
    justify-between
    items-start
  "
                  >
                    <span
                      className={`
      text-sm
      font-semibold

      ${notification.severity === "Critical"
                          ? "text-red-600"
                          : "text-yellow-600"
                        }
    `}
                    >
                      {notification.ruleName}
                    </span>

                    <div
                      className="
      flex
      items-center
      gap-3
    "
                    >
                      {!notification.resolved && (
                        <span
                          className="
          w-2
          h-2
          rounded-full
          bg-red-500
        "
                        />
                      )}

                      <button
                        onClick={() =>
                          triggeredAlertStore.remove(notification.timestamp)
                        }
                        className="
        text-gray-400
        hover:text-red-500
        transition-all
      "
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>

                  <div
                    className="
    text-sm
    text-gray-500
    mt-2
    space-y-1
  "
                  >
                    <p>
                      <span className="font-medium">Device:</span>{" "}
                      {getDeviceDisplay(notification.deviceId)}
                    </p>

                    <p className="text-gray-600 leading-5 mt-2">
  {notification.description ||
    `${notification.telemetryKey} threshold exceeded.`}
</p>
                  </div>

                  <p
                    className="
              text-xs
              text-gray-400
              mt-2
            "
                  >
                    {getRelativeTime(notification.timestamp)}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="
            flex
            items-center
            gap-2
            sm:gap-4
            cursor-pointer
            rounded-full
            px-2
            py-2
            hover:bg-orange/50
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
                {user?.username}
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
              {user?.image ? (

  <img
    src={user.image}
    alt="Profile"
    className="
      w-full
      h-full
      object-cover
      rounded-full
    "
  />

) : (

  <User
    className="text-white"
    size={20}
  />

)}
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
                    {user?.username}
                  </p>

                  <p
                    className="
                    text-sm
                    text-gray-500
                    break-all
                  "
                  >
                    {user?.email}
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
      </div>
    </header>
  );
}

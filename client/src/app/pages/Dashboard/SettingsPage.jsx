import { useState, useEffect } from "react";

import {
  User,
  Bell,
  Shield,
  Globe,
  Info,
  ArrowRightCircle,
  X,
  Camera,
  Save,
  ChevronRight,
} from "lucide-react";

import organizationStore from "../../core/settings/organizationStore";
import settingsStore from "../../core/settings/settingsStore";

export default function SettingsPage() {
  /* ================= ACTIVE MODAL ================= */

  const [activeModal, setActiveModal] = useState(null);

  /* ================= PROFILE DATA ================= */

  const [profileData, setProfileData] = useState({
    username: "",

    email: "",

    fullName: "",

    jobTitle: "",

    organization: "",

    phone: "",

    bio: "",

    image: "",
  });

  const [organizationData, setOrganizationData] = useState(
    organizationStore.get(),
  );

  const [settingsData, setSettingsData] = useState(settingsStore.get());

  /* ================= LOAD SAVED PROFILE ================= */

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("iris_user"));

    const savedProfile = JSON.parse(
      localStorage.getItem("iris_profile") || "{}",
    );

    setProfileData({
      username: savedProfile.username || user?.username || "",

      email: user?.email || "",

      fullName: savedProfile.fullName || "",

      jobTitle: savedProfile.jobTitle || "",

      phone: savedProfile.phone || "",

      bio: savedProfile.bio || "",

      image: savedProfile.image || "",
    });

    setOrganizationData(organizationStore.get());

    setSettingsData(settingsStore.get());
  }, []);

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = () => {
    localStorage.setItem(
      "iris_profile",

      JSON.stringify(profileData),
    );

    /* REALTIME UPDATE */

    window.dispatchEvent(new Event("profileUpdated"));

    alert("Profile Updated Successfully");

    setActiveModal(null);
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileData({
      ...profileData,

      image: imageUrl,
    });
  };

  return (
    <div className="w-full">
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h2
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-[#010c29]
          "
        >
          Settings
        </h2>

        <p
          className="
            text-gray-400
            mt-2
            text-sm
            sm:text-base
          "
        >
          Configure platform preferences
        </p>
      </div>

      {/* ================= SETTINGS GRID ================= */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
          sm:gap-6
        "
      >
        <SettingsCard
          icon={<User />}
          title="Profile Settings"
          desc="Manage account details, profile information and user preferences."
          onClick={() => setActiveModal("profile")}
        />

        <SettingsCard
          icon={<Bell />}
          title="Notifications"
          desc="Configure email alerts, push notifications and system warnings."
          onClick={() => setActiveModal("notifications")}
        />

        <SettingsCard
          icon={<Shield />}
          title="Security"
          desc="Manage passwords, authentication and device access permissions."
          onClick={() => setActiveModal("security")}
        />

        <SettingsCard
          icon={<Globe />}
          title="Organization"
          desc="Manage organization information, timezone and workspace settings."
          onClick={() => setActiveModal("organization")}
        />

        <SettingsCard
          icon={<Info />}
          title="About IRIS"
          desc="Platform information, version details and build information."
          onClick={() => setActiveModal("about")}
        />
      </div>

      {/* ================= PROFILE MODAL ================= */}

      {activeModal === "profile" && (
        <SettingsModal
          title="Profile Settings"
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-6">
            {/* ================= PROFILE IMAGE ================= */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                gap-5
              "
            >
              <div
                className="
                  w-28
                  h-28
                  rounded-full
                  overflow-hidden
                  bg-orange-100
                  flex
                  items-center
                  justify-center
                "
              >
                {profileData.image ? (
                  <img
                    src={profileData.image}
                    alt="Profile"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />
                ) : (
                  <Camera size={34} className="text-[#ff5700]" />
                )}
              </div>

              <div className="flex-1">
                <label className="font-semibold">Upload Profile Picture</label>

                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="
                    mt-2
                    block
                    w-full
                    text-sm
                    text-gray-700
                    border-gray-300
                    rounded
                    file:cursor-pointer
                    file:bg-white
                    file:border
                    file:rounded-2xl
                    file:border-gray-300
                    file:px-3
                    file:py-1.5
                    file:text-sm
                    file:text-gray-900
                    file:font-medium
                    hover:file:bg-gray-100
                  "
                />

                {/* DELETE IMAGE */}

                {profileData.image && (
                  <button
                    onClick={() =>
                      setProfileData({
                        ...profileData,

                        image: "",
                      })
                    }
                    className="
                      mt-4
                      px-4
                      py-2
                      rounded-lg
                      bg-red-500
                      text-white
                      text-sm
                      hover:bg-red-600
                      cursor-pointer
                    "
                  >
                    Remove Profile Picture
                  </button>
                )}
              </div>
            </div>

            {/* ================= USERNAME ================= */}

            <div>
              <label className="font-semibold">Update Username</label>

              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,

                    username: e.target.value,
                  })
                }
                placeholder="Enter username"
                className="
                  mt-2
                  w-full
                  border
                  border-black/10
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-[#ff5700]
                "
              />
            </div>

            <div>
              <label className="font-semibold">Full Name</label>

              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    fullName: e.target.value,
                  })
                }
                className="
                  mt-2
                  w-full
                  border
                  border-black/10
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-[#ff5700]
                "
              />
            </div>

            <div>
              <label className="font-semibold">Job Title</label>

              <input
                type="text"
                value={profileData.jobTitle}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    jobTitle: e.target.value,
                  })
                }
                className="
                  mt-2
                  w-full
                  border
                  border-black/10
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-[#ff5700]
                "
              />
            </div>

            <div>
              <label className="font-semibold">Phone Number</label>

              <input
                type="tel"
                value={profileData.phone}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    phone: e.target.value,
                  })
                }
                className="
                  mt-2
                  w-full
                  border
                  border-black/10
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  focus:border-[#ff5700]
                "
              />
            </div>

            {/* ================= SAVE BUTTON ================= */}

            <button
              onClick={handleSaveProfile}
              className="
                w-full
                sm:w-auto
                px-6
                py-3
                rounded-xl
                bg-[#ff5700]
                text-white
                flex
                items-center
                justify-center
                gap-2
                hover:opacity-90
                transition-all
              "
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </SettingsModal>
      )}

      {/* ================= NOTIFICATIONS MODAL ================= */}

      {activeModal === "notifications" && (
        <SettingsModal
          title="Notification Settings"
          onClose={() => setActiveModal(null)}
        >
          <div className="space-y-5">
            <ToggleSetting
              title="Email Notifications"
              value={settingsData.emailNotifications}
              onChange={(value) =>
                setSettingsData({
                  ...settingsData,
                  emailNotifications: value,
                })
              }
            />

            <ToggleSetting
              title="Push Notifications"
              value={settingsData.pushNotifications}
              onChange={(value) =>
                setSettingsData({
                  ...settingsData,
                  pushNotifications: value,
                })
              }
            />

            <ToggleSetting
              title="Critical Alerts"
              value={settingsData.criticalAlerts}
              onChange={(value) =>
                setSettingsData({
                  ...settingsData,
                  criticalAlerts: value,
                })
              }
            />

            <ToggleSetting
              title="Device Offline Alerts"
              value={settingsData.offlineAlerts}
              onChange={(value) =>
                setSettingsData({
                  ...settingsData,
                  offlineAlerts: value,
                })
              }
            />

            <button
              onClick={() => {
                settingsStore.save(settingsData);

                alert("Notification settings saved.");

                setActiveModal(null);
              }}
              className="
                  px-6
                  py-3
                  rounded-xl
                  bg-[#ff5700]
                  text-white
                  hover:opacity-90
                "
            >
              Save Settings
            </button>
          </div>
        </SettingsModal>
      )}

      {/* ================= SECURITY MODAL ================= */}

      {activeModal === "security" && (
        <SettingsModal
          title="Security Settings"
          onClose={() => setActiveModal(null)}
        >
          <div
            className="
    space-y-6
    text-gray-600
  "
          >
            <div
              className="
      rounded-2xl
      border
      border-orange-200
      bg-orange-50
      p-5
    "
            >
              <h3
                className="
        font-semibold
        text-[#010c29]
        mb-2
      "
              >
                Password Management
              </h3>

              <p
                className="
        text-sm
        leading-relaxed
      "
              >
                IRIS uses <strong>AWS Cognito</strong> for secure
                authentication. Password changes will be managed directly
                through AWS Cognito in a future update.
              </p>
            </div>
          </div>
        </SettingsModal>
      )}

      {/* ==============ABOUT MODAL=================== */}

      {activeModal === "about" && (
        <SettingsModal title="About IRIS" onClose={() => setActiveModal(null)}>
          <div className="space-y-6">
            <InfoRow label="Platform" value="IRIS IoT Platform" />

            <InfoRow label="Version" value={__APP_VERSION__} />

            <InfoRow label="Build Date" value={__BUILD_DATE__} />

            <InfoRow
              label="Application Mode"
              value={
                import.meta.env.MODE === "development"
                  ? "Development"
                  : "Production"
              }
            />

            <InfoRow label="Developed By" value="Hyperlink Technologies" />
          </div>
        </SettingsModal>
      )}

      {/* ================= ORGANIZATION MODAL ================= */}

      {activeModal === "organization" && (
        <SettingsModal
          title="Organization Settings"
          onClose={() => setActiveModal(null)}
        >
          <div>
            <label className="font-semibold">Organization Name</label>

            <input
              type="text"
              value={organizationData.organizationName}
              onChange={(e) =>
                setOrganizationData({
                  ...organizationData,

                  organizationName: e.target.value,
                })
              }
              className="
      mt-2
      w-full
      border
      border-black/10
      rounded-xl
      px-4
      py-3
    "
            />
          </div>

          <div>
            <label className="font-semibold">Industry</label>

            <select
              className="
      mt-2
      w-full
      border
      border-black/10
      rounded-xl
      px-4
      py-3
    "
              value={organizationData.industry}
              onChange={(e) =>
                setOrganizationData({
                  ...organizationData,

                  industry: e.target.value,
                })
              }
            >
              <option>Manufacturing</option>
              <option>Energy</option>
              <option>Agriculture</option>
              <option>Healthcare</option>
              <option>Smart Home</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Timezone</label>

            <select
              className="
                  mt-2
                  w-full
                  border
                  border-black/10
                  rounded-xl
                  px-4
                  py-3
                "
              value={organizationData.timezone}
              onChange={(e) =>
                setOrganizationData({
                  ...organizationData,

                  timezone: e.target.value,
                })
              }
            >
              <option>Asia/Kolkata</option>

              <option>UTC</option>

              <option>America/New_York</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">Country</label>

            <input
              type="text"
              value={organizationData.country}
              onChange={(e) =>
                setOrganizationData({
                  ...organizationData,

                  country: e.target.value,
                })
              }
              className="
      mt-2
      w-full
      border
      border-black/10
      rounded-xl
      px-4
      py-3
    "
            />
          </div>

          <button
            onClick={() => {
              organizationStore.save(organizationData);

              alert("Organization updated successfully");

              setActiveModal(null);
            }}
            className="
    mt-6
    px-6
    py-3
    rounded-xl
    bg-[#ff5700]
    text-white
    hover:opacity-90
  "
          >
            Save Organization
          </button>
        </SettingsModal>
      )}
    </div>
  );
}

/* ================= SETTINGS CARD ================= */

function SettingsCard({ icon, title, desc, onClick }) {
  return (
    <div
    onClick={onClick}
      className="
        bg-black/5
        border
        border-black/10
        shadow-md
        rounded-3xl
        p-5
        sm:p-5
        lg:p-6
        hover:border-[#ff5700]/30
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        duration-300
        cursor-pointer
        hover:bg-white
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-2
        "
      >
        <div
          className="
            w-14
            h-14
            rounded-2xl
            bg-orange-500/10
            flex
            items-center
            justify-center
            text-[#ff5700]
            mb-3
            border
            border-orange-500/10
          "
        >
          {icon}
        </div>

          <ChevronRight
            size={25}
            className="
              text-gray-500
            "
          />

      </div>

      <h3
        className="
          text-xl
          sm:text-xl
          font-bold
          mb-2
          text-[#010c29]
        "
      >
        {title}
      </h3>

      <p
        className="
          text-gray-500
          text-sm
          sm:text-sm
          leading-relaxed
        "
      >
        {desc}
      </p>
    </div>
  );
}

/* ================= MODAL ================= */

function SettingsModal({ title, children, onClose }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-2xl
          rounded-3xl
          shadow-2xl
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* ================= HEADER ================= */}

        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-5
            border-b
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-full
              hover:bg-gray-100
              cursor-pointer
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* ================= BODY ================= */}

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

/* ================= TOGGLE ================= */

function ToggleSetting({ title, value, onChange }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        border
        border-black/10
        rounded-2xl
        px-5
        py-4
      "
    >
      <p className="font-medium">{title}</p>

      <button
        onClick={() => onChange(!value)}
        className={`
          w-14
          h-8
          rounded-full
          transition-all
          relative
          ${value ? "bg-[#ff5700]" : "bg-gray-300"}
        `}
      >
        <div
          className={`
            absolute
            top-1
            w-6
            h-6
            rounded-full
            bg-white
            transition-all
            ${value ? "left-7" : "left-1"}
          `}
        />
      </button>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      className="
        flex
        justify-between
        items-center
        border
        border-black/10
        rounded-2xl
        px-5
        py-4
      "
    >
      <span
        className="
          font-medium
          text-gray-500
        "
      >
        {label}
      </span>

      <span
        className="
          font-semibold
          text-[#010c29]
        "
      >
        {value}
      </span>
    </div>
  );
}

import {
  useState,
  useEffect,
} from "react";

import {
  User,
  Bell,
  Shield,
  Globe,
  ArrowRightCircle,
  X,
  Camera,
  Save,
} from "lucide-react";

export default function SettingsPage() {

  /* ================= ACTIVE MODAL ================= */

  const [activeModal, setActiveModal] =
    useState(null);

  /* ================= PROFILE DATA ================= */

  const [profileData, setProfileData] =
    useState({

      username: "",

      email: "",

      bio: "",

      image: "",
    });

  /* ================= LOAD SAVED PROFILE ================= */

  useEffect(() => {

    const savedProfile =
      localStorage.getItem(
        "iris_profile"
      );

    if (savedProfile) {

      setProfileData(
        JSON.parse(savedProfile)
      );
    }

  }, []);

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = () => {

  localStorage.setItem(

    "iris_profile",

    JSON.stringify(profileData)
  );

  /* REALTIME UPDATE */

  window.dispatchEvent(
    new Event("profileUpdated")
  );

  alert(
    "Profile Updated Successfully"
  );

  setActiveModal(null);
};

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (
    e
  ) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

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
          onClick={() =>
            setActiveModal("profile")
          }
        />

        <SettingsCard
          icon={<Bell />}
          title="Notifications"
          desc="Configure email alerts, push notifications and system warnings."
          onClick={() =>
            setActiveModal("notifications")
          }
        />

        <SettingsCard
          icon={<Shield />}
          title="Security"
          desc="Manage passwords, authentication and device access permissions."
          onClick={() =>
            setActiveModal("security")
          }
        />

        <SettingsCard
          icon={<Globe />}
          title="Platform Preferences"
          desc="Configure timezone, language and dashboard personalization options."
          onClick={() =>
            setActiveModal("platform")
          }
        />

      </div>

      {/* ================= PROFILE MODAL ================= */}

      {activeModal === "profile" && (

        <SettingsModal
          title="Profile Settings"
          onClose={() =>
            setActiveModal(null)
          }
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

                  <Camera
                    size={34}
                    className="text-[#ff5700]"
                  />

                )}

              </div>

              <div className="flex-1">

                <label className="font-semibold">
                  Upload Profile Picture
                </label>

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

              <label className="font-semibold">
                Update Username
              </label>

              <input
                type="text"

                value={
                  profileData.username
                }

                onChange={(e) =>

                  setProfileData({

                    ...profileData,

                    username:
                      e.target.value,
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

            {/* ================= EMAIL ================= */}

            {/* <div>

              <label className="font-semibold">
                Email
              </label>

              <input
                type="email"

                value={
                  profileData.email
                }

                onChange={(e) =>

                  setProfileData({

                    ...profileData,

                    email:
                      e.target.value,
                  })
                }

                placeholder="Enter email"

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

            </div> */}

            {/* ================= BIO ================= */}

            {/* <div>

              <label className="font-semibold">
                Bio
              </label>

              <textarea

                rows={4}

                value={
                  profileData.bio
                }

                onChange={(e) =>

                  setProfileData({

                    ...profileData,

                    bio:
                      e.target.value,
                  })
                }

                placeholder="Write something..."

                className="
                  mt-2
                  w-full
                  border
                  border-black/10
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  resize-none
                  focus:border-[#ff5700]
                "
              />

            </div> */}

            {/* ================= SAVE BUTTON ================= */}

            <button

              onClick={
                handleSaveProfile
              }

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
          onClose={() =>
            setActiveModal(null)
          }
        >

          <div className="space-y-5">

            <ToggleSetting
              title="Email Notifications"
            />

            <ToggleSetting
              title="Push Notifications"
            />

            <ToggleSetting
              title="Critical Alerts"
            />

            <ToggleSetting
              title="Device Offline Alerts"
            />

          </div>

        </SettingsModal>
      )}

      {/* ================= SECURITY MODAL ================= */}

      {activeModal === "security" && (

        <SettingsModal
          title="Security Settings"
          onClose={() =>
            setActiveModal(null)
          }
        >

          <div className="space-y-5">

            <input
              type="password"
              placeholder="Current Password"
              className="
                w-full
                border
                border-black/10
                rounded-xl
                px-4
                py-3
              "
            />

            <input
              type="password"
              placeholder="New Password"
              className="
                w-full
                border
                border-black/10
                rounded-xl
                px-4
                py-3
              "
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="
                w-full
                border
                border-black/10
                rounded-xl
                px-4
                py-3
              "
            />

            <button
              className="
                px-6
                py-3
                rounded-xl
                bg-[#ff5700]
                text-white
                hover:opacity-90
              "
            >
              Update Password
            </button>

          </div>

        </SettingsModal>
      )}

      {/* ================= PLATFORM MODAL ================= */}

      {activeModal === "platform" && (

        <SettingsModal
          title="Platform Preferences"
          onClose={() =>
            setActiveModal(null)
          }
        >

          <div className="space-y-5">

            <div>

              <label className="font-semibold">
                Language
              </label>

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
              >

                <option>English</option>

                <option>Tamil</option>

                <option>Hindi</option>

              </select>

            </div>

            <div>

              <label className="font-semibold">
                Timezone
              </label>

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
              >

                <option>
                  Asia/Kolkata
                </option>

                <option>
                  UTC
                </option>

                <option>
                  America/New_York
                </option>

              </select>

            </div>

            <ToggleSetting
              title="Dark Mode"
            />

            <ToggleSetting
              title="Compact Dashboard"
            />

          </div>

        </SettingsModal>
      )}

    </div>
  );
}

/* ================= SETTINGS CARD ================= */

function SettingsCard({
  icon,
  title,
  desc,
  onClick,
}) {

  return (

    <div
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

        <button
          onClick={onClick}
          className="
            group
            relative
            cursor-pointer
            mb-3
            mr-2
            p-2
            rounded-full
            hover:bg-[#ff5700]/20
            transition-all
            duration-300
          "
        >

          <ArrowRightCircle
            size={30}
            className="
              text-gray-500
              hover:text-[#010c29]
            "
          />

          <span
            className="
              absolute
              -top-10
              left-[50%]
              translate-x-[-50%]
              z-20
              origin-bottom
              scale-0
              px-3
              rounded-lg
              border
              border-gray-300
              bg-white
              py-2
              text-sm
              font-bold
              shadow-md
              transition-all
              duration-300
              group-hover:scale-100
            "
          >
            Edit
          </span>

        </button>

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

function SettingsModal({
  title,
  children,
  onClose,
}) {

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
            "
          >

            <X size={24} />

          </button>

        </div>

        {/* ================= BODY ================= */}

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

/* ================= TOGGLE ================= */

function ToggleSetting({
  title,
}) {

  const [enabled, setEnabled] =
    useState(true);

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

      <p className="font-medium">
        {title}
      </p>

      <button
        onClick={() =>
          setEnabled(!enabled)
        }
        className={`
          w-14
          h-8
          rounded-full
          transition-all
          relative
          ${
            enabled
              ? "bg-[#ff5700]"
              : "bg-gray-300"
          }
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
            ${
              enabled
                ? "left-7"
                : "left-1"
            }
          `}
        />

      </button>

    </div>
  );
}
import { Camera, Save } from "lucide-react";
import SettingsModal from "./SettingsModal";

export default function ProfileModal({
  open,
  onClose,
  profileData,
  setProfileData,
  profileCompletion,
  handleImageChange,
  handleSaveProfile,
  saving,
}) {
  if (!open) return null;

  return (
        <SettingsModal
          title="Profile Settings"
          onClose={onClose}
        >
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Profile Completion</span>

                <span className="text-[#ff5700] font-bold">
                  {profileCompletion}%
                </span>
              </div>

              <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full bg-[#ff5700] transition-all duration-500"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />
              </div>
            </div>
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
                    loading="lazy"
                    decoding="async"
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
                  onChange={handleImageChange}
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
              <label className="font-semibold">Email</label>

              <input
                type="email"
                value={profileData.email}
                readOnly
                className="
      mt-2
      w-full
      border
      border-black/10
      rounded-xl
      px-4
      py-3
      bg-gray-100
      text-gray-500
      cursor-not-allowed
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

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>

              <textarea
                rows={4}
                value={profileData.bio}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    bio: e.target.value,
                  })
                }
                placeholder="Tell us about yourself..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#ff5700]"
              />
            </div>

            {/* ================= SAVE BUTTON ================= */}

            <button
              onClick={handleSaveProfile}
              disabled={saving}
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

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </SettingsModal>
      )}
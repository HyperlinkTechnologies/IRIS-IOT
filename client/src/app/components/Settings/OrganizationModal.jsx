import SettingsModal from "./SettingsModal";

export default function OrganizationModal({
  open,
  onClose,
  profileData,
  setProfileData,
  handleSaveProfile,
  saving,
}) {
  if (!open) return null;

  return (
        <SettingsModal
          title="Organization Settings"
          onClose={onClose}
        >
          <div className="space-y-5">
            <div>
              <label className="block font-semibold">Organization Name</label>

              <input
                type="text"
                value={profileData.companyName}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    companyName: e.target.value,
                  })
                }
                className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-semibold">Website</label>

              <input
                type="url"
                value={profileData.companyWebsite}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    companyWebsite: e.target.value,
                  })
                }
                className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3"
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label className="block font-semibold">Company Email</label>

              <input
                type="email"
                value={profileData.companyEmail}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    companyEmail: e.target.value,
                  })
                }
                className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-semibold">Company Phone</label>

              <input
                type="text"
                value={profileData.companyPhone}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    companyPhone: e.target.value,
                  })
                }
                className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block font-semibold">Company Address</label>

              <textarea
                rows={3}
                value={profileData.companyAddress}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    companyAddress: e.target.value,
                  })
                }
                className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3 resize-none"
              />
            </div>

            <div>
              <label className="block font-semibold">Company Description</label>

              <textarea
                rows={4}
                value={profileData.companyDescription}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    companyDescription: e.target.value,
                  })
                }
                className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3 resize-none"
              />
            </div>

            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="mt-6 w-full px-6 py-3 rounded-xl bg-[#ff5700] text-white hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Organization"}
            </button>
          </div>
        </SettingsModal>
      )}
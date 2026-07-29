import {
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

export default function ChangePasswordCard({
  passwordData,
  setPasswordData,
  handleChangePassword,
  changingPassword,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  passwordStrength,
  setShowForgotPassword,
}) {
  return (
<div className="border rounded-xl p-5">
              <h3 className="text-lg font-semibold">Change Password</h3>

              <p className="text-sm text-gray-500 mt-1 mb-5">
                Update your account password securely.
              </p>

              <div className="space-y-4">
                <div className="relative">
  <input
    type={showCurrentPassword ? "text" : "password"}
    placeholder="Current Password"
    value={passwordData.currentPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        currentPassword: e.target.value,
      })
    }
    className="w-full border rounded-xl px-4 py-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowCurrentPassword(!showCurrentPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    {showCurrentPassword ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>
</div>

                <div className="relative">
                  
  <input
    type={showNewPassword ? "text" : "password"}
    placeholder="New Password"
    value={passwordData.newPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        newPassword: e.target.value,
      })
    }
    className="w-full border rounded-xl px-4 py-3 pr-12"
  />
  

  <button
    type="button"
    onClick={() =>
      setShowNewPassword(!showNewPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    {showNewPassword ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>
</div>
<div className="mt-2">
  <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
    <div
      className={`h-full transition-all duration-300 ${
        passwordStrength <= 2
          ? "bg-red-500"
          : passwordStrength <= 4
          ? "bg-yellow-500"
          : "bg-green-500"
      }`}
      style={{
        width: `${passwordStrength * 20}%`,
      }}
    />
  </div>

  <p className="text-xs text-gray-500 mt-1">
    {passwordStrength <= 2
      ? "Weak"
      : passwordStrength <= 4
      ? "Medium"
      : "Strong"}
  </p>
</div>

                <div className="relative">
  <input
    type={showConfirmPassword ? "text" : "password"}
    placeholder="Confirm New Password"
    value={passwordData.confirmPassword}
    onChange={(e) =>
      setPasswordData({
        ...passwordData,
        confirmPassword: e.target.value,
      })
    }
    className="w-full border rounded-xl px-4 py-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(!showConfirmPassword)
    }
    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    {showConfirmPassword ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>

</div>

                <button
  onClick={handleChangePassword}
  disabled={changingPassword}
  className="w-full bg-[#ff5700] text-white rounded-xl py-3 disabled:opacity-60"
>
  {changingPassword
    ? "Updating..."
    : "Change Password"}
</button>
<div className="text-right">
  <button
    type="button"
    onClick={() => setShowForgotPassword(true)}
    className="text-[#ff5700] hover:underline cursor-pointer"
  >
    Forgot Password?
  </button>
</div>
              </div>
                </div>
  );
}
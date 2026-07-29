import { Check, Eye, EyeOff } from "lucide-react";
import SettingsModal from "./SettingsModal";

export default function ForgotPasswordModal({
  open,
  onClose,
  forgotPasswordData,
  setForgotPasswordData,
  handleSendResetCode,
  handleResetPassword,
  sendingCode,
  resettingPassword,
  codeSent,
  resetSuccess,
  resendTimer,
  otpInputRef,
  showForgotNewPassword,
  setShowForgotNewPassword,
  showForgotConfirmPassword,
  setShowForgotConfirmPassword,
  passwordStrength,
}) {
    if (!open) return null;
    return(
  <SettingsModal
    title="Reset Password"
    onClose={onClose}
  >
    <div className="space-y-5">
        
      {resetSuccess ? (
  <div className="text-center py-10">

    <div className="w-16 h-16 rounded-full bg-green-100 mx-auto flex items-center justify-center">

      <Check className="text-green-600" size={32} />

    </div>

    <h3 className="mt-5 text-xl font-semibold">
      Password Reset Successful
    </h3>

    <p className="text-gray-500 mt-2">
      Redirecting...
    </p>

  </div>
) : (
  <>
      <div>
        <label className="font-semibold">
          Enter Your Email
        </label>

        <input
          type="email"
          value={forgotPasswordData.email}
          onChange={(e) =>
            setForgotPasswordData({
              ...forgotPasswordData,
              email: e.target.value,
            })
          }
          className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3 "
        />
      </div>

      {!codeSent ? (
        <button
          onClick={handleSendResetCode}
          disabled={sendingCode}
          className="w-full bg-[#ff5700] text-white rounded-xl py-3 disabled:opacity-60 cursor-pointer"
        >
          {sendingCode
            ? "Sending..."
            : "Send Verification Code"}
        </button>
      ) : (
        <>
          <div>
            <label className="font-semibold">
              Verification Code
            </label>

            <input
            ref={otpInputRef}
              value={forgotPasswordData.code}
              onChange={(e) =>
                setForgotPasswordData({
                  ...forgotPasswordData,
                  code: e.target.value,
                })
              }
              className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3"
            />
          </div>
          <div className="flex justify-end">
  <button
    type="button"
    disabled={resendTimer > 0}
    onClick={handleSendResetCode}
    className="text-sm text-[#ff5700] cursor-pointer hover:bg-[#ff5700]/15 rounded-full px-2 py-1 disabled:text-gray-400 "
  >
    {resendTimer > 0
      ? `Resend OTP (${resendTimer}s)`
      : "Resend OTP"}
  </button>
</div>

          <div>
            <label className="font-semibold">
              New Password
            </label>

            <div className="relative">
  <input
    type={
      showForgotNewPassword
        ? "text"
        : "password"
    }
    value={forgotPasswordData.newPassword}
    onChange={(e) =>
      setForgotPasswordData({
        ...forgotPasswordData,
        newPassword: e.target.value,
      })
    }
    className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowForgotNewPassword(
        !showForgotNewPassword
      )
    }
    className="absolute right-4 top-1/2 -translate-y-1/2"
  >
    {showForgotNewPassword ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>
</div>
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

          <div>
            <label className="font-semibold">
              Confirm Password
            </label>

            <div className="relative">
  <input
    type={
      showForgotConfirmPassword
        ? "text"
        : "password"
    }
    value={
      forgotPasswordData.confirmPassword
    }
    onChange={(e) =>
      setForgotPasswordData({
        ...forgotPasswordData,
        confirmPassword: e.target.value,
      })
    }
    className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3 pr-12"
  />

  <button
    type="button"
    onClick={() =>
      setShowForgotConfirmPassword(
        !showForgotConfirmPassword
      )
    }
    className="absolute right-4 top-1/2 -translate-y-1/2"
  >
    {showForgotConfirmPassword ? (
      <EyeOff size={18} />
    ) : (
      <Eye size={18} />
    )}
  </button>
</div>
          </div>

          <button
            onClick={handleResetPassword}
            disabled={resettingPassword}
            className="w-full bg-[#ff5700] text-white rounded-xl py-3 disabled:opacity-60"
          >
            {resettingPassword
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </>
      )}

      </>
)}
</div>
</SettingsModal>
);
}
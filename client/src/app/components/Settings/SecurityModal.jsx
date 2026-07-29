import SettingsModal from "./SettingsModal";

import ChangePasswordCard from "./cards/ChangePasswordCard";
import TwoFactorCard from "./cards/TwoFactorCard";
import LoginAlertsCard from "./cards/LoginAlertsCard";
import SessionTimeoutCard from "./cards/SessionTimeoutCard";
import ActiveSessionsCard from "./cards/ActiveSessionsCard";

export default function SecurityModal({
  open,
  onClose,

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

  twoFactorEnabled,
  handleToggle2FA,
  twoFactorLoading,

  loginAlerts,
  handleToggleLoginAlerts,
  loginAlertsLoading,

  sessionTimeout,
  handleSessionTimeoutChange,
  activeSessions,
handleSignOutSession,
handleSignOutAllSessions,
}) {
  if (!open) return null;

  return (
    <SettingsModal
      title="Security Settings"
      onClose={onClose}
    >
      <div className="space-y-6">

        <ChangePasswordCard
  passwordData={passwordData}
  setPasswordData={setPasswordData}
  handleChangePassword={handleChangePassword}
  changingPassword={changingPassword}
  showCurrentPassword={showCurrentPassword}
  setShowCurrentPassword={setShowCurrentPassword}
  showNewPassword={showNewPassword}
  setShowNewPassword={setShowNewPassword}
  showConfirmPassword={showConfirmPassword}
  setShowConfirmPassword={setShowConfirmPassword}
  passwordStrength={passwordStrength}
  setShowForgotPassword={setShowForgotPassword}
/>

        <TwoFactorCard
  twoFactorEnabled={twoFactorEnabled}
  handleToggle2FA={handleToggle2FA}
  twoFactorLoading={twoFactorLoading}
/>

        <LoginAlertsCard
  loginAlerts={loginAlerts}
  handleToggleLoginAlerts={handleToggleLoginAlerts}
  loginAlertsLoading={loginAlertsLoading}
/>

        <SessionTimeoutCard
  sessionTimeout={sessionTimeout}
  onChange={handleSessionTimeoutChange}
/>

        <ActiveSessionsCard/>

      </div>
    </SettingsModal>
  );
}

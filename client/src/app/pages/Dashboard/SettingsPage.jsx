import { useState, useEffect } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
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
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

import { getUser, updateUser } from "../../services/user.service";

import {
  getCurrentUser,
  updatePassword,
  resetPassword,
  confirmResetPassword,
  setUpTOTP,
  verifyTOTPSetup,
  updateMFAPreference,
  fetchMFAPreference,
} from "aws-amplify/auth";

import { useUser } from "../../../context/UserContext";
import { uploadProfileImage } from "../../services/image.service";
// import settingsStore from "../../core/settings/settingsStore";
import TwoFactorModal from "../../components/Settings/TwoFactorModal";
import ForgotPasswordModal from "../../components/Settings/ForgotPasswordModal";
import ProfileModal from "../../components/Settings/ProfileModal";
import OrganizationModal from "../../components/Settings/OrganizationModal";
import SecurityModal from "../../components/Settings/SecurityModal";
import SettingsCard from "../../components/Settings/SetingsCard";
import AboutModal from "../../components/Settings/AboutModal";

function calculateProfileCompletion(profile) {
  const fields = [
    profile.username,
    profile.fullName,
    profile.phone,
    profile.jobTitle,
    profile.bio,
    profile.image,
  ];

  const completed = fields.filter(
    (field) => field && field.toString().trim() !== "",
  ).length;

  return Math.round((completed / fields.length) * 100);
}

function validateProfile(profile) {
  if (profile.username.trim().length < 3) {
    return "Username must contain at least 3 characters.";
  }

  if (!profile.fullName.trim()) {
    return "Full name is required.";
  }

  if (profile.phone && !/^[0-9]{10}$/.test(profile.phone)) {
    return "Phone number must contain exactly 10 digits.";
  }

  if (profile.bio.length > 300) {
    return "Bio cannot exceed 300 characters.";
  }

  if (
    profile.companyWebsite &&
    !/^https?:\/\/.+/i.test(profile.companyWebsite)
  ) {
    return "Company website must start with http:// or https://";
  }

  if (
    profile.companyEmail &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.companyEmail)
  ) {
    return "Invalid company email address.";
  }

  if (profile.companyPhone && !/^[0-9]{10}$/.test(profile.companyPhone)) {
    return "Company phone must contain exactly 10 digits.";
  }

  if (profile.companyDescription && profile.companyDescription.length > 500) {
    return "Company description cannot exceed 500 characters.";
  }

  return null;
}

function hasProfileChanged(current, initial) {
  return JSON.stringify(current) !== JSON.stringify(initial);
}

function validatePassword(passwordData) {
  if (!passwordData.currentPassword.trim()) {
    return "Current password is required.";
  }

  if (passwordData.newPassword.length < 8) {
    return "New password must contain at least 8 characters.";
  }

  if (!/[A-Z]/.test(passwordData.newPassword)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(passwordData.newPassword)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[0-9]/.test(passwordData.newPassword)) {
    return "Password must contain at least one number.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwordData.newPassword)) {
    return "Password must contain at least one special character.";
  }

  if (passwordData.newPassword !== passwordData.confirmPassword) {
    return "Passwords do not match.";
  }

  return null;
}
function validateforgotPassword(forgotpasswordData) {
  if (!forgotpasswordData.currentPassword.trim()) {
    return "Current password is required.";
  }

  if (forgotpasswordData.newPassword.length < 8) {
    return "New password must contain at least 8 characters.";
  }

  if (!/[A-Z]/.test(forgotpasswordData.newPassword)) {
    return "Password must contain at least one uppercase letter.";
  }

  if (!/[a-z]/.test(forgotpasswordData.newPassword)) {
    return "Password must contain at least one lowercase letter.";
  }

  if (!/[0-9]/.test(forgotpasswordData.newPassword)) {
    return "Password must contain at least one number.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(forgotpasswordData.newPassword)) {
    return "Password must contain at least one special character.";
  }

  if (forgotpasswordData.newPassword !== forgotpasswordData.confirmPassword) {
    return "Passwords do not match.";
  }

  return null;
}

export default function SettingsPage({
    setActiveTab,
}) {
  /* ================= ACTIVE MODAL ================= */

  const [activeModal, setActiveModal] = useState(null);

  const { user, setUser } = useUser();
  console.log(user);
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

  const [saving, setSaving] = useState(false);

  const [initialProfile, setInitialProfile] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [changingPassword, setChangingPassword] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);

  const [showForgotConfirmPassword, setShowForgotConfirmPassword] =
    useState(false);

  const otpInputRef = useRef(null);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: user?.email || "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [sendingCode, setSendingCode] = useState(false);
  const [resettingPassword, setResettingPassword] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(
    user?.twoFactorEnabled ?? false,
  );

  const [loginAlerts, setLoginAlerts] = useState(user?.loginAlerts ?? false);

  const [sessionTimeout, setSessionTimeout] = useState(
  user?.sessionTimeout ?? 30
);

  const [loginAlertsLoading, setLoginAlertsLoading] = useState(false);

  const [twoFactorLoading, setTwoFactorLoading] = useState(false);

  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);

  const [totpUri, setTotpUri] = useState("");

  const [totpCode, setTotpCode] = useState("");

  const [totpSetupDetails, setTotpSetupDetails] = useState(null);

  const passwordStrength = (() => {
    const password = passwordData.newPassword;

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    return score;
  })();

  const profileCompletion = useMemo(
    () => calculateProfileCompletion(profileData),
    [profileData],
  );

  /* ================= LOAD SAVED PROFILE ================= */

  useEffect(() => {
    if (!user) return;

    setProfileData({
      username: user.username || "",
      email: user.email || "",
      fullName: user.fullName || "",
      jobTitle: user.jobTitle || "",
      phone: user.phone || "",
      bio: user.bio || "",
      image: user.image || "",

      companyName: user.companyName || "",
      companyWebsite: user.companyWebsite || "",
      companyEmail: user.companyEmail || "",
      companyPhone: user.companyPhone || "",
      companyAddress: user.companyAddress || "",
      companyDescription: user.companyDescription || "",
    });

    setInitialProfile({
      username: user.username || "",
      email: user.email || "",
      fullName: user.fullName || "",
      jobTitle: user.jobTitle || "",
      phone: user.phone || "",
      bio: user.bio || "",
      image: user.image || "",

      companyName: user.companyName || "",
      companyWebsite: user.companyWebsite || "",
      companyEmail: user.companyEmail || "",
      companyPhone: user.companyPhone || "",
      companyAddress: user.companyAddress || "",
      companyDescription: user.companyDescription || "",
    });

    // setOrganizationData(organizationStore.get());
    // setSettingsData(settingsStore.get());
    setLoginAlerts(user?.loginAlerts ?? false);
    setSessionTimeout(user?.sessionTimeout ?? 30);
  }, [user]);

  useEffect(() => {
    if (!codeSent || resendTimer === 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [codeSent, resendTimer]);

  useEffect(() => {
    async function loadMFAStatus() {
      try {
        const preference = await fetchMFAPreference();

        if (preference?.preferred === "TOTP") {
          setTwoFactorEnabled(true);
        } else {
          setTwoFactorEnabled(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (user) {
      loadMFAStatus();
    }
  }, [user]);

  async function handleChangePassword() {
    const error = validatePassword(passwordData);

    if (error) {
      toast.error(error);
      return;
    }

    setChangingPassword(true);

    try {
      await updatePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password updated successfully.");

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to update password.");
    } finally {
      setChangingPassword(false);
    }
  }

  async function handleSendResetCode() {
    if (!forgotPasswordData.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    setSendingCode(true);
    setTimeout(() => {
      otpInputRef.current?.focus();
    }, 100);
    setResendTimer(60);

    try {
      await resetPassword({
        username: forgotPasswordData.email,
      });

      setCodeSent(true);

      toast.success("Verification code sent.");
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to send verification code.");
    } finally {
      setSendingCode(false);
    }
  }

  async function handleResetPassword() {
    const error = validateforgotPassword({
      currentPassword: "dummy",
      newPassword: forgotPasswordData.newPassword,
      confirmPassword: forgotPasswordData.confirmPassword,
    });

    if (error && error !== "Current password is required.") {
      toast.error(error);

      return;
    }

    setResettingPassword(true);

    try {
      await confirmResetPassword({
        username: forgotPasswordData.email,
        confirmationCode: forgotPasswordData.code,
        newPassword: forgotPasswordData.newPassword,
      });

      toast.success("Password reset successfully.");

      setResetSuccess(true);

      setTimeout(() => {
        setShowForgotPassword(false);

        setCodeSent(false);

        setResetSuccess(false);

        setForgotPasswordData({
          email: user?.email || "",
          code: "",
          newPassword: "",
          confirmPassword: "",
        });

        setResendTimer(60);

        setShowForgotNewPassword(false);

        setShowForgotConfirmPassword(false);
      }, 2000);
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Password reset failed.");
    } finally {
      setResettingPassword(false);
    }
  }

  async function handleToggle2FA() {
    if (twoFactorEnabled) {
      setTwoFactorLoading(true);

      try {
        await updateMFAPreference({
          totp: "PREFERRED",
          sms: "DISABLED",
        });

        await updateUser(user.userId, {
          twoFactorEnabled: false,
        });

        setTwoFactorEnabled(false);

        toast.success("Two-Factor Authentication disabled.");
      } catch (error) {
        console.error(error);

        toast.error(error.message);
      } finally {
        setTwoFactorLoading(false);
      }

      return;
    }

    setTwoFactorLoading(true);

    try {
      const details = await setUpTOTP();

      setTotpSetupDetails(details);

      const uri = details.getSetupUri("IRIS IoT Platform");

      setTotpUri(uri);

      setShowTwoFactorModal(true);
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    } finally {
      setTwoFactorLoading(false);
    }
  }

  async function handleVerifyTOTP() {
    if (!totpCode.trim()) {
      toast.error("Enter verification code.");

      return;
    }

    setTwoFactorLoading(true);

    try {
      await verifyTOTPSetup({
        code: totpCode,
      });

      await updateMFAPreference({
        totp: "PREFERRED",
        sms: "DISABLED",
      });

      await updateUser(user.userId, {
        twoFactorEnabled: false,
      });

      setTwoFactorEnabled(true);

      setShowTwoFactorModal(false);

      setTotpCode("");

      toast.success("Two-Factor Authentication enabled.");
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    } finally {
      setTwoFactorLoading(false);
    }
  }

  async function handleToggleLoginAlerts() {
    setLoginAlertsLoading(true);

    try {
      const enabled = !loginAlerts;

      await updateUser(user.userId, {
        loginAlerts: enabled,
      });

      setLoginAlerts(enabled);

      setUser((prev) => ({
        ...prev,
        loginAlerts: enabled,
      }));

      toast.success(
        enabled ? "Login Alerts enabled." : "Login Alerts disabled.",
      );
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to update Login Alerts.");
    } finally {
      setLoginAlertsLoading(false);
    }
  }

  async function handleSessionTimeoutChange(value) {
  try {
    const timeout = Number(value);

    setSessionTimeout(timeout);

    await updateUser(user.userId, {
      sessionTimeout: timeout,
    });

    setUser((prev) => ({
      ...prev,
      sessionTimeout: timeout,
    }));

    toast.success("Session timeout updated.");
  } catch (error) {
    console.error(error);

    toast.error(
      error.message || "Failed to update session timeout."
    );
  }
}

  /* ================= SAVE PROFILE ================= */

  const handleSaveProfile = async () => {
    const validationError = validateProfile(profileData);

    if (validationError) {
      toast.error(validationError);
      return;
    }
    setSaving(true);
    try {
      const currentUser = await getCurrentUser();

      await updateUser(currentUser.userId, profileData);

      setUser({
        ...user,
        ...profileData,
      });
      setInitialProfile(profileData);

      toast.success("Profile updated successfully");

      setActiveModal(null);
      setSaving(false);
    } catch (error) {
      console.error(error);

      toast.error("Failed to update profile");
      setSaving(false);
    }
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      const currentUser = await getCurrentUser();

      const result = await uploadProfileImage(
        currentUser.userId,
        file,
        profileData.image,
      );

      setProfileData((prev) => ({
        ...prev,
        image: result.image,
      }));
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    }
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

      <ProfileModal
        open={activeModal === "profile"}
        onClose={() => {
          if (
            hasProfileChanged(profileData, initialProfile) &&
            !window.confirm("Discard unsaved changes?")
          ) {
            return;
          }

          setActiveModal(null);
        }}
        profileData={profileData}
        setProfileData={setProfileData}
        profileCompletion={profileCompletion}
        handleImageChange={handleImageChange}
        handleSaveProfile={handleSaveProfile}
        saving={saving}
      />

      {/* ================= SECURITY MODAL ================= */}

      <SecurityModal
        open={activeModal === "security"}
        onClose={() => setActiveModal(null)}
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
        twoFactorEnabled={twoFactorEnabled}
        handleToggle2FA={handleToggle2FA}
        twoFactorLoading={twoFactorLoading}
        loginAlerts={loginAlerts}
        handleToggleLoginAlerts={handleToggleLoginAlerts}
        loginAlertsLoading={loginAlertsLoading}

        sessionTimeout={sessionTimeout}
        handleSessionTimeoutChange={handleSessionTimeoutChange}
      />

      {/* FORGOT PASSWORD MODAL */}
      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => {
          setShowForgotPassword(false);
          setCodeSent(false);
        }}
        forgotPasswordData={forgotPasswordData}
        setForgotPasswordData={setForgotPasswordData}
        handleSendResetCode={handleSendResetCode}
        handleResetPassword={handleResetPassword}
        sendingCode={sendingCode}
        resettingPassword={resettingPassword}
        codeSent={codeSent}
        resetSuccess={resetSuccess}
        resendTimer={resendTimer}
        otpInputRef={otpInputRef}
        showForgotNewPassword={showForgotNewPassword}
        setShowForgotNewPassword={setShowForgotNewPassword}
        showForgotConfirmPassword={showForgotConfirmPassword}
        setShowForgotConfirmPassword={setShowForgotConfirmPassword}
        passwordStrength={passwordStrength}
        user={user}
      />

      {/* ===================TWO FACTOR MODAL======================= */}
      <TwoFactorModal
        open={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        totpUri={totpUri}
        totpCode={totpCode}
        setTotpCode={setTotpCode}
        handleVerifyTOTP={handleVerifyTOTP}
        twoFactorLoading={twoFactorLoading}
      />

      {/* ==============ABOUT MODAL=================== */}

      <AboutModal
    open={activeModal === "about"}
    onClose={() => setActiveModal(null)}
    setActiveTab={setActiveTab}
/>

      {/* ================= ORGANIZATION MODAL ================= */}

      <OrganizationModal
        open={activeModal === "organization"}
        onClose={() => {
          if (
            hasProfileChanged(profileData, initialProfile) &&
            !window.confirm("Discard unsaved changes?")
          ) {
            return;
          }

          setActiveModal(null);
        }}
        profileData={profileData}
        setProfileData={setProfileData}
        handleSaveProfile={handleSaveProfile}
        saving={saving}
      />
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

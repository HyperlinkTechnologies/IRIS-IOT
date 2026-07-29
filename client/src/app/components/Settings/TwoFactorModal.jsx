import { QRCodeSVG } from "qrcode.react";
import SettingsModal from "./SettingsModal";

export default function TwoFactorModal({
  open,
  onClose,
  totpUri,
  totpCode,
  setTotpCode,
  handleVerifyTOTP,
  twoFactorLoading,
}) {
  if (!open) return null;

  return (
    <SettingsModal
      title="Set Up Two-Factor Authentication"
      onClose={onClose}
    >
      <div className="space-y-6">
        <p className="text-sm text-gray-500">
          Scan this QR code using Google Authenticator,
          Microsoft Authenticator, Authy, or another TOTP app.
        </p>

        <div className="flex justify-center">
          {totpUri && (
            <QRCodeSVG
              value={totpUri}
              size={220}
            />
          )}
        </div>

        <div>
          <label className="font-semibold">
            Verification Code
          </label>

          <input
            value={totpCode}
            onChange={(e) => setTotpCode(e.target.value)}
            placeholder="123456"
            maxLength={6}
            className="mt-2 w-full border border-black/10 rounded-xl px-4 py-3 text-center tracking-[0.5em]"
          />
        </div>

        <button
          onClick={handleVerifyTOTP}
          disabled={twoFactorLoading}
          className="w-full bg-[#ff5700] text-white rounded-xl py-3 disabled:opacity-60"
        >
          {twoFactorLoading
            ? "Verifying..."
            : "Verify & Enable"}
        </button>
      </div>
    </SettingsModal>
  );
}
import { Shield } from "lucide-react";

export default function TwoFactorCard({
  twoFactorEnabled,
  handleToggle2FA,
  twoFactorLoading,
}) {
  return (
<div className="border rounded-xl p-5">

  <div className="flex items-center justify-between">

    <div>

      <h3 className="text-lg font-semibold">
        Two-Factor Authentication
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Protect your account using an
        additional verification step.
      </p>

    </div>

    <button
      onClick={handleToggle2FA}
      disabled={twoFactorLoading}
      className={`relative w-14 h-8 rounded-full transition ${
        twoFactorEnabled
          ? "bg-[#ff5700]"
          : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition ${
          twoFactorEnabled
            ? "translate-x-6"
            : ""
        }`}
      />
    </button>

  </div>

    </div>
  );
}
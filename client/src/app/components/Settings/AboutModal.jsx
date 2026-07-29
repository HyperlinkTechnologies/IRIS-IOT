import SettingsModal from "./SettingsModal";
import InfoRow from "./InfoRow";


export default function AboutModal({
  open,
  onClose,
  setActiveTab,
}) {

  if (!open) return null;

  return (
    <SettingsModal
  title="About IRIS"
  onClose={onClose}
>
  <div className="space-y-6">

    <InfoRow
      label="Platform"
      value="IRIS IoT Platform"
    />

    <InfoRow
      label="Version"
      value={__APP_VERSION__}
    />

    <InfoRow
      label="Build Date"
      value={__BUILD_DATE__}
    />

    <InfoRow
      label="Application Mode"
      value={
        import.meta.env.MODE === "development"
          ? "Development"
          : "Production"
      }
    />

    <InfoRow
      label="Backend API"
      value="v1"
    />

    <InfoRow
      label="Developed By"
      value="Hyperlink Technologies"
    />

    <hr className="border-gray-200" />

<InfoRow
  label="Privacy Policy"
  value="View Privacy Policy"
  clickable
  onClick={() => {
    onClose();
    setActiveTab("privacy-policy");
  }}
/>

<InfoRow
  label="Terms & Conditions"
  value="View Terms & Conditions"
  clickable
  onClick={() => {
    onClose();
    setActiveTab("terms-and-conditions");
  }}
/>

<InfoRow
  label="Open Source Licenses"
  value="View Licenses"
  clickable
  onClick={() => {
    onClose();
    setActiveTab("licenses");
  }}
/>

    <div className="pt-2 text-center text-xs text-gray-500">
      © 2026 Hyperlink Technologies. All Rights Reserved.
    </div>

  </div>
</SettingsModal>
  );
}
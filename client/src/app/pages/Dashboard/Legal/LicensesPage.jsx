import LegalPage from "./LegalPage";

export default function LicensesPage({
  setActiveTab,
}) {
  const sections = [
    {
      heading: "Open Source Software",
      content:
        "IRIS IoT Platform is built using several open source libraries and frameworks. Their respective licenses apply to those components.",
    },
    {
      heading: "Major Dependencies",
      content:
        "React, Vite, Tailwind CSS, AWS Amplify, AWS SDK for JavaScript, Socket.IO, Lucide React, React Hot Toast, QRCode React, and other open source packages.",
    },
    {
      heading: "License Information",
      content:
        "Complete license notices and acknowledgements will be included with the production release of the platform.",
    },
    {
      heading: "Third-Party Trademarks",
      content:
        "All trademarks and product names referenced within the platform remain the property of their respective owners.",
    },
  ];

  return (
    <LegalPage
      title="Open Source Licenses"
      sections={sections}
      setActiveTab={setActiveTab}
    />
  );
}
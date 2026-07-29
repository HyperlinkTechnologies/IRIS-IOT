import LegalPage from "./LegalPage";

export default function TermsConditionsPage({
  setActiveTab,
}) {
  const sections = [
    {
      heading: "Acceptance",
      content:
        "By using the IRIS IoT Platform, users agree to comply with the organization's policies and the platform's acceptable usage requirements.",
    },
    {
      heading: "User Responsibilities",
      content:
        "Users are responsible for protecting their account credentials and ensuring authorized use of connected devices.",
    },
    {
      heading: "Acceptable Use",
      content:
        "The platform must not be used for unauthorized access, malicious activities, or any activity that violates applicable laws or organizational policies.",
    },
    {
      heading: "Intellectual Property",
      content:
        "All platform software, branding, documentation, and related intellectual property belong to Hyperlink Technologies unless otherwise stated.",
    },
    {
      heading: "Service Availability",
      content:
        "Platform availability may vary during maintenance, updates, or unexpected service interruptions.",
    },
    {
      heading: "Changes",
      content:
        "These Terms and Conditions will be replaced with the organization's approved legal document before production deployment.",
    },
  ];

  return (
    <LegalPage
      title="Terms & Conditions"
      sections={sections}
      setActiveTab={setActiveTab}
    />
  );
}
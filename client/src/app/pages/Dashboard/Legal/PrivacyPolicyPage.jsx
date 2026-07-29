import LegalPage from "./LegalPage";

export default function PrivacyPolicyPage({
  setActiveTab,
}) {
  const sections = [
    {
      heading: "Effective Date",
      content:
        "This Privacy Policy is provided for development purposes and will be replaced with the organization's approved policy before production deployment.",
    },
    {
      heading: "Information We Collect",
      content:
        "IRIS may collect account information, device information, telemetry data, and platform usage information necessary to provide IoT monitoring and management services.",
    },
    {
      heading: "How We Use Information",
      content:
        "Collected information is used to authenticate users, manage connected devices, provide telemetry visualization, improve platform performance, and maintain platform security.",
    },
    {
      heading: "Data Security",
      content:
        "IRIS follows industry best practices to protect user accounts, device communication, and stored information through secure authentication and encrypted communication.",
    },
    {
      heading: "User Rights",
      content:
        "Users may request updates or deletion of their account information subject to applicable organizational policies.",
    },
    {
      heading: "Contact",
      content:
        "Official privacy contact information will be provided in the production release.",
    },
  ];

  return (
    <LegalPage
      title="Privacy Policy"
      sections={sections}
      setActiveTab={setActiveTab}
    />
  );
}
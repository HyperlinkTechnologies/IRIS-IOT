import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import CtaSection from '../components/Landing page/CTAsection';
import HeroSection from '../components/Landing page/HeroSection';
import KeyCapabilitiesSection from '../components/Landing page/Keycapabilities';
import OverviewSection from '../components/Landing page/OverviewSection';
import DashboardPreviewSection from '../components/Landing page/DashboardPreview';
import HowItWorksSection from '../components/Landing page/HowitWorks';
import UseCasesSection from '../components/Landing page/UseCases';
import SaasMultiTenancySection from '../components/Landing page/SaasMultiTenancy';
import IntegrationsSection from '../components/Landing page/Integrations';
import WhyChooseIrisSection from '../components/Landing page/WhyChooseIris';



export default function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {

  const checkUser = async () => {

    try {

      // already logged in
      await getCurrentUser();

      navigate("/Dashboard");

    } catch {

      // not logged in
      console.log("Guest user");
    }
  };

  checkUser();

}, []);

  return (
    <div className="relative min-h-screen bg-[#010c29] ">

      {/* Hero Section */}
      <HeroSection />

      {/* Platform Overview Section */}
      <OverviewSection />

      {/* Key Capabilities Section */}
      <KeyCapabilitiesSection/>

      {/* Dashboard Preview Section */}
      <DashboardPreviewSection />

      {/* How it works Section */}
      <HowItWorksSection />

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Saas and Multi Tenancy Section */}
      <SaasMultiTenancySection />

      {/* Integrations Section */}
      <IntegrationsSection />

      {/* Why Choose Iris Section */}
      <WhyChooseIrisSection />

      {/* CTA Section */}
      <CtaSection/>

    </div>
  );
}
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

import CtaSection from '../../components/Landing page/CTAsection';
import HeroSection from '../../components/Landing page/HeroSection';
import KeyCapabilitiesSection from '../../components/Landing page/Keycapabilities';
import OverviewSection from '../../components/Landing page/OverviewSection';
import DashboardPreviewSection from '../../components/Landing page/DashboardPreview';
import HowItWorksSection from '../../components/Landing page/HowitWorks';
import UseCasesSection from '../../components/Landing page/UseCases';
import SaasMultiTenancySection from '../../components/Landing page/SaasMultiTenancy';
import IntegrationsSection from '../../components/Landing page/Integrations';
import WhyChooseIrisSection from '../../components/Landing page/WhyChooseIris';



export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
    useEffect(() => {
    const checkUser = async () => {
      try {
        await getCurrentUser();
        navigate("/Dashboard");
      } catch {
        console.log("Guest user");
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#010c29]">
        <div className="w-12 h-12 border-4 border-white/20 border-t-[#ff5700] rounded-full animate-spin" />

        <p className="mt-4 text-white/70">
          Loading IRIS...
        </p>
      </div>
    );
  }

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
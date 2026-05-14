import CtaSection from '../components/CTAsection';
import HeroSection from '../components/HeroSection';
import KeyCapabilitiesSection from '../components/Keycapabilities';
import OverviewSection from '../components/OverviewSection';
import DashboardPreviewSection from '../components/DashboardPreview';
import HowItWorksSection from '../components/HowitWorks';
import UseCasesSection from '../components/UseCases';
import SaasMultiTenancySection from '../components/SaasMultiTenancy';
import IntegrationsSection from '../components/Integrations';
import WhyChooseIrisSection from '../components/WhyChooseIris';



export default function HomePage() {
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
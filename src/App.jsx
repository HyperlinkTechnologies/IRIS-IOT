import CtaSection from './app/components/CTAsection';
import DashboardPreviewSection from './app/components/DashboardPreview';
import Footer from './app/components/Footer';
import HeroSection from './app/components/HeroSection';
import HowItWorksSection from './app/components/HowitWorks';
import IntegrationsSection from './app/components/Integrations';
import KeyCapabilitiesSection from './app/components/Keycapabilities';
import NavBar from './app/components/NavBar';
import OverviewSection from './app/components/OverviewSection';
import SaasMultiTenancySection from './app/components/SaasMultiTenancy';
import UseCasesSection from './app/components/UseCases';
import WhyChooseUsSection from './app/components/WhyChooseIris';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#010c29] ">
      {/* Nav Bar */}
      <NavBar/>

      {/* Hero Section */}
      <HeroSection />

      {/* Platform Overview Section */}
      <OverviewSection />

      {/* Key Capabilities Section */}
      <KeyCapabilitiesSection />

      {/* Dashboard Preview Section */}
      <DashboardPreviewSection/>

      {/* How it works Section */}
      <HowItWorksSection/>

      {/* Use Cases Section */}
      <UseCasesSection/>

      {/* Saas and Multi Tenancy Section */}
      <SaasMultiTenancySection/>

      {/* Integrations Section */}
      <IntegrationsSection/>

      {/* Why Choose Iris Section */}
      <WhyChooseUsSection/>

      {/* CTA Section */}
      <CtaSection/>

      {/* Footer Section */}
      <Footer/>

    </div>
  );
}
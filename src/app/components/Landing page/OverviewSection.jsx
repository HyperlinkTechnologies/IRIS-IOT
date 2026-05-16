import imgDashboardPreview from "../../../assets/Dashboard_preview_2.png";
import { Check } from "lucide-react";
import TiltedCard from "../../ui/TiltedCard";

export default function OverviewSection() {
  return (
    <div className="bg-[#e8f0ff] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            Platform Overview
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#0a1c50] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
          A Single Pane of Glass for All Your Industrial Assets
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-24 sm:w-32 rounded-full mb-6 sm:mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Left Content */}
            <div>
              {/* Description */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <p className="text-[#010c29] text-sm sm:text-base font-light leading-relaxed">
                  A centralized IoT platform designed to simplify the way you connect, monitor, and manage your industrial infrastructure. Iris brings together data from sensors, machines, and edge devices into a unified dashboard, enabling real-time visibility across all operations.
                </p>
                <p className="text-[#010c29] text-sm sm:text-base font-light leading-relaxed">
                  The platform provides scalable tools to collect, process, and visualize data with precision. Built with reliability and performance at its core, the platform ensures secure data transmission, minimal latency, and high availability — making it ideal for mission-critical industrial environments.
                </p>
              </div>

              {/* Feature List */}
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2">
                  <Check className="text-red-500" />
                  <span className="text-[#010c29] text-sm sm:text-base font-light">Real-time monitoring of devices and sensors</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="text-red-500" />
                  <span className="text-[#010c29] text-sm sm:text-base font-light">Centralized dashboard for all assets</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="text-red-500" />
                  <span className="text-[#010c29] text-sm sm:text-base font-light">Scalable from single device to large deployments</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="text-red-500" />
                  <span className="text-[#010c29] text-sm sm:text-base font-light">Intelligent alerts and automation triggers</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="text-red-500" />
                  <span className="text-[#010c29] text-sm sm:text-base font-light">Secure and reliable data handling</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <TiltedCard
              imageSrc={imgDashboardPreview}
              altText="Dashboard Overview image"
              // containerHeight="60vh"
              containerWidth="100%"
              imageHeight="90%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.05}
              showMobileWarning={false}
              showTooltip={false}
              displayOverlayContent={false}
            />
          </div>
      </div>
    </div>
  );
}

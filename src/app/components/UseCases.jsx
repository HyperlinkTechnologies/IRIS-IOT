import { Factory, Zap, Droplet, Building } from 'lucide-react';

const useCases = [
  {
    icon: Factory,
    title: "Industrial Monitoring",
    description: "Track machinery health, production KPIs, vibration, and temperature across your entire plant floor with millisecond precision."
  },
  {
    icon: Zap,
    title: "Energy Tracking",
    description: "Monitor consumption in real time, detect anomalies, and reduce energy waste with automated control loops and dashboards."
  },
  {
    icon: Droplet,
    title: "Water Management",
    description: "Manage pumping stations, reservoir levels, and pipe pressure. Detect leaks automatically with flow-balance analytics."
  },
  {
    icon: Building,
    title: "Facility Automation",
    description: "Integrate HVAC, lighting, access control, and safety systems into a single smart facility dashboard for complete oversight."
  }
];

export default function UseCasesSection() {
  return (
    <div className="bg-[#e8f0ff] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            Use Cases
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#0a1c50] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
          Built for the industries that power the world
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-24 sm:w-32 rounded-full mb-6 sm:mb-8" />

        {/* Description */}
        <p className="text-[#010c29] text-sm sm:text-base font-light mb-8 sm:mb-12">
          From factory floors to utility networks, Iris adapts to your operational context with purpose-built templates.
        </p>

        {/* Use Cases List */}
        <div className="space-y-3 sm:space-y-4">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-[rgba(255,85,0,0.12)] border border-[rgba(255,136,0,0.23)] rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-center gap-3 sm:gap-4"
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5 sm:mt-1">
                <useCase.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff5700]" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-[#0a1c50] text-base sm:text-lg font-bold mb-1 sm:mb-2">
                  {useCase.title}
                </h3>
                <p className="text-[#071540] text-sm sm:text-base font-light leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { Factory, TrendingUp, Lock, Settings } from 'lucide-react';

const reasons = [
  {
    icon: Factory,
    title: "Built for Industrial Use",
    description: "Hardened for OT/IT convergence, extreme telemetry rates, and 24/7 uptime requirements in harsh operational environments."
  },
  {
    icon: TrendingUp,
    title: "Scalable Architecture",
    description: "From 10 sensors to 100,000 devices — auto-scaling cloud infrastructure grows with your operation without re-architecting."
  },
  {
    icon: Lock,
    title: "Secure & Reliable",
    description: "End-to-end encryption, role-based access control, audit logs, and 99.97% SLA-backed uptime you can count on."
  },
  {
    icon: Settings,
    title: "Easy to Deploy",
    description: "Connect your first device in under 15 minutes. No dedicated IT team needed — guided onboarding and full documentation included."
  }
];

export default function WhyChooseUsSection() {
  return (
        <div className="bg-[#010c29] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-4 sm:mb-6">
          <span className="text-[#ff5700] text-base sm:text-lg font-bold tracking-widest uppercase">
            Why Choose Iris
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#e8f0ff] text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4 sm:mb-6 leading-tight">
          The industrial-grade difference
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-24 sm:w-32 rounded-full mb-6 sm:mb-8" />

        {/* Description */}
        <p className="text-[#e8f0ff] text-sm sm:text-base font-light mb-8 sm:mb-12 max-w-4xl">
          We didn't build a generic IoT tool. Iris was engineered from day one for the reliability, security, and scale that industrial environments demand.
        </p>

        {/* Reason Cards */}
        <div className="space-y-3 sm:space-y-4">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-[rgba(255,85,0,0.12)] border border-[rgba(255,136,0,0.23)] rounded-3xl sm:rounded-full px-5 sm:px-8 py-5 sm:py-6 flex gap-3 sm:gap-4 items-center"
            >
              {/* Icon */}
              <div className="shrink-0 mt-0.5 sm:mt-1">
                <reason.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#ff5700]" />
              </div>

              {/* Content */}
              <div>
                <h3 className="text-[#e8f0ff] text-base sm:text-lg font-bold mb-1 sm:mb-2">
                  {reason.title}
                </h3>
                <p className="text-[rgba(180,200,255,0.73)] text-sm sm:text-base font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

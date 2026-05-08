import { ChartLine, Bell, Monitor, Users, Cloud } from 'lucide-react';
import BorderGlow from '../ui/BorderGlow';

const capabilities = [
  {
    icon: ChartLine,
    title: "Real-Time Dashboards",
    description: "Build fully customizable dashboards with live data widgets, trend charts, gauges, and maps — all updating in milliseconds."
  },
  {
    icon: Bell,
    title: "Smart Alerts & Notifications",
    description: "Define threshold-based or anomaly-driven alerts. Receive instant notifications via email, SMS, or webhook integrations."
  },
  {
    icon: Monitor,
    title: "Multi-Device Monitoring",
    description: "Monitor hundreds of heterogeneous devices from a single interface. Track status, telemetry, and health in real time."
  },
  {
    icon: Users,
    title: "Multi-Client Management",
    description: "Serve multiple organizations from one platform. Tenant isolation ensures clients see only their own data."
  },
  {
    icon: Cloud,
    title: "Cloud-Based Access",
    description: "Access your platform from anywhere — browser, tablet, or mobile. No VPN or on-prem setup required."
  }
];

export default function KeyCapabilitiesSection() {
  return (
    <div className="bg-[#010c29] py-20 px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Tag */}
        <div className="mb-6">
          <span className="text-[#ff5700] text-lg font-bold tracking-widest uppercase">
            Key Capabilities
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-[#e8f0ff] text-4xl font-extrabold mb-6 leading-tight">
          Everything you need, built in.
        </h2>

        {/* Orange Gradient Line */}
        <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] h-1 w-32 rounded-full mb-8" />

        {/* Description */}
        <p className="text-[#e8f0ff] text-base font-light mb-12 max-w-3xl">
          Purpose-built features designed for the demands of industrial IoT environments — from the edge to the cloud.
        </p>

        {/* Capabilities Grid */}
        <BorderGlow
          edgeSensitivity={30}
          glowColor="40 80 80"
          backgroundColor="#120F17"
          borderRadius={28}
          glowRadius={40}
          glowIntensity={1}
          coneSpread={25}
          animated={false}
          colors={['#c084fc', '#f472b6', '#38bdf8']}
        >
          <div style={{ padding: '2em' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="bg-[#071540] border border-[rgba(255,136,0,0.23)] rounded-2xl p-5 flex flex-col items-start"
            >
              {/* Icon */}
              <div className="bg-linear-to-r from-[#d84800] to-[#ff5700] rounded-lg w-10 h-10 flex items-center justify-center mb-4">
                <capability.icon className="w-5 h-5 text-[#010c29]" />
              </div>

              {/* Title */}
              <h3 className="text-[#e8f0ff] text-base font-bold mb-3">
                {capability.title}
              </h3>

              {/* Description */}
              <p className="text-[rgba(180,200,255,0.73)] text-sm font-light leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
          </div>
        </BorderGlow>
        
      </div>
    </div>
  );
}

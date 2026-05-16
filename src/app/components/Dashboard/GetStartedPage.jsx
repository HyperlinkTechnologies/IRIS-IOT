import { Rocket, Cpu, Bell, BarChart3 } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function GetStartedPage() {
  const steps = [
    {
      icon: <Rocket />,
      title: "Setup Your Workspace",
      desc: "Configure your organization and dashboard",
    },
    {
      icon: <Cpu />,
      title: "Connect Devices",
      desc: "Add and monitor IoT devices",
    },
    {
      icon: <Bell />,
      title: "Configure Alerts",
      desc: "Set real-time notifications",
    },
    {
      icon: <BarChart3 />,
      title: "Monitor Analytics",
      desc: "Visualize telemetry and insights",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold">Get Started with IRIS</h2>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <DashboardCard
          title="Total Devices"
          value="124"
        />

        <DashboardCard
          title="Online Devices"
          value="118"
        />

        <DashboardCard
          title="Offline Devices"
          value="6"
        />

      </div>

      {/* Steps */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6
      "
      >
        {steps.map((step, index) => (
          <div
            key={index}
            className="
              bg-black/5
              border
              border-gray-300
              rounded-2xl
              shadow-lg
              p-8
            "
          >
            <div
              className="
              w-16
              h-16
              rounded-2xl
              bg-orange-500/10
              flex border border-orange-500/20
              items-center
              justify-center
              text-[#ff5700]
              mb-6
            "
            >
              {step.icon}
            </div>

            <h3 className="text-2xl font-bold mb-3">{step.title}</h3>

            <p className="text-gray-500">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

import {
  Rocket,
  Cpu,
  Bell,
  BarChart3
} from "lucide-react";

import DashboardCard from "./DashboardCard";

export default function GetStartedPage() {

  const steps = [
    {
      icon: <Rocket size={28} />,
      title: "Setup Your Workspace",
      desc: "Configure your organization and dashboard",
    },
    {
      icon: <Cpu size={28} />,
      title: "Connect Devices",
      desc: "Add and monitor IoT devices",
    },
    {
      icon: <Bell size={28} />,
      title: "Configure Alerts",
      desc: "Set real-time notifications",
    },
    {
      icon: <BarChart3 size={28} />,
      title: "Monitor Analytics",
      desc: "Visualize telemetry and insights",
    },
  ];

  return (

    <div className="w-full">

      {/* Header */}
      <div className="mb-8 md:mb-10">

        <h2
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl
            font-bold
            leading-tight
          "
        >
          Get Started with IRIS
        </h2>

        <p
          className="
            text-gray-400
            mt-2
            text-sm
            sm:text-base
          "
        >
          Setup and manage your industrial IoT platform efficiently
        </p>

      </div>

      {/* Top Cards */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          gap-4
          sm:gap-6
          mb-8
        "
      >

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
          gap-5
          lg:gap-6
        "
      >

        {steps.map((step, index) => (

          <div
            key={index}
            className="
              bg-black/5
              border
              border-black/10
              rounded-2xl
              shadow-lg
              p-5
              sm:p-6
              lg:p-8
              hover:bg-white/2
              transition-all
              duration-300
            "
          >

            {/* Icon */}
            <div
              className="
                w-14
                h-14
                sm:w-16
                sm:h-16
                rounded-2xl
                bg-orange-500/10
                flex
                items-center
                justify-center
                text-[#ff5700]
                mb-5
              "
            >

              {step.icon}

            </div>

            {/* Title */}
            <h3
              className="
                text-xl
                sm:text-2xl
                font-bold
                mb-3
                leading-snug
              "
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              className="
                text-gray-400
                text-sm
                sm:text-base
                leading-relaxed
              "
            >
              {step.desc}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
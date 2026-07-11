import {
  Rocket,
  Cpu,
  Bell,
  BarChart3,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

import { useState, useEffect } from "react";

import deviceRegistry from "../../core/devices/deviceRegistry";
import telemetryStore from "../../core/telemetry/telemetryStore";
import DashboardCard from "../../components/Dashboard/DashboardCard";

export default function GetStartedPage({ setActiveTab }) {
  const [devices, setDevices] = useState(deviceRegistry.getAll());

  const [telemetry, setTelemetry] = useState(telemetryStore.getAll());

  useEffect(() => {
    const unsubscribeDevices = deviceRegistry.subscribe(setDevices);

    const unsubscribeTelemetry = telemetryStore.subscribe(setTelemetry);

    return () => {
      unsubscribeDevices();

      unsubscribeTelemetry();
    };
  }, []);

  const totalDevices = devices.length;

  const onlineDevices = devices.filter(
    (device) => telemetry[device.deviceId]?.online,
  ).length;

  const offlineDevices = totalDevices - onlineDevices;

  const steps = [
    {
      icon: <Rocket size={24} />,
      title: "Setup Your Workspace",
      desc: "Configure your organization and dashboard",
      action: () => setActiveTab("dashboard"),
    },
    {
      icon: <Cpu size={24} />,
      title: "Connect Devices",
      desc: "Add and monitor IoT devices",
      action: () => setActiveTab("devices"),
    },
    {
      icon: <Bell size={24} />,
      title: "Configure Alerts",
      desc: "Set real-time notifications",
      action: () => setActiveTab("alerts"),
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Monitor Analytics",
      desc: "Visualize telemetry and insights",
      action: () => setActiveTab("analytics"),
    },
  ];

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8 md:mb-10">
        <h2
          className="
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-bold
            leading-tight
          "
        >
          Get Started with IRIS
        </h2>

        <p
          className="
            text-gray-500
            mt-2
            text-xs
            sm:text-sm
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
        <DashboardCard title="Total Devices" value={totalDevices} />

        <DashboardCard title="Online Devices" value={onlineDevices} />

        <DashboardCard title="Offline Devices" value={offlineDevices} />
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
            onClick={step.action}
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
              cursor-pointer
            "
          >
            <div className="flex items-center justify-between text-gray-400">
              {/* Icon */}
              <div
                className="
                  w-12
                  h-12
                  sm:w-14
                  sm:h-14
                  rounded-lg
                  bg-orange-500/10
                  flex
                  items-center
                  justify-center
                  text-[#ff5700]
                  mb-3
                "
              >
                {step.icon}
              </div>

              {/* Arrow Icon */}
              <ChevronRight size={25} />
            </div>

            {/* Title */}
            <h3
              className="
                text-lg
                sm:text-xl
                font-bold
                mb-1
                leading-snug
              "
            >
              {step.title}
            </h3>

            {/* Description */}
            <p
              className="
                text-gray-400
                text-xs
                sm:text-sm
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

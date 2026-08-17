import {
  Rocket,
  Cpu,
  LayoutDashboard,
  ChartColumn,
  TriangleAlert,
  Wifi,
  Code2,
  BookOpen,
  CircleHelp,
  History,
  Download,
} from "lucide-react";

export const documentationSections = [

  {
    id: "getting-started",
    title: "Getting Started",
    description:
      "Learn the basics of the IRIS IoT Platform.",
    icon: Rocket,
  },

  {
    id: "device-setup",
    title: "Device Setup",
    description:
      "Register and connect IoT devices.",
    icon: Cpu,
  },

  {
    id: "dashboard",
    title: "Dashboard Guide",
    description:
      "Build dashboards using widgets.",
    icon: LayoutDashboard,
  },

  {
    id: "analytics",
    title: "Analytics",
    description:
      "Analyze telemetry and historical data.",
    icon: ChartColumn,
  },

  {
    id: "alerts",
    title: "Alerts",
    description:
      "Configure alert rules and notifications.",
    icon: TriangleAlert,
  },

  {
    id: "mqtt",
    title: "MQTT Guide",
    description:
      "Publish and subscribe using MQTT.",
    icon: Wifi,
  },

  {
    id: "sdk",
    title: "IRIS SDK",
    description:
      "Download SDKs and connect supported devices to IRIS.",
    icon: Download,
  },

  {
    id: "api",
    title: "API Reference",
    description:
      "REST APIs and future SDKs.",
    icon: Code2,
  },

  {
    id: "firmware",
    title: "Firmware Examples",
    description:
      "Arduino and NodeMCU examples.",
    icon: BookOpen,
  },

  {
    id: "faq",
    title: "FAQ",
    description:
      "Frequently asked questions.",
    icon: CircleHelp,
  },

  {
    id: "release-notes",
    title: "Release Notes",
    description:
      "Latest platform updates.",
    icon: History,
  },

];
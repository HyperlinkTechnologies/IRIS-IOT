export const documentationContent = {

  "getting-started": {
  title: "Getting Started",
  sections: [
    {
      heading: "Platform Overview",
      paragraphs: [
        "IRIS is a cloud-based Industrial Internet of Things (IIoT) platform for connecting, monitoring, and managing IoT devices from a centralized web application.",
        "The IRIS MVP provides user authentication, device management, live telemetry, dashboards, widgets, analytics, alerts, billing, settings, documentation, and firmware/SDK support."
      ],
      points: [
        "Secure user authentication",
        "Device registration and management",
        "Real-time telemetry",
        "Interactive dashboards and widgets",
        "Historical analytics and CSV export",
        "Threshold-based alerts",
        "Billing and subscription management",
        "IRIS SDK for NodeMCU ESP8266"
      ],
      note:
        "Follow the onboarding sequence below to connect your first device and start monitoring live data.",
      code: ""
    },

    {
      heading: "Step 1 — Create and Verify Your Account",
      paragraphs: [
        "Create an IRIS account using the Sign In page. Complete email verification before using the authenticated platform modules.",
        "User authentication is securely managed through Amazon Cognito."
      ],
      points: [
        "Path: Sign In → Create Account",
        "Enter your account details",
        "Verify your email address",
        "Return to Sign In",
        "Sign in to IRIS"
      ],
      note:
        "Use the account that will be used to manage your devices and dashboards.",
      code: ""
    },

    {
      heading: "Step 2 — Register Your First Device",
      paragraphs: [
        "A physical IoT device must first be registered in IRIS. Device registration creates the device record that the platform uses to associate telemetry and commands with the correct device.",
        "Complete device registration before uploading your firmware."
      ],
      points: [
        "Path: Dashboard → Devices",
        "Select Add Device",
        "Enter the device name and required information",
        "Save the device",
        "Note the generated Device ID"
      ],
      note:
        "The Device ID used by the firmware must correspond to the device registered in IRIS.",
      code: ""
    },

    {
      heading: "Step 3 — Prepare the ESP8266 Firmware",
      paragraphs: [
        "The current IRIS SDK supports NodeMCU ESP8266 devices through the Arduino IDE. Install the IRIS Arduino SDK and use one of the provided examples as the starting point for your firmware.",
        "For a first test, start with a simple sensor such as an LDR before moving to device commands or actuator control."
      ],
      points: [
        "Path: Documentation → IRIS SDK",
        "Download the IRIS SDK",
        "Install the SDK in Arduino IDE",
        "Open the required firmware example",
        "Configure Wi-Fi and device information",
        "Select NodeMCU ESP8266",
        "Select the correct COM port",
        "Upload the firmware"
      ],
      note:
        "Never expose Wi-Fi passwords, certificates, private keys, or other credentials in public repositories.",
      code: ""
    },

    {
      heading: "Step 4 — Verify the Device",
      paragraphs: [
        "After the firmware starts, use the Arduino Serial Monitor to confirm that the device connects and begins sending telemetry.",
        "Then return to IRIS and verify that the registered device is Online and that its latest telemetry is visible."
      ],
      points: [
        "Path: Dashboard → Devices",
        "Open the registered device",
        "Check Online status",
        "Check Last Seen",
        "Check latest telemetry",
        "Change a sensor input and verify the value changes"
      ],
      note:
        "If the device remains Offline, troubleshoot the firmware and network connection before configuring dashboards.",
      code: ""
    },

    {
      heading: "Step 5 — Create Your First Dashboard",
      paragraphs: [
        "Create a dashboard to visualize telemetry received from your connected device. A dashboard can contain multiple widgets mapped to different telemetry fields."
      ],
      points: [
        "Path: Dashboard → Create Dashboard",
        "Enter a dashboard name",
        "Save the dashboard",
        "Open the dashboard",
        "Enter dashboard edit mode"
      ],
      note:
        "Use descriptive dashboard names such as Production Line 1, Machine Monitoring, or Test Device.",
      code: ""
    },

    {
      heading: "Step 6 — Add Your First Widget",
      paragraphs: [
        "Add a widget and map it to the device and telemetry field published by your firmware. For example, an LDR value can be displayed using a Numeric, Gauge, or Chart widget."
      ],
      points: [
        "Path: Dashboard → Edit Dashboard → Add Widget",
        "Choose a widget type",
        "Select the registered device",
        "Select the telemetry field",
        "Configure the widget",
        "Save the widget",
        "Return to the dashboard",
        "Verify the live value"
      ],
      note:
        "The telemetry field must be published by the device before it can be used meaningfully in a widget.",
      code: ""
    },

    {
      heading: "Step 7 — Configure Alerts or Device Controls",
      paragraphs: [
        "After live telemetry is working, you can configure threshold-based alerts or use supported control widgets to operate connected devices."
      ],
      points: [
        "Alerts path: Dashboard → Alerts → Create Alert",
        "Device path: Dashboard → Devices → Device Details",
        "Select the device",
        "Select the required telemetry or control",
        "Configure the condition or command",
        "Save and test"
      ],
      note:
        "Test actuator commands with a safe device setup before connecting them to production equipment.",
      code: ""
    },

    {
      heading: "Step 8 — Analyze Historical Data",
      paragraphs: [
        "After telemetry has been stored, use Analytics to review historical device behavior, select time ranges, and export matching telemetry data."
      ],
      points: [
        "Path: Dashboard → Analytics",
        "Select the device",
        "Select the telemetry field",
        "Choose the time range",
        "Load the historical data",
        "Review the chart",
        "Use CSV export when required"
      ],
      note:
        "Historical analysis requires telemetry to have been received and stored by the platform.",
      code: ""
    },

    {
      heading: "Recommended First-Time Workflow",
      paragraphs: [
        "For a first deployment, follow this order: account → device → firmware → telemetry → dashboard → widget → alerts/commands → analytics."
      ],
      points: [
        "Create and verify your account",
        "Register the device",
        "Install and configure the SDK",
        "Upload a simple sensor example",
        "Verify live telemetry",
        "Create a dashboard",
        "Add and map a widget",
        "Test alerts or commands",
        "Review historical analytics"
      ],
      note:
        "Following this sequence isolates problems at each stage and makes troubleshooting easier.",
      code: ""
    }
  ]
},

  "device-setup": {
  title: "Device Setup",
  sections: [
    {
      heading: "Supported Hardware",
      paragraphs: [
        "The current IRIS SDK release supports NodeMCU ESP8266 devices using the Arduino IDE. The device communicates with the IRIS cloud through secure MQTT/AWS IoT connectivity."
      ],
      points: [
        "NodeMCU ESP8266",
        "Wi-Fi connectivity",
        "IRIS Arduino SDK",
        "AWS IoT Core",
        "MQTT over secure TLS"
      ],
      note:
        "Use the hardware and SDK combination documented for your IRIS deployment.",
      code: ""
    },

    {
      heading: "Register the Device in IRIS",
      paragraphs: [
        "Register the physical device before uploading firmware so the platform has a device identity to associate with incoming telemetry and commands."
      ],
      points: [
        "Path: Dashboard → Devices → Add Device",
        "Enter the device name",
        "Enter the required device information",
        "Save the device",
        "Copy or note the Device ID"
      ],
      note:
        "Use a descriptive name that identifies the machine, location, or installation.",
      code: ""
    },

    {
      heading: "Install the IRIS SDK",
      paragraphs: [
        "Install the IRIS Arduino SDK before compiling the firmware examples. The SDK provides the IRIS connection, telemetry, publishing, and command-handling APIs used by the examples."
      ],
      points: [
        "Path: Documentation → IRIS SDK",
        "Download the IRIS SDK for ESP8266",
        "Install or import the SDK into Arduino IDE",
        "Open an IRIS example",
        "Select the NodeMCU ESP8266 board",
        "Select the correct COM port",
        "Compile and upload"
      ],
      note:
        "Start with the simple LDR or LED example to verify the development environment.",
      code: ""
    },

    {
      heading: "Configure Device Connectivity",
      paragraphs: [
        "Configure the firmware with the Wi-Fi and device connection information required by your IRIS deployment. The exact security material must remain private."
      ],
      points: [
        "Configure Wi-Fi SSID and password",
        "Configure the registered Device ID",
        "Configure the deployment's AWS IoT connection details",
        "Keep certificates and private keys secure",
        "Upload the firmware",
        "Open Serial Monitor"
      ],
      note:
        "Do not copy production certificates or private keys into public documentation or repositories.",
      code: ""
    },

    {
      heading: "Verify Device Connectivity",
      paragraphs: [
        "After uploading the firmware, verify the device from both the Arduino Serial Monitor and the IRIS Devices module."
      ],
      points: [
        "Path: Dashboard → Devices",
        "Open the registered device",
        "Confirm Online status",
        "Check Last Seen",
        "Check latest telemetry",
        "Change a sensor input and confirm the value changes"
      ],
      note:
        "A device that stops publishing telemetry will eventually be shown as Offline.",
      code: ""
    },

    {
      heading: "Telemetry Fields",
      paragraphs: [
        "Telemetry field names are defined by the firmware. Use simple, consistent names because dashboard widgets, analytics, and alerts depend on the published fields."
      ],
      points: [
        "ldr",
        "temperature",
        "humidity",
        "relay",
        "Other custom telemetry fields"
      ],
      note:
        "The telemetry fields available in the dashboard are determined by what the device actually publishes.",
      code: `iris.addTelemetry("ldr", ldrValue);
iris.addTelemetry("temperature", temperature);
iris.addTelemetry("humidity", humidity);`
    },

    {
      heading: "Device Controls",
      paragraphs: [
        "Devices that implement command callbacks can receive control commands from the IRIS platform. Use these controls for safe actuator testing such as LED or relay ON/OFF."
      ],
      points: [
        "Path: Dashboard → Devices → Device Details",
        "Register the device",
        "Upload firmware with command handling",
        "Open the device controls",
        "Send the required command",
        "Verify the physical output",
        "Verify returned telemetry when implemented"
      ],
      note:
        "Only expose actuator commands that are safe for the connected equipment.",
      code: ""
    }
  ]
},

  "dashboard": {
  title: "Dashboard Guide",
  sections: [
    {
      heading: "Dashboard Overview",
      paragraphs: [
        "Dashboards are the main workspace for viewing live telemetry and controlling connected devices. Each widget is mapped to a device and, where applicable, a telemetry field or control."
      ],
      points: [
        "Live telemetry",
        "Device status",
        "Charts and gauges",
        "Indicators",
        "Device controls",
        "Custom dashboard layouts"
      ],
      note:
        "Dashboard widgets display data received from connected devices.",
      code: ""
    },

    {
      heading: "Create a Dashboard",
      paragraphs: [
        "Create a dashboard before adding widgets. Use separate dashboards to organize devices by site, machine, project, or operational purpose."
      ],
      points: [
        "Path: Dashboard → Create Dashboard",
        "Enter a dashboard name",
        "Save the dashboard",
        "Open the new dashboard"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Add a Widget",
      paragraphs: [
        "Add a widget and configure it to display telemetry or control a connected device."
      ],
      points: [
        "Path: Dashboard → Edit Dashboard → Add Widget",
        "Select the widget type",
        "Select the device",
        "Select the telemetry field or control",
        "Configure the widget",
        "Save"
      ],
      note:
        "If a device or telemetry field is missing, verify the device registration and firmware telemetry first.",
      code: ""
    },

    {
      heading: "LDR Telemetry Widget",
      paragraphs: [
        "Publish an LDR value from the firmware and map the ldr telemetry field to a dashboard widget."
      ],
      points: [
        "Path: Dashboard → Edit Dashboard → Add Widget",
        "Choose Numeric, Gauge, or Chart",
        "Select the LDR device",
        "Select telemetry: ldr",
        "Configure the widget",
        "Save",
        "Change the light level and verify the widget updates"
      ],
      note: "",
      code: `iris.addTelemetry("ldr", analogRead(A0));
iris.publish();`
    },

    {
      heading: "LED or Relay Control",
      paragraphs: [
        "Use a control widget to send ON/OFF commands to firmware that implements command handling."
      ],
      points: [
        "Path: Dashboard → Edit Dashboard → Add Widget",
        "Choose Toggle or Push Button",
        "Select the target device",
        "Configure the command",
        "Save",
        "Send ON/OFF",
        "Verify the physical output"
      ],
      note:
        "The firmware must implement the corresponding command callback.",
      code: ""
    },

    {
      heading: "Edit Dashboard Layout",
      paragraphs: [
        "Use dashboard edit mode to organize widgets and adjust their size."
      ],
      points: [
        "Path: Dashboard → Edit Dashboard",
        "Move widgets",
        "Resize widgets",
        "Arrange the layout",
        "Save the dashboard"
      ],
      note:
        "Save the dashboard after changing the layout.",
      code: ""
    },

    {
      heading: "Recommended Dashboard Workflow",
      paragraphs: [
        "Configure dashboards around the information operators need to monitor or control."
      ],
      points: [
        "Create dashboard",
        "Add device telemetry widgets",
        "Add charts for trends",
        "Add device status indicators",
        "Add control widgets when required",
        "Arrange and resize widgets",
        "Save the dashboard"
      ],
      note: "",
      code: ""
    }
  ]
},

  "analytics": {
  title: "Analytics",
  sections: [
    {
      heading: "Analytics Overview",
      paragraphs: [
        "The Analytics module allows you to review historical telemetry collected from connected devices. Use it to identify trends, compare operating periods, and investigate previous device behavior."
      ],
      points: [
        "Historical telemetry",
        "Device-based analysis",
        "Telemetry selection",
        "Time range filtering",
        "Interactive charts",
        "CSV export"
      ],
      note:
        "Analytics contains stored telemetry. Live values should be monitored from the Dashboard.",
      code: ""
    },

    {
      heading: "View Historical Telemetry",
      paragraphs: [
        "Select a device and telemetry field, choose the required time range, and load the stored data."
      ],
      points: [
        "Path: Dashboard → Analytics",
        "Select the device",
        "Select the telemetry field",
        "Choose the time range",
        "Load the data",
        "Review the chart"
      ],
      note:
        "Only telemetry that has been received and stored by IRIS can be viewed historically.",
      code: ""
    },

    {
      heading: "Analyze Telemetry Trends",
      paragraphs: [
        "Use the historical chart to understand how a telemetry value changed over the selected period."
      ],
      points: [
        "Path: Dashboard → Analytics",
        "Select the required device",
        "Select temperature, humidity, LDR, relay, or another available field",
        "Select the required time range",
        "Review the resulting trend"
      ],
      note:
        "Available telemetry fields depend on what the selected device publishes.",
      code: ""
    },

    {
      heading: "Export Telemetry",
      paragraphs: [
        "Export the telemetry currently selected in Analytics when you need the data for offline analysis or reporting."
      ],
      points: [
        "Path: Dashboard → Analytics",
        "Select the device",
        "Select the telemetry field",
        "Select the required time range",
        "Load the data",
        "Use CSV Export"
      ],
      note:
        "The exported data corresponds to the selected device, telemetry field, and time range.",
      code: ""
    },

    {
      heading: "Analytics Troubleshooting",
      paragraphs: [
        "If no historical data appears, first verify that the device is connected and actively publishing telemetry."
      ],
      points: [
        "Path: Dashboard → Devices",
        "Verify the device is Online",
        "Open Device Details",
        "Verify latest telemetry",
        "Return to Dashboard → Analytics",
        "Select the correct device and telemetry field"
      ],
      note:
        "A device must publish telemetry before historical records can be available.",
      code: ""
    }
  ]
},

  "alerts": {
  title: "Alerts",
  sections: [
    {
      heading: "Alerts Overview",
      paragraphs: [
        "The Alerts module monitors incoming telemetry and generates alerts when configured threshold conditions are met."
      ],
      points: [
        "Real-time alert evaluation",
        "Device-specific rules",
        "Telemetry thresholds",
        "Severity levels",
        "Alert history"
      ],
      note:
        "Alerts require the selected device to publish the telemetry field used by the rule.",
      code: ""
    },

    {
      heading: "Create an Alert Rule",
      paragraphs: [
        "Create an alert rule by selecting a device, telemetry field, comparison condition, threshold, and severity."
      ],
      points: [
        "Path: Dashboard → Alerts → Create Alert",
        "Select the device",
        "Select the telemetry field",
        "Select the comparison operator",
        "Enter the threshold",
        "Select the severity",
        "Save the rule"
      ],
      note:
        "Configure thresholds according to the normal operating range of the device.",
      code: ""
    },

    {
      heading: "Supported Conditions",
      paragraphs: [
        "IRIS supports threshold-based conditions for evaluating incoming telemetry."
      ],
      points: [
        "Greater Than (>)",
        "Less Than (<)",
        "Equal To (=)"
      ],
      note: "",
      code: `Temperature > 50`
    },

    {
      heading: "Severity Levels",
      paragraphs: [
        "Severity levels help operators prioritize triggered alerts."
      ],
      points: [
        "Low",
        "Medium",
        "High",
        "Critical"
      ],
      note:
        "Use Critical only for conditions that require immediate attention.",
      code: ""
    },

    {
      heading: "View Triggered Alerts",
      paragraphs: [
        "Triggered alerts can be reviewed from the Alerts module to identify abnormal device conditions and recurring events."
      ],
      points: [
        "Path: Dashboard → Alerts",
        "Open the alert list",
        "Review the device",
        "Review the telemetry condition",
        "Review the severity",
        "Investigate the device if required"
      ],
      note:
        "Use Dashboard → Devices and Dashboard → Analytics to investigate the device after an alert is triggered.",
      code: ""
    },

    {
      heading: "Alert Troubleshooting",
      paragraphs: [
        "If an alert is not triggered, verify that the device is online and that the selected telemetry field is being published."
      ],
      points: [
        "Path: Dashboard → Devices",
        "Verify the device is Online",
        "Open Device Details",
        "Verify the telemetry field",
        "Return to Dashboard → Alerts",
        "Check the alert rule configuration"
      ],
      note:
        "Incorrect telemetry mapping or threshold values can prevent the expected alert from being generated.",
      code: ""
    }
  ]
},

  "mqtt": {
  title: "MQTT Guide",
  sections: [
    {
      heading: "MQTT Overview",
      paragraphs: [
        "IRIS uses MQTT as the communication protocol between connected IoT devices and AWS IoT Core. The IRIS SDK handles the device-side MQTT communication, while the IRIS backend processes incoming telemetry and delivers live updates to the web application."
      ],
      points: [
        "MQTT communication",
        "AWS IoT Core",
        "Secure TLS connection",
        "Real-time telemetry",
        "IRIS backend processing",
        "Socket.IO live dashboard updates"
      ],
      note:
        "Dashboard clients do not connect directly to MQTT. Device communication is handled through the cloud backend.",
      code: ""
    },

    {
      heading: "IRIS Communication Flow",
      paragraphs: [
        "Telemetry travels from the physical device to AWS IoT Core, through the IRIS backend, and then to the dashboard. This allows the platform to process and distribute device data in real time."
      ],
      points: [
        "NodeMCU ESP8266 reads sensor data",
        "IRIS SDK publishes telemetry",
        "AWS IoT Core receives MQTT messages",
        "IRIS backend processes telemetry",
        "Telemetry is stored for historical analysis",
        "Socket.IO distributes live updates",
        "Dashboard widgets display the data"
      ],
      note: "",
      code: `NodeMCU ESP8266
      ↓
IRIS Arduino SDK
      ↓
MQTT / AWS IoT Core
      ↓
IRIS Backend
      ↓
Socket.IO
      ↓
IRIS Dashboard`
    },

    {
      heading: "Telemetry Publishing",
      paragraphs: [
        "The IRIS SDK provides the telemetry API used by firmware to publish sensor values. Each telemetry field should use a consistent name so it can later be selected in dashboards, analytics, and alerts."
      ],
      points: [
        "Path: Arduino IDE → IRIS Firmware Example",
        "Read the sensor value",
        "Call iris.addTelemetry()",
        "Call iris.publish()",
        "Verify the value in Dashboard → Devices"
      ],
      note:
        "The telemetry key used in firmware must match the field selected when configuring dashboard widgets or alert rules.",
      code: `int ldrValue = analogRead(A0);

iris.addTelemetry("ldr", ldrValue);
iris.publish();`
    },

    {
      heading: "Device-to-Dashboard Example",
      paragraphs: [
        "An LDR value provides a simple example of the complete telemetry path. The device reads A0, publishes the value using the ldr telemetry key, and the dashboard displays the received value."
      ],
      points: [
        "Firmware: read A0",
        "Firmware: publish telemetry as ldr",
        "IRIS path: Dashboard → Devices → Device Details",
        "IRIS path: Dashboard → Edit Dashboard → Add Widget",
        "Select the same device",
        "Select telemetry: ldr",
        "Save and verify the live value"
      ],
      note: "",
      code: `int ldrValue = analogRead(A0);

iris.addTelemetry("ldr", ldrValue);
iris.publish();`
    },

    {
      heading: "MQTT Connection Requirements",
      paragraphs: [
        "The device requires network connectivity and the deployment-specific AWS IoT connection configuration to establish communication with the platform."
      ],
      points: [
        "Stable Wi-Fi connection",
        "Correct Device ID",
        "Correct AWS IoT configuration",
        "Valid certificates and private key",
        "Correct firmware configuration",
        "Internet connectivity"
      ],
      note:
        "Never expose AWS IoT certificates, private keys, Wi-Fi passwords, or other credentials in public repositories.",
      code: ""
    },

    {
      heading: "Troubleshooting MQTT",
      paragraphs: [
        "If telemetry does not appear in IRIS, check the communication path from the device to the dashboard in order."
      ],
      points: [
        "Arduino IDE → Serial Monitor",
        "Verify Wi-Fi connection",
        "Verify the Device ID",
        "Verify AWS IoT/MQTT connection",
        "Verify telemetry is being published",
        "Dashboard → Devices → Device Details",
        "Verify the latest telemetry",
        "Dashboard → Edit Dashboard → Widget configuration"
      ],
      note:
        "If the device is Offline, resolve the device connection before troubleshooting dashboard widgets.",
      code: ""
    }
  ]
},

  "sdk": {
  title: "IRIS SDK",
  sections: [
    {
      heading: "IRIS SDK for ESP8266",
      paragraphs: [
        "The IRIS SDK for ESP8266 provides the libraries and examples required to connect NodeMCU ESP8266 devices to the IRIS IoT Platform.",
        "The SDK provides the APIs required for initialization, telemetry publishing, continuous processing, and command handling."
      ],
      points: [
        "NodeMCU ESP8266 support",
        "Arduino IDE support",
        "AWS IoT/MQTT communication",
        "Telemetry publishing",
        "Command handling",
        "Reference firmware examples"
      ],
      note:
        "Path: Documentation → IRIS SDK. Current SDK version: 1.0.0.",
      code: "",
      downloads: [
        {
          title: "IRIS SDK for ESP8266",
          version: "1.0.0",
          description:
            "SDK package including source files, Arduino examples, documentation and license.",
          platform: "ESP8266 · Arduino IDE",
          href: "/docs/sdk/IRIS_SDK_ESP8266_v1.0.0.zip"
        }
      ]
    },

    {
      heading: "Install the SDK",
      paragraphs: [
        "Download the SDK package and install it in Arduino IDE before compiling IRIS firmware examples."
      ],
      points: [
        "Path: Documentation → IRIS SDK → Download",
        "Download the IRIS SDK package",
        "Install/import the SDK",
        "Open Arduino IDE",
        "Select NodeMCU ESP8266",
        "Select the correct COM port"
      ],
      note:
        "Use the Arduino IDE environment appropriate for your NodeMCU ESP8266 board.",
      code: ""
    },

    {
      heading: "Open an SDK Example",
      paragraphs: [
        "The SDK contains reference examples that demonstrate telemetry publishing and device command handling."
      ],
      points: [
        "Path: Arduino IDE → File → Examples → IRIS SDK",
        "TelemetryTest",
        "CommandTest",
        "RelayControl",
        "ServoControl"
      ],
      note:
        "For your first hardware test, start with a simple LDR or LED example before using the larger reference examples.",
      code: ""
    },

    {
      heading: "Core SDK Pattern",
      paragraphs: [
        "The common firmware pattern is to initialize the IRIS SDK, continuously process the SDK loop, add telemetry values, and publish them."
      ],
      points: [
        "Initialize IRIS in setup()",
        "Call iris.loop() continuously",
        "Call iris.addTelemetry() for each telemetry field",
        "Call iris.publish() to publish telemetry",
        "Register command callbacks when device control is required"
      ],
      note:
        "Use the complete SDK examples for the required connection and initialization configuration.",
      code: `iris.addTelemetry("ldr", ldrValue);
iris.publish();`
    },

    {
      heading: "Telemetry Example",
      paragraphs: [
        "Use the SDK telemetry API to publish a sensor value. The telemetry key can then be selected in dashboard widgets, analytics, and alerts."
      ],
      points: [
        "Path: Arduino IDE → IRIS SDK firmware",
        "Read the sensor",
        "Add the telemetry value",
        "Publish the telemetry",
        "Path in IRIS: Dashboard → Devices → Device Details",
        "Path in IRIS: Dashboard → Edit Dashboard → Add Widget"
      ],
      note:
        "Keep telemetry field names consistent between firmware and the IRIS platform.",
      code: `int ldrValue = analogRead(A0);

iris.addTelemetry("ldr", ldrValue);
iris.publish();`
    },

    {
      heading: "Command Handling",
      paragraphs: [
        "The SDK supports command handling for devices that need to receive control instructions from IRIS."
      ],
      points: [
        "Path: Arduino IDE → File → Examples → IRIS SDK → CommandTest",
        "Register the command callback",
        "Implement the required device action",
        "Upload the firmware",
        "Path in IRIS: Dashboard → Edit Dashboard → Add Widget",
        "Configure a Toggle or Push Button",
        "Send the command and verify the device"
      ],
      note:
        "The firmware command handler must match the command sent by the IRIS control.",
      code: ""
    }
  ]
},

  "api": {
  title: "API Reference",
  sections: [
    {
      heading: "API Overview",
      paragraphs: [
        "The IRIS backend provides internal REST APIs used by the web application and platform services for authentication, device management, telemetry, analytics, alerts, billing, email services, and system operations.",
        "These APIs are consumed by the IRIS application and are not currently published as a public developer API."
      ],
      points: [
        "REST architecture",
        "HTTPS communication",
        "JSON request and response",
        "Authenticated backend services",
        "Internal platform APIs"
      ],
      note:
        "The public developer API is not currently released. Do not build external integrations against undocumented internal endpoints.",
      code: ""
    },

    {
      heading: "Authentication",
      paragraphs: [
        "IRIS user authentication is handled through Amazon Cognito. Authenticated application requests use the user's authenticated session when accessing protected platform services."
      ],
      points: [
        "Amazon Cognito",
        "Authenticated sessions",
        "Protected backend endpoints",
        "Secure authentication flow"
      ],
      note:
        "Never expose authentication tokens, API keys, AWS credentials, or service secrets in client-side code.",
      code: ""
    },

    {
      heading: "Device APIs",
      paragraphs: [
        "The IRIS application uses backend services for device registration, device retrieval, device status, and device-related operations."
      ],
      points: [
        "Path in IRIS: Dashboard → Devices",
        "Device registration",
        "Device information",
        "Device status",
        "Device details",
        "Device operations"
      ],
      note:
        "Use the IRIS Devices interface for normal device management instead of calling internal endpoints directly.",
      code: ""
    },

    {
      heading: "Telemetry and Analytics APIs",
      paragraphs: [
        "Backend services process incoming device telemetry and provide the data required by the Dashboard and Analytics modules."
      ],
      points: [
        "Live telemetry processing",
        "Historical telemetry",
        "Device-based analytics",
        "Time-range filtering",
        "CSV export"
      ],
      note:
        "Firmware devices should publish telemetry through the IRIS SDK and MQTT/AWS IoT workflow rather than directly calling the backend REST API.",
      code: ""
    },

    {
      heading: "Alerts and Billing Services",
      paragraphs: [
        "IRIS also uses backend APIs for alert configuration, alert processing, billing plans, payment processing, and subscription management."
      ],
      points: [
        "Path: Dashboard → Alerts",
        "Path: Dashboard → Billing",
        "Alert rule management",
        "Subscription plans",
        "Payment processing",
        "Subscription status"
      ],
      note:
        "Payment credentials and Razorpay secrets are server-side configuration values and must never be exposed in frontend code.",
      code: ""
    },

    {
      heading: "Request and Response Format",
      paragraphs: [
        "Internal IRIS APIs use JSON request and response data. Applications should validate the response status and handle unsuccessful requests gracefully."
      ],
      points: [
        "JSON request payloads",
        "JSON response payloads",
        "HTTP status codes",
        "Authentication handling",
        "Error handling"
      ],
      note:
        "Internal endpoint paths and payloads may change as the platform evolves.",
      code: `{
  "deviceId": "IRIS-000001",
  "temperature": 28.5
}`
    },

    {
      heading: "Future Public API",
      paragraphs: [
        "A documented public API can be introduced in a future release for external applications and integrations."
      ],
      points: [
        "Public authentication documentation",
        "Device APIs",
        "Telemetry APIs",
        "Analytics APIs",
        "Alert APIs",
        "Billing APIs",
        "Webhook integrations"
      ],
      note:
        "Only use officially documented public endpoints when the IRIS public API is released.",
      code: ""
    }
  ]
},

  "firmware": {
  title: "Firmware Examples",
  sections: [
    {
      heading: "Firmware Overview",
      paragraphs: [
        "IRIS firmware examples are designed for NodeMCU ESP8266 devices using the Arduino IDE and the IRIS Arduino SDK. Start with a small hardware example, verify the device connection, and then combine sensors and controls for your application.",
        "The examples below focus on individual IRIS features so they can be used as starting points for your own firmware."
      ],
      points: [
        "NodeMCU ESP8266",
        "Arduino IDE",
        "IRIS Arduino SDK",
        "Telemetry publishing",
        "Command handling",
        "LED control",
        "LDR sensor reading",
        "Relay control"
      ],
      note:
        "Path: Documentation → Firmware Examples.",
      code: ""
    },

    {
      heading: "Example 1 — Turn an LED ON/OFF",
      paragraphs: [
        "Use this as a basic hardware test. Connect an LED to a digital output pin and verify that the ESP8266 can control the output."
      ],
      points: [
        "Path: Arduino IDE → Open your IRIS firmware sketch",
        "Connect the LED to the configured GPIO pin",
        "Set the pin as OUTPUT",
        "Upload the sketch",
        "Verify the LED turns ON and OFF"
      ],
      note:
        "Use the GPIO pin that matches your actual hardware wiring.",
      code: `const int LED_PIN = D1;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH); // LED ON
  delay(1000);

  digitalWrite(LED_PIN, LOW);  // LED OFF
  delay(1000);
}`
    },

    {
      heading: "Example 2 — Read an LDR Sensor",
      paragraphs: [
        "The NodeMCU ESP8266 provides the A0 analog input. Read the LDR value and publish it as IRIS telemetry."
      ],
      points: [
        "Path: Arduino IDE → Open your IRIS firmware sketch",
        "Connect the LDR output to A0",
        "Read the analog value",
        "Add the value as telemetry",
        "Publish the telemetry",
        "Path in IRIS: Dashboard → Devices → Device Details"
      ],
      note:
        "The telemetry key used in this example is ldr.",
      code: `int ldrValue = analogRead(A0);

iris.addTelemetry("ldr", ldrValue);
iris.publish();`
    },

    {
      heading: "Example 3 — Temperature and Humidity",
      paragraphs: [
        "Use the same IRIS telemetry API to publish temperature and humidity values from a supported sensor."
      ],
      points: [
        "Path: Arduino IDE → Open your IRIS firmware sketch",
        "Read the temperature value",
        "Read the humidity value",
        "Add both values as telemetry",
        "Publish the telemetry",
        "Path in IRIS: Dashboard → Edit Dashboard → Add Widget"
      ],
      note:
        "Replace the sensor-reading portion with the code required by the sensor used in your hardware.",
      code: `iris.addTelemetry("temperature", temperature);
iris.addTelemetry("humidity", humidity);
iris.publish();`
    },

    {
      heading: "Example 4 — Publish Multiple Telemetry Values",
      paragraphs: [
        "Once individual sensor tests are working, multiple values can be published during the same telemetry cycle."
      ],
      points: [
        "Path: Arduino IDE → Open your IRIS firmware sketch",
        "Read each sensor",
        "Add each value with a unique telemetry key",
        "Publish the telemetry",
        "Repeat at the required interval"
      ],
      note:
        "Keep telemetry field names consistent after dashboards and alerts have been configured.",
      code: `iris.addTelemetry("ldr", analogRead(A0));
iris.addTelemetry("temperature", temperature);
iris.addTelemetry("humidity", humidity);
iris.publish();`
    },

    {
      heading: "Example 5 — LED or Relay Command Control",
      paragraphs: [
        "A device can receive commands from IRIS when the firmware implements command handling. This can be used for simple ON/OFF control of an LED or relay."
      ],
      points: [
        "Path: Arduino IDE → File → Examples → IRIS SDK → CommandTest",
        "Configure the output pin",
        "Register the command callback",
        "Upload the firmware",
        "Path in IRIS: Dashboard → Edit Dashboard → Add Widget",
        "Choose Toggle or Push Button",
        "Send ON/OFF",
        "Verify the physical output"
      ],
      note:
        "The command handled by the firmware must match the command sent from IRIS.",
      code: `const int RELAY_PIN = D1;

void handleCommand(const String& command) {
  if (command == "ON") {
    digitalWrite(RELAY_PIN, HIGH);
  } else if (command == "OFF") {
    digitalWrite(RELAY_PIN, LOW);
  }
}`
    },

    {
      heading: "Example 6 — IRIS SDK Telemetry Pattern",
      paragraphs: [
        "The IRIS SDK handles the device communication layer. The firmware adds telemetry values and publishes them using the SDK APIs."
      ],
      points: [
        "Path: Arduino IDE → File → Examples → IRIS SDK → TelemetryTest",
        "Initialize the IRIS SDK",
        "Call iris.loop() continuously",
        "Add telemetry values",
        "Call iris.publish()"
      ],
      note:
        "Use the complete TelemetryTest example shipped with the SDK for the full initialization and connection configuration.",
      code: `void loop() {
  iris.loop();

  iris.addTelemetry("ldr", analogRead(A0));
  iris.publish();

  delay(5000);
}`
    },

    {
      heading: "Implemented SDK Examples",
      paragraphs: [
        "The IRIS SDK package contains complete reference examples for telemetry and device control."
      ],
      points: [
        "Path: Arduino IDE → File → Examples → IRIS SDK",
        "TelemetryTest — telemetry publishing",
        "CommandTest — command reception",
        "RelayControl — relay control",
        "ServoControl — servo control"
      ],
      note:
        "Use the smaller LED and LDR examples for initial testing, then use these SDK examples as complete reference implementations.",
      code: ""
    },

    {
      heading: "Firmware to Dashboard Workflow",
      paragraphs: [
        "Telemetry published by the firmware becomes available for dashboard widgets when the device is connected and the telemetry field is received by IRIS."
      ],
      points: [
        "Firmware: iris.addTelemetry(\"ldr\", value)",
        "Firmware: iris.publish()",
        "IRIS path: Dashboard → Devices → Device Details",
        "IRIS path: Dashboard → Edit Dashboard → Add Widget",
        "Select the same device",
        "Select telemetry: ldr",
        "Save and verify the live value"
      ],
      note:
        "If the telemetry field is unavailable, first verify that the device is Online and publishing that field.",
      code: ""
    },

    {
      heading: "Firmware Troubleshooting",
      paragraphs: [
        "Use the Arduino Serial Monitor and the IRIS Devices page together when troubleshooting firmware."
      ],
      points: [
        "Arduino IDE → Tools → Serial Monitor",
        "Check Wi-Fi connection",
        "Check Device ID",
        "Check AWS IoT/MQTT connection",
        "Check telemetry publishing",
        "IRIS path: Dashboard → Devices",
        "Open Device Details",
        "Verify latest telemetry"
      ],
      note:
        "Never expose certificates, private keys, passwords, or other production credentials when sharing firmware logs or source code.",
      code: ""
    }
  ]
},

  "faq": {
  title: "FAQ",
  sections: [
    {
      heading: "How do I add a device?",
      paragraphs: [
        "Register the physical device in IRIS before connecting it to the platform."
      ],
      points: [
        "Path: Dashboard → Devices → Add Device",
        "Enter the device information",
        "Save the device",
        "Copy the Device ID",
        "Configure the firmware with the Device ID",
        "Upload the firmware",
        "Return to Dashboard → Devices",
        "Open Device Details to verify the connection"
      ],
      note:
        "The Device ID in the firmware must match the device registered in IRIS.",
      code: ""
    },

    {
      heading: "How do I install the firmware SDK?",
      paragraphs: [
        "Download the IRIS SDK and install it in Arduino IDE before compiling the firmware."
      ],
      points: [
        "Path: Documentation → IRIS SDK",
        "Download the SDK",
        "Install/import the SDK in Arduino IDE",
        "Select NodeMCU ESP8266",
        "Open File → Examples → IRIS SDK",
        "Open the required example",
        "Compile and upload"
      ],
      note:
        "Start with a simple LDR or LED example when setting up the environment for the first time.",
      code: ""
    },

    {
      heading: "Why is my device Offline?",
      paragraphs: [
        "An Offline device normally indicates that IRIS is no longer receiving the expected device communication."
      ],
      points: [
        "Path: Dashboard → Devices → Device Details",
        "Check Last Seen",
        "Check the Arduino Serial Monitor",
        "Verify Wi-Fi connectivity",
        "Verify the Device ID",
        "Verify AWS IoT/MQTT connectivity",
        "Verify that the firmware is running",
        "Verify that telemetry is being published"
      ],
      note:
        "Resolve the device connection before troubleshooting dashboard widgets.",
      code: ""
    },

    {
      heading: "Why is my telemetry not appearing?",
      paragraphs: [
        "First verify that the device is Online and that the firmware is publishing the expected telemetry field."
      ],
      points: [
        "Path: Dashboard → Devices → Device Details",
        "Verify the device is Online",
        "Check the latest telemetry",
        "Verify the telemetry key in firmware",
        "Verify iris.addTelemetry() is being called",
        "Verify iris.publish() is being called",
        "Check the Arduino Serial Monitor"
      ],
      note:
        "The telemetry key in the firmware must match the field selected in the dashboard widget.",
      code: ""
    },

    {
      heading: "How do I display sensor data on a dashboard?",
      paragraphs: [
        "Publish the sensor value from firmware and then map that telemetry field to a dashboard widget."
      ],
      points: [
        "Firmware: iris.addTelemetry(\"ldr\", value)",
        "Firmware: iris.publish()",
        "Path: Dashboard → Edit Dashboard → Add Widget",
        "Select the widget type",
        "Select the device",
        "Select telemetry: ldr",
        "Configure the widget",
        "Save"
      ],
      note:
        "Replace ldr with the telemetry key published by your firmware.",
      code: ""
    },

    {
      heading: "How do I control an LED or relay?",
      paragraphs: [
        "The firmware must implement command handling before an IRIS control widget can operate an LED or relay."
      ],
      points: [
        "Path: Arduino IDE → File → Examples → IRIS SDK → CommandTest or RelayControl",
        "Configure the output pin",
        "Implement the command callback",
        "Upload the firmware",
        "Path: Dashboard → Edit Dashboard → Add Widget",
        "Choose Toggle or Push Button",
        "Select the device",
        "Configure the command",
        "Save",
        "Send ON/OFF"
      ],
      note:
        "Verify the command with a safe hardware setup before connecting production equipment.",
      code: ""
    },

    {
      heading: "How do I create an alert?",
      paragraphs: [
        "Create an alert rule using a device telemetry field and a threshold condition."
      ],
      points: [
        "Path: Dashboard → Alerts → Create Alert",
        "Select the device",
        "Select the telemetry field",
        "Select the comparison condition",
        "Enter the threshold",
        "Select the severity",
        "Save the rule"
      ],
      note:
        "The selected telemetry field must be published by the device.",
      code: ""
    },

    {
      heading: "How do I view historical telemetry?",
      paragraphs: [
        "Use Analytics to review telemetry that has already been received and stored by IRIS."
      ],
      points: [
        "Path: Dashboard → Analytics",
        "Select the device",
        "Select the telemetry field",
        "Choose the time range",
        "Load the data",
        "Review the chart",
        "Use CSV Export when required"
      ],
      note:
        "A device must publish telemetry before historical records can be available.",
      code: ""
    },

    {
      heading: "How do I create a dashboard?",
      paragraphs: [
        "Create a dashboard and then add widgets for the devices and telemetry you want to monitor."
      ],
      points: [
        "Path: Dashboard → Create Dashboard",
        "Enter a dashboard name",
        "Save",
        "Open the dashboard",
        "Select Edit Dashboard",
        "Select Add Widget",
        "Configure the widget",
        "Save"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Which hardware does the current SDK support?",
      paragraphs: [
        "The current IRIS SDK documentation targets NodeMCU ESP8266 devices using the Arduino IDE."
      ],
      points: [
        "NodeMCU ESP8266",
        "Arduino IDE",
        "IRIS Arduino SDK",
        "Wi-Fi connectivity",
        "AWS IoT/MQTT communication"
      ],
      note:
        "Use the hardware and SDK combination documented in Documentation → IRIS SDK.",
      code: ""
    },

    {
      heading: "Where can I find the firmware examples?",
      paragraphs: [
        "The documentation contains beginner-oriented examples and the SDK package contains the complete reference examples."
      ],
      points: [
        "Path: Documentation → Firmware Examples",
        "Path: Documentation → IRIS SDK",
        "Path: Arduino IDE → File → Examples → IRIS SDK",
        "TelemetryTest",
        "CommandTest",
        "RelayControl",
        "ServoControl"
      ],
      note: "",
      code: ""
    }
  ]
},

  "release-notes": {
  title: "Release Notes",
  sections: [
    {
      heading: "IRIS v1.0.0",
      paragraphs: [
        "IRIS v1.0.0 is the first complete release of the IRIS IoT Platform, providing the core workflow for connecting IoT devices, receiving live telemetry, visualizing device data, configuring alerts, analyzing historical data, and controlling supported devices."
      ],
      points: [
        "User Authentication",
        "Device Management",
        "AWS IoT and MQTT Communication",
        "Real-Time Telemetry",
        "Socket.IO Live Updates",
        "Dashboard Management",
        "Dashboard Widget System",
        "Device Commands",
        "Historical Analytics",
        "CSV Export",
        "Alerts",
        "Billing and Subscription Management",
        "Settings",
        "Documentation Center",
        "IRIS Arduino SDK",
        "ESP8266 Firmware Examples"
      ],
      note:
        "Version: 1.0.0",
      code: ""
    },

    {
      heading: "Firmware and SDK",
      paragraphs: [
        "IRIS v1.0.0 includes the IRIS Arduino SDK for NodeMCU ESP8266 devices and reference firmware examples for telemetry and device control."
      ],
      points: [
        "NodeMCU ESP8266 support",
        "Arduino IDE integration",
        "Telemetry publishing",
        "Command handling",
        "TelemetryTest",
        "CommandTest",
        "RelayControl",
        "ServoControl"
      ],
      note:
        "Path: Documentation → IRIS SDK or Documentation → Firmware Examples.",
      code: ""
    },

    {
      heading: "Platform Communication",
      paragraphs: [
        "IRIS v1.0.0 uses AWS IoT and MQTT for device communication and Socket.IO for real-time delivery of telemetry to the web dashboard."
      ],
      points: [
        "ESP8266 → IRIS SDK",
        "IRIS SDK → MQTT / AWS IoT Core",
        "AWS IoT Core → IRIS Backend",
        "IRIS Backend → Socket.IO",
        "Socket.IO → IRIS Dashboard"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Future Development",
      paragraphs: [
        "Future releases may extend IRIS with additional hardware support, integrations, public developer APIs, and additional platform capabilities."
      ],
      points: [
        "Additional hardware platforms",
        "Additional integrations",
        "Public developer API",
        "Additional SDK capabilities",
        "Additional firmware examples"
      ],
      note:
        "Future functionality will be documented when it is officially released.",
      code: ""
    }
  ]
},
}
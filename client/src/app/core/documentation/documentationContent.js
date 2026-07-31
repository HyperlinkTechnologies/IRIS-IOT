export const documentationContent = {

  "getting-started": {
  title: "Getting Started",
  sections: [
    {
      heading: "Platform Overview",
      paragraphs: [
        "IRIS is a cloud-based Industrial Internet of Things (IIoT) platform that enables organizations to securely connect, monitor, and manage IoT devices from a centralized web application. The platform combines real-time telemetry, device management, analytics, dashboards, alerts, and cloud connectivity into a unified solution.",
        "Designed for scalability and reliability, IRIS supports industrial monitoring applications where continuous device communication, historical data analysis, and rapid operational insights are essential."
      ],
      points: [
        "Secure user authentication",
        "Real-time telemetry monitoring",
        "Interactive dashboards",
        "Historical analytics",
        "Alert management",
        "Cloud-based device management",
        "Industrial-grade architecture"
      ],
      note:
        "Before using the platform, ensure your organization account has been created and verified successfully.",
      code: ""
    },

    {
      heading: "Create Your Account",
      paragraphs: [
        "New users can create an account using their organization email address. After registration, an email verification process activates the account and grants access to the platform.",
        "Account authentication is securely managed through Amazon Cognito to ensure enterprise-grade identity management."
      ],
      points: [
        "Open the IRIS Sign In page",
        "Select Create Account",
        "Complete the registration form",
        "Verify your email address",
        "Sign in to the dashboard"
      ],
      note:
        "Use a valid organization email address to simplify user management and future subscription administration.",
      code: ""
    },

    {
      heading: "Accessing the Dashboard",
      paragraphs: [
        "After signing in, the Dashboard becomes the central workspace for monitoring devices, managing telemetry, configuring alerts, viewing analytics, and administering the platform.",
        "Navigation is organized into dedicated modules, allowing quick access to every major feature without leaving the application."
      ],
      points: [
        "Dashboard",
        "Devices",
        "Analytics",
        "Alerts",
        "Documentation",
        "Billing",
        "Settings"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Register Your First Device",
      paragraphs: [
        "Every IoT device must be registered before it can communicate with the IRIS platform. Device registration creates a unique identity that enables secure telemetry ingestion, monitoring, and management.",
        "Once the device is registered, configure the firmware using the appropriate MQTT endpoint and credentials before publishing telemetry."
      ],
      points: [
        "Navigate to Devices",
        "Select Add Device",
        "Provide device information",
        "Save the device",
        "Configure firmware",
        "Connect the device",
        "Verify live telemetry"
      ],
      note:
        "A device will appear online only after it successfully establishes a secure MQTT connection and begins publishing telemetry.",
      code: `{
  "deviceId": "IRIS-000001",
  "temperature": 28.5,
  "humidity": 65,
  "battery": 92,
  "timestamp": "2026-07-31T10:30:00Z"
}`
    },

    {
      heading: "Next Steps",
      paragraphs: [
        "After successfully connecting your first device, you can begin building dashboards, creating alert rules, monitoring historical analytics, and managing your deployment from a single interface.",
        "As your deployment grows, additional devices can be onboarded using the same workflow without requiring changes to your existing dashboards or analytics configuration."
      ],
      points: [
        "Create dashboards",
        "Add widgets",
        "Monitor live telemetry",
        "Configure alerts",
        "Analyze historical data",
        "Download reports",
        "Explore developer documentation"
      ],
      note:
        "Following the recommended onboarding sequence ensures that dashboards, analytics, and alerts receive valid telemetry immediately after deployment.",
      code: ""
    }
  ]
},

  "device-setup": {
  title: "Device Setup",
  sections: [
    {
      heading: "Supported Devices",
      paragraphs: [
        "The IRIS IoT Platform supports secure onboarding of compatible IoT devices for real-time monitoring and management. Each supported device communicates with the platform through MQTT over TLS, ensuring reliable and encrypted data transmission.",
        "The current release supports NodeMCU ESP8266 devices. Support for additional hardware platforms will be introduced in future releases without affecting existing deployments."
      ],
      points: [
        "NodeMCU ESP8266",
        "Wi-Fi Connectivity",
        "MQTT Communication",
        "AWS IoT Core Integration",
        "Secure TLS Communication"
      ],
      note:
        "Always install the latest supported firmware before connecting a device to the platform.",
      code: ""
    },

    {
      heading: "Device Registration",
      paragraphs: [
        "Before a device can communicate with IRIS, it must be registered through the Devices module. Registration creates a unique device identity that enables secure communication, telemetry processing, analytics, and alert management.",
        "Each registered device can later be assigned to dashboards, widgets, analytics reports, and automation workflows."
      ],
      points: [
        "Navigate to Devices",
        "Click Add Device",
        "Enter a unique device name",
        "Provide device information",
        "Save the device"
      ],
      note:
        "Choose descriptive device names that clearly identify the installation location or equipment.",
      code: ""
    },

    {
      heading: "Firmware Configuration",
      paragraphs: [
        "After registering the device, configure the firmware using the MQTT endpoint, security credentials, Wi-Fi configuration, and publish topics provided for your deployment.",
        "Correct firmware configuration ensures secure authentication with AWS IoT Core and uninterrupted telemetry transmission."
      ],
      points: [
        "Configure Wi-Fi Credentials",
        "Configure MQTT Endpoint",
        "Configure Device Certificates",
        "Configure Private Key",
        "Restart the Device"
      ],
      note:
        "Incorrect MQTT credentials or certificates will prevent the device from establishing a secure connection.",
      code: `const mqttTopic =
"iris/IRIS-000001/telemetry";`
    },

    {
      heading: "Verifying Device Connectivity",
      paragraphs: [
        "After the firmware starts successfully, the device automatically establishes a secure MQTT connection with AWS IoT Core and begins publishing telemetry.",
        "The Devices page displays the current connection status, last communication time, and recent telemetry updates for every registered device."
      ],
      points: [
        "Online Status",
        "Last Seen Timestamp",
        "Latest Telemetry",
        "Connection Health",
        "Device Information"
      ],
      note:
        "If the device remains offline, verify the Wi-Fi connection, MQTT endpoint, certificates, and internet connectivity before troubleshooting the application.",
      code: ""
    },

    {
      heading: "Publishing Telemetry",
      paragraphs: [
        "Telemetry should be published periodically using JSON format. Every message should contain valid sensor values that can be processed by dashboards, analytics, and alert rules.",
        "Consistent payload structures simplify widget configuration and long-term analytics."
      ],
      points: [
        "Temperature",
        "Humidity",
        "Pressure",
        "Light Intensity",
        "Battery Level",
        "Relay Status",
        "Timestamp"
      ],
      note:
        "Maintain consistent telemetry field names across all devices to simplify dashboard and analytics configuration.",
      code: `{
  "temperature": 28.5,
  "humidity": 65,
  "battery": 92,
  "relay": true,
  "timestamp": "2026-07-31T10:30:00Z"
}`
    },

    {
      heading: "Best Practices",
      paragraphs: [
        "Following recommended deployment practices improves device reliability, simplifies maintenance, and ensures consistent telemetry collection across large-scale installations.",
        "Proper device naming, secure credential management, and stable network connectivity significantly reduce operational issues."
      ],
      points: [
        "Use unique device IDs",
        "Securely store certificates",
        "Validate telemetry before publishing",
        "Monitor connection status",
        "Keep firmware updated",
        "Avoid duplicate device registrations"
      ],
      note:
        "Do not expose MQTT credentials, certificates, or private keys in public repositories or client applications.",
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
        "The Dashboard is the primary workspace of the IRIS IoT Platform, providing a centralized view of connected devices, live telemetry, operational metrics, and industrial processes. Dashboards enable operators to monitor multiple devices simultaneously from a single interface.",
        "Multiple dashboards can be created to organize devices by project, production line, customer, facility, or geographical location, making the platform scalable for deployments of any size."
      ],
      points: [
        "Real-time telemetry monitoring",
        "Multiple dashboards",
        "Interactive widgets",
        "Responsive layout",
        "Live device status",
        "Custom dashboard organization"
      ],
      note:
        "The number of dashboards available depends on your subscription plan.",
      code: ""
    },

    {
      heading: "Creating a Dashboard",
      paragraphs: [
        "A dashboard provides a dedicated workspace for visualizing telemetry from one or more devices. Each dashboard can be customized independently to suit operational requirements.",
        "Choose descriptive dashboard names so operators can quickly identify the purpose of each workspace."
      ],
      points: [
        "Navigate to Dashboard",
        "Click Create Dashboard",
        "Enter dashboard name",
        "Save the dashboard",
        "Open the dashboard"
      ],
      note:
        "Create separate dashboards for different production areas or projects to improve organization.",
      code: ""
    },

    {
      heading: "Working with Widgets",
      paragraphs: [
        "Widgets provide graphical representations of live telemetry received from connected IoT devices. Each widget can be configured to display a specific telemetry field from a selected device.",
        "IRIS supports multiple widget types suitable for monitoring numerical values, charts, indicators, and device controls."
      ],
      points: [
        "Gauge",
        "Semi Gauge",
        "Line Chart",
        "LED Indicator",
        "Toggle Switch",
        "Push Button",
        "Slider",
        "Text Display",
        "Numeric Display"
      ],
      note:
        "Widgets display data only after they are mapped to a device and telemetry field.",
      code: ""
    },

    {
      heading: "Configuring Widgets",
      paragraphs: [
        "Each widget can be customized to display telemetry according to operational requirements. Configuration options include selecting devices, telemetry fields, value ranges, labels, and visual settings.",
        "Proper widget configuration ensures accurate visualization of real-time device data."
      ],
      points: [
        "Select device",
        "Choose telemetry field",
        "Configure value range",
        "Set labels",
        "Save widget configuration"
      ],
      note:
        "Verify telemetry mappings before saving to avoid displaying incorrect values.",
      code: ""
    },

    {
      heading: "Managing Dashboard Layout",
      paragraphs: [
        "Widgets can be repositioned and resized to create dashboards optimized for different monitoring scenarios. Well-organized dashboards improve operator efficiency and simplify data interpretation.",
        "Changes remain available after saving the dashboard configuration."
      ],
      points: [
        "Move widgets",
        "Resize widgets",
        "Arrange layout",
        "Save dashboard"
      ],
      note:
        "Always save the dashboard after making layout changes.",
      code: ""
    },

    {
      heading: "Best Practices",
      paragraphs: [
        "Design dashboards around operational workflows instead of displaying every available telemetry value. Group related devices together and prioritize critical information near the top of the dashboard.",
        "Keeping dashboards clean and focused improves readability and reduces operator response time during abnormal conditions."
      ],
      points: [
        "Group similar devices",
        "Highlight critical telemetry",
        "Avoid unnecessary widgets",
        "Use meaningful widget titles",
        "Review dashboards regularly"
      ],
      note:
        "Well-designed dashboards allow operators to identify issues quickly without searching through excessive information.",
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
        "The Analytics module enables users to analyze historical telemetry collected from connected devices. Unlike the Dashboard, which displays live data, Analytics focuses on historical trends, allowing users to understand device behavior over time.",
        "Telemetry is securely stored in AWS and can be retrieved for visualization, reporting, and operational analysis."
      ],
      points: [
        "Historical telemetry",
        "Interactive charts",
        "Device-based analysis",
        "Time range selection",
        "Cloud-backed storage"
      ],
      note:
        "Only telemetry that has been stored by the platform is available for historical analysis.",
      code: ""
    },

    {
      heading: "Viewing Historical Data",
      paragraphs: [
        "Historical telemetry can be viewed by selecting a registered device and choosing the required time range. The platform retrieves stored telemetry records and visualizes them using interactive charts.",
        "This allows users to identify operational trends, detect abnormal behavior, and review previous device activity."
      ],
      points: [
        "Select a device",
        "Choose a time range",
        "Load historical telemetry",
        "Review interactive charts"
      ],
      note:
        "Large time ranges may require additional loading time depending on the amount of stored telemetry.",
      code: ""
    },

    {
      heading: "Telemetry Visualization",
      paragraphs: [
        "Analytics displays telemetry using interactive line charts that make it easy to understand changes over time. Each chart represents a selected telemetry field for the chosen device.",
        "Charts automatically update whenever a different telemetry parameter or time range is selected."
      ],
      points: [
        "Temperature trends",
        "Humidity trends",
        "Light intensity",
        "Battery level",
        "Relay state history"
      ],
      note:
        "Only telemetry fields that exist for the selected device will be available for visualization.",
      code: ""
    },

    {
      heading: "Filtering Analytics",
      paragraphs: [
        "The Analytics module provides filtering options to simplify the analysis of large telemetry datasets. Filters help isolate the information relevant to a specific investigation or reporting period.",
        "Selecting the appropriate device and time range improves chart readability and reduces unnecessary data processing."
      ],
      points: [
        "Device selection",
        "Telemetry selection",
        "Custom time range",
        "Historical records"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Exporting Data",
      paragraphs: [
        "Historical telemetry can be exported for offline analysis and reporting. Exported data can be used in spreadsheet applications or integrated into external reporting workflows.",
        "The exported dataset contains the telemetry values returned by the selected filters."
      ],
      points: [
        "CSV Export",
        "Timestamp",
        "Device ID",
        "Telemetry values"
      ],
      note:
        "Exported files contain only the telemetry matching the selected filters.",
      code: ""
    },

    {
      heading: "Best Practices",
      paragraphs: [
        "Use shorter time ranges when investigating specific operational events. Long-term analysis is better suited for identifying performance trends and seasonal patterns.",
        "Review analytics regularly to identify abnormal device behavior before it impacts system performance."
      ],
      points: [
        "Review trends regularly",
        "Compare multiple time periods",
        "Monitor abnormal values",
        "Export reports when required",
        "Use analytics alongside alerts"
      ],
      note:
        "Analytics complements the Dashboard by explaining what happened over time rather than what is happening right now.",
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
        "The Alerts module continuously monitors incoming telemetry from connected devices and automatically generates alerts whenever configured conditions are met. This allows operators to identify abnormal device behavior in real time without manually monitoring dashboards.",
        "Alerts are evaluated immediately after new telemetry is received, helping users respond quickly to operational issues."
      ],
      points: [
        "Real-time alert evaluation",
        "Device-specific alert rules",
        "Threshold monitoring",
        "Severity classification",
        "Alert history"
      ],
      note:
        "Alerts are generated only for telemetry fields that have active alert rules configured.",
      code: ""
    },

    {
      heading: "Creating an Alert Rule",
      paragraphs: [
        "Alert rules define the conditions that trigger notifications for a specific device and telemetry field. Each rule continuously evaluates incoming telemetry against the configured threshold.",
        "Well-designed alert rules help reduce false alarms while ensuring important events are detected immediately."
      ],
      points: [
        "Navigate to Alerts",
        "Click Create Alert",
        "Select a device",
        "Choose a telemetry field",
        "Select a comparison operator",
        "Enter the threshold value",
        "Choose the severity level",
        "Save the rule"
      ],
      note:
        "Create separate alert rules for different telemetry parameters to simplify monitoring and troubleshooting.",
      code: ""
    },

    {
      heading: "Supported Conditions",
      paragraphs: [
        "IRIS currently supports threshold-based alert conditions that compare incoming telemetry values against user-defined limits.",
        "Whenever a telemetry value satisfies the configured condition, an alert is immediately generated."
      ],
      points: [
        "Greater Than (>)",
        "Less Than (<)",
        "Equal To (=)"
      ],
      note:
        "Threshold values should reflect the normal operating range of your devices.",
      code: `Temperature > 50`
    },

    {
      heading: "Severity Levels",
      paragraphs: [
        "Severity levels help operators prioritize alerts according to their operational impact. Higher severity alerts should receive immediate attention.",
        "Using appropriate severity levels improves incident management and reduces unnecessary interruptions."
      ],
      points: [
        "Low",
        "Medium",
        "High",
        "Critical"
      ],
      note:
        "Reserve Critical severity for conditions that require immediate corrective action.",
      code: ""
    },

    {
      heading: "Managing Alerts",
      paragraphs: [
        "All generated alerts are stored within the platform, allowing users to review historical events and investigate recurring issues. Alert history provides valuable context when diagnosing device behavior.",
        "Operators can review triggered alerts alongside Analytics to understand when and why a device entered an abnormal state."
      ],
      points: [
        "View active alerts",
        "Review alert history",
        "Identify recurring issues",
        "Monitor device health"
      ],
      note:
        "Historical alerts remain useful even after a device returns to normal operating conditions.",
      code: ""
    },

    {
      heading: "Best Practices",
      paragraphs: [
        "Configure thresholds based on actual operating conditions instead of arbitrary values. Excessively sensitive alert rules may generate unnecessary notifications, while thresholds that are too broad can delay the detection of important events.",
        "Review alert configurations periodically as device operating conditions change over time."
      ],
      points: [
        "Use realistic thresholds",
        "Avoid duplicate rules",
        "Review alerts regularly",
        "Monitor recurring events",
        "Use Analytics for investigation"
      ],
      note:
        "Alert effectiveness depends on accurate telemetry and properly configured threshold values.",
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
        "The IRIS IoT Platform uses MQTT as the primary communication protocol between IoT devices and AWS IoT Core. Devices publish telemetry securely over MQTT, while the backend processes incoming data and distributes real-time updates to the dashboard using Socket.IO.",
        "This architecture provides secure, reliable, and low-latency communication between connected devices and the IRIS web application."
      ],
      points: [
        "MQTT over TLS",
        "AWS IoT Core integration",
        "Real-time telemetry",
        "Secure cloud communication",
        "Socket.IO live updates"
      ],
      note:
        "Devices communicate only with AWS IoT Core. Dashboard clients receive telemetry through the IRIS backend and do not connect directly to MQTT.",
      code: ""
    },

    {
      heading: "Device Communication Flow",
      paragraphs: [
        "Telemetry published by devices follows a secure cloud pipeline before appearing on dashboards and analytics. Every published message is validated, processed, and stored before being delivered to connected users.",
        "Understanding this communication flow helps simplify troubleshooting and deployment."
      ],
      points: [
        "Device publishes telemetry",
        "AWS IoT Core receives the message",
        "IRIS backend processes telemetry",
        "Historical data is stored",
        "Socket.IO broadcasts live updates",
        "Dashboard widgets update automatically"
      ],
      note: "",
      code: ""
    },

    {
      heading: "MQTT Topic Structure",
      paragraphs: [
        "All telemetry should be published using the topic structure configured for your IRIS deployment. Maintaining a consistent topic hierarchy ensures reliable device identification and simplifies backend processing.",
        "Each device publishes telemetry to its own dedicated topic."
      ],
      points: [
        "Organization",
        "Project",
        "Device Identifier",
        "Telemetry Topic"
      ],
      note:
        "Use the topic assigned during device configuration. Publishing to incorrect topics prevents telemetry from being processed.",
      code: `iris/IRIS-000001/telemetry`
    },

    {
      heading: "Telemetry Payload",
      paragraphs: [
        "Telemetry must be published as valid JSON. Each payload should contain only the sensor values required by the platform. Consistent payload structures simplify dashboard configuration, analytics, and alert processing.",
        "Avoid changing field names after devices are deployed, as dashboards and alerts depend on consistent telemetry keys."
      ],
      points: [
        "Device ID",
        "Temperature",
        "Humidity",
        "Battery",
        "Relay Status",
        "Timestamp"
      ],
      note:
        "Invalid JSON payloads or unexpected field names may prevent telemetry from being processed correctly.",
      code: `{
  "deviceId": "IRIS-000001",
  "temperature": 28.5,
  "humidity": 65,
  "battery": 92,
  "relay": true,
  "timestamp": "2026-07-31T10:30:00Z"
}`
    },

    {
      heading: "Connection Best Practices",
      paragraphs: [
        "Reliable MQTT communication depends on stable network connectivity, secure credentials, and consistent publishing intervals. Following recommended practices improves system reliability and reduces communication failures.",
        "Proper device configuration also ensures accurate analytics and alert evaluation."
      ],
      points: [
        "Use stable Wi-Fi connectivity",
        "Publish valid JSON only",
        "Maintain consistent telemetry intervals",
        "Protect certificates and private keys",
        "Validate payloads before publishing",
        "Monitor device connection status"
      ],
      note:
        "Never expose MQTT certificates, private keys, or AWS credentials in firmware repositories or public source code.",
      code: ""
    },

    {
      heading: "Troubleshooting MQTT",
      paragraphs: [
        "If telemetry does not appear on the dashboard, verify each stage of the communication pipeline. Most connectivity issues are caused by incorrect MQTT configuration, network failures, or invalid credentials.",
        "Checking the communication flow step by step significantly reduces troubleshooting time."
      ],
      points: [
        "Verify Wi-Fi connection",
        "Verify AWS IoT endpoint",
        "Verify certificates",
        "Verify publish topic",
        "Check backend connection",
        "Confirm dashboard receives live updates"
      ],
      note:
        "A device appearing offline usually indicates that telemetry has not been received within the expected interval.",
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
        "The IRIS IoT Platform provides REST APIs that enable communication between the web application, backend services, and external integrations. APIs are used throughout the platform for authentication, device management, analytics, alerts, email services, and future third-party integrations.",
        "All API communication is performed over HTTPS using JSON request and response payloads."
      ],
      points: [
        "RESTful architecture",
        "HTTPS communication",
        "JSON request/response",
        "Secure backend services",
        "Future third-party integrations"
      ],
      note:
        "The public developer API is currently under development. The existing APIs are used internally by the IRIS platform.",
      code: ""
    },

    {
      heading: "Authentication",
      paragraphs: [
        "User authentication is managed by Amazon Cognito. After successful authentication, the frontend securely communicates with backend services using authenticated requests.",
        "Sensitive backend endpoints are protected and are accessible only to authenticated users or trusted internal services."
      ],
      points: [
        "Amazon Cognito Authentication",
        "JWT-based authorization",
        "Protected backend endpoints",
        "Secure session management"
      ],
      note:
        "Never expose authentication tokens, API keys, or service credentials in client-side applications.",
      code: ""
    },

    {
      heading: "Current Platform APIs",
      paragraphs: [
        "The IRIS backend currently exposes APIs that support the platform's core functionality. These APIs are consumed by the frontend and internal platform services.",
        "As the platform evolves, additional public APIs will become available for external developers."
      ],
      points: [
        "Authentication",
        "Device Management",
        "Analytics",
        "Alerts",
        "Email Services",
        "System Health"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Request Format",
      paragraphs: [
        "All API requests and responses use JSON. Clients should always send the appropriate Content-Type header when communicating with backend services.",
        "Proper request validation improves reliability and simplifies error handling."
      ],
      points: [
        "Content-Type: application/json",
        "UTF-8 encoding",
        "Structured JSON payloads"
      ],
      note: "",
      code: `{
  "deviceId": "IRIS-000001",
  "temperature": 28.5
}`
    },

    {
      heading: "Response Handling",
      paragraphs: [
        "Successful API responses return structured JSON containing the requested resource or operation result. Error responses include appropriate HTTP status codes together with descriptive error messages.",
        "Applications integrating with IRIS should always validate response status codes before processing returned data."
      ],
      points: [
        "200 - Success",
        "201 - Resource Created",
        "400 - Bad Request",
        "401 - Unauthorized",
        "404 - Resource Not Found",
        "500 - Internal Server Error"
      ],
      note:
        "Handle API failures gracefully and display meaningful error messages to users.",
      code: ""
    },

    {
      heading: "Future Public APIs",
      paragraphs: [
        "Future releases of the IRIS IoT Platform will include documented public APIs for developers who want to integrate external applications with the platform.",
        "Comprehensive endpoint documentation, request examples, authentication guides, and SDKs will be published once the public API is officially released."
      ],
      points: [
        "Device APIs",
        "Telemetry APIs",
        "Analytics APIs",
        "Alert APIs",
        "Billing APIs",
        "Webhook Support"
      ],
      note:
        "Features listed in this section are planned for future platform releases.",
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
        "The IRIS firmware is responsible for connecting IoT devices to the cloud, collecting sensor data, and publishing telemetry to the IRIS platform through AWS IoT Core. Proper firmware implementation ensures reliable communication, secure data transmission, and accurate real-time monitoring.",
        "The current IRIS release includes firmware support for NodeMCU ESP8266 using the Arduino IDE and the IRIS Arduino SDK."
      ],
      points: [
        "NodeMCU ESP8266",
        "Arduino IDE",
        "IRIS Arduino SDK",
        "AWS IoT Core",
        "Secure MQTT Communication"
      ],
      note:
        "Always use the latest version of the IRIS Arduino SDK when developing new firmware.",
      code: ""
    },

    {
      heading: "Firmware Workflow",
      paragraphs: [
        "Every device follows the same communication workflow after powering on. The firmware initializes the hardware, connects to the Wi-Fi network, authenticates with AWS IoT Core, and begins publishing telemetry at regular intervals.",
        "Following a consistent workflow simplifies deployment and troubleshooting across multiple devices."
      ],
      points: [
        "Initialize hardware",
        "Connect to Wi-Fi",
        "Authenticate with AWS IoT Core",
        "Connect to MQTT",
        "Read sensors",
        "Publish telemetry",
        "Repeat continuously"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Publishing Telemetry",
      paragraphs: [
        "Firmware should publish telemetry as valid JSON using the configured MQTT topic. Every published message becomes available for live dashboards, analytics, and alert processing within the IRIS platform.",
        "Keep the payload structure consistent across all devices to simplify dashboard configuration and long-term maintenance."
      ],
      points: [
        "Read sensor values",
        "Build JSON payload",
        "Publish to MQTT topic",
        "Repeat at configured interval"
      ],
      note:
        "Avoid changing telemetry field names after deployment, as existing dashboards and alerts depend on them.",
      code: `StaticJsonDocument<256> doc;

doc["temperature"] = temperature;
doc["humidity"] = humidity;
doc["battery"] = battery;

serializeJson(doc, payload);

client.publish(topic, payload);`
    },

    {
      heading: "Connection Management",
      paragraphs: [
        "Firmware should continuously monitor network and MQTT connectivity. If either connection is lost, the firmware should automatically attempt to reconnect before publishing additional telemetry.",
        "Automatic reconnection improves reliability during temporary network interruptions."
      ],
      points: [
        "Monitor Wi-Fi status",
        "Reconnect automatically",
        "Reconnect MQTT session",
        "Resume telemetry publishing"
      ],
      note:
        "Never restart the device unnecessarily when a simple reconnection can restore communication.",
      code: ""
    },

    {
      heading: "Firmware Best Practices",
      paragraphs: [
        "Production firmware should be reliable, secure, and easy to maintain. Following recommended development practices improves long-term stability and simplifies future updates.",
        "Well-designed firmware also reduces cloud bandwidth usage and improves device responsiveness."
      ],
      points: [
        "Publish telemetry at fixed intervals",
        "Validate sensor readings",
        "Handle communication failures",
        "Keep credentials secure",
        "Log important events during development",
        "Test before deployment"
      ],
      note:
        "Never hardcode AWS credentials, certificates, or private keys in publicly accessible repositories.",
      code: ""
    },

    {
      heading: "Troubleshooting Firmware",
      paragraphs: [
        "If telemetry does not appear in the IRIS platform, verify the firmware configuration before investigating backend services. Most communication issues originate from incorrect device configuration or network connectivity.",
        "Checking each stage of the firmware workflow helps identify problems quickly."
      ],
      points: [
        "Verify Wi-Fi connection",
        "Verify AWS IoT endpoint",
        "Verify MQTT topic",
        "Verify certificates",
        "Verify sensor readings",
        "Confirm telemetry publishing"
      ],
      note:
        "Use the Arduino Serial Monitor during development to observe connection status and published telemetry.",
      code: ""
    }
  ]
},

  "faq": {
  title: "Frequently Asked Questions",
  sections: [
    {
      heading: "General Questions",
      paragraphs: [
        "This section answers the most common questions about using the IRIS IoT Platform. The information below covers account management, devices, dashboards, analytics, alerts, and troubleshooting."
      ],
      points: [
        "Account Management",
        "Device Registration",
        "Dashboard Configuration",
        "Analytics",
        "Alerts",
        "Troubleshooting"
      ],
      note: "",
      code: ""
    },

    {
      heading: "How do I register a new device?",
      paragraphs: [
        "Open the Devices module and select 'Add Device'. Enter the required device information and save the device. After registration, configure your firmware using the MQTT endpoint and credentials before connecting the device to AWS IoT Core."
      ],
      points: [
        "Open Devices",
        "Click Add Device",
        "Enter device information",
        "Save the device",
        "Configure firmware",
        "Verify telemetry"
      ],
      note:
        "A device will appear online only after it starts publishing telemetry successfully.",
      code: ""
    },

    {
      heading: "Why is my device shown as Offline?",
      paragraphs: [
        "A device is marked as offline when the platform stops receiving telemetry within the expected interval. This usually indicates a connectivity or firmware issue."
      ],
      points: [
        "Verify Wi-Fi connection",
        "Check AWS IoT Core connectivity",
        "Verify MQTT topic",
        "Confirm firmware is running",
        "Check device power supply"
      ],
      note:
        "Review the device's Last Seen time to determine when communication stopped.",
      code: ""
    },

    {
      heading: "Why are my widgets not updating?",
      paragraphs: [
        "Widgets update only when valid telemetry is received from the selected device and telemetry field. Incorrect widget mappings or missing telemetry will prevent live updates."
      ],
      points: [
        "Verify device selection",
        "Verify telemetry field mapping",
        "Confirm telemetry is being published",
        "Refresh the dashboard if required"
      ],
      note:
        "Dashboard widgets display live telemetry only. Historical values are available in the Analytics module.",
      code: ""
    },

    {
      heading: "How do I view historical telemetry?",
      paragraphs: [
        "Navigate to the Analytics module, select the required device, choose a time range, and load the historical data. Interactive charts display the stored telemetry collected by the platform."
      ],
      points: [
        "Open Analytics",
        "Select device",
        "Choose time range",
        "Load historical data"
      ],
      note: "",
      code: ""
    },

    {
      heading: "How do alert rules work?",
      paragraphs: [
        "Alert rules continuously evaluate incoming telemetry against configured threshold conditions. Whenever a telemetry value satisfies a rule, the platform immediately generates an alert."
      ],
      points: [
        "Select device",
        "Choose telemetry field",
        "Configure threshold",
        "Assign severity",
        "Save rule"
      ],
      note:
        "Alert rules evaluate only live telemetry received from connected devices.",
      code: ""
    },

    {
      heading: "I forgot my password. What should I do?",
      paragraphs: [
        "Select the 'Forgot Password' option on the Sign In page and follow the account recovery process provided by Amazon Cognito. After verification, you can create a new password and access your account."
      ],
      points: [
        "Click Forgot Password",
        "Verify your email",
        "Create a new password",
        "Sign in again"
      ],
      note:
        "Password recovery is securely managed through Amazon Cognito.",
      code: ""
    },

    {
      heading: "Where can I get additional help?",
      paragraphs: [
        "If you experience issues that cannot be resolved using this documentation, contact your system administrator or the IRIS support team. Include device information, screenshots, and relevant error messages to help diagnose the issue more quickly."
      ],
      points: [
        "Review documentation",
        "Collect error information",
        "Contact support",
        "Include device details"
      ],
      note:
        "Providing complete troubleshooting information significantly reduces resolution time.",
      code: ""
    }
  ]
},

  "release-notes": {
  title: "Release Notes",
  sections: [
    {
      heading: "About Release Notes",
      paragraphs: [
        "This section documents the evolution of the IRIS IoT Platform. Each release introduces new features, performance improvements, security enhancements, and bug fixes. Reviewing the release history helps administrators understand platform capabilities and deployment changes before upgrading."
      ],
      points: [
        "Feature additions",
        "Performance improvements",
        "Security updates",
        "Bug fixes",
        "Platform enhancements"
      ],
      note:
        "Always review the release notes before upgrading to a newer platform version.",
      code: ""
    },

    {
      heading: "Version 0.1.0",
      paragraphs: [
        "The initial MVP established the foundation of the IRIS IoT Platform, including secure authentication and the first dashboard experience."
      ],
      points: [
        "AWS Cognito authentication",
        "Dashboard framework",
        "Responsive dashboard layout",
        "Initial platform architecture"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Version 0.2.0",
      paragraphs: [
        "This release introduced complete device management and real-time telemetry capabilities, allowing devices to securely communicate with the platform through AWS IoT Core."
      ],
      points: [
        "Device Management",
        "AWS IoT Core integration",
        "Real-time telemetry",
        "Socket.IO live updates",
        "Dashboard widgets"
      ],
      note: "",
      code: ""
    },

    {
      heading: "Version 0.3.0",
      paragraphs: [
        "Version 0.3.0 significantly expanded the platform by introducing historical analytics, persistent telemetry storage, Amazon SES email services, and a comprehensive documentation center."
      ],
      points: [
        "Historical Analytics",
        "Telemetry persistence",
        "CSV export",
        "Amazon SES integration",
        "Contact Form emails",
        "Login Alert emails",
        "Documentation module"
      ],
      note:
        "This release represents the first feature-complete operational version of the IRIS platform prior to Billing implementation.",
      code: ""
    },

    {
      heading: "Upcoming Features",
      paragraphs: [
        "The following capabilities are planned for future releases as the platform continues to evolve toward its production-ready version."
      ],
      points: [
        "Billing & Subscription Management",
        "Plan-based feature access",
        "Welcome Email Automation",
        "Public REST API",
        "Developer SDK Documentation",
        "Additional firmware examples"
      ],
      note:
        "Features listed above are under active development and may change before release.",
      code: ""
    },

    {
      heading: "Versioning Policy",
      paragraphs: [
        "IRIS follows semantic versioning for development milestones. Each release increases the version number to reflect new functionality, enhancements, or fixes while maintaining clear version history."
      ],
      points: [
        "Major releases introduce significant platform capabilities.",
        "Minor releases add new features and improvements.",
        "Patch releases focus on bug fixes and stability improvements."
      ],
      note:
        `The current documentation corresponds to IRIS IoT Platform Version ${__APP_VERSION__}.`,
      code: ""
    },
  ]
},
}
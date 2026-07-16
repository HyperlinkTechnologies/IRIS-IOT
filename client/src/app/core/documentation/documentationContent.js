export const documentationContent = {

  "getting-started": {

    title: "Getting Started",

    sections: [

      {

        heading: "Platform Overview",

        paragraphs: [

          "IRIS is an Industrial IoT platform designed to securely connect, monitor and manage industrial devices in real time.",

          "The platform provides device management, live telemetry, dashboards, analytics, alerts, notifications and cloud-based monitoring through a single web application."

        ],

        points: [

          "Secure user authentication",
          "Real-time telemetry monitoring",
          "Interactive dashboards",
          "Analytics and visualization",
          "Alert management",
          "Notification center",
          "Billing and subscription management"

        ],

        note: "",

        code: ""

      },

      {

        heading: "Create Your Account",

        paragraphs: [

          "Create an account using your organization email address.",

          "After verification, log in to access the IRIS dashboard."

        ],

        points: [

          "Open the IRIS login page",
          "Click Sign Up",
          "Verify your email",
          "Log in using your credentials"

        ],

        note: "",

        code: ""

      },

      {

        heading: "Register Your First Device",

        paragraphs: [

          "Every IoT device must be registered before it can publish telemetry.",

          "After registration, configure the device firmware using the generated credentials."

        ],

        points: [

          "Navigate to Devices",
          "Click Add Device",
          "Enter device information",
          "Save the device",
          "Configure firmware",
          "Start publishing telemetry"

        ],

        note:

          "Make sure your device has a stable internet connection before publishing telemetry.",

        code:

`{
  "deviceId": "device-001",
  "temperature": 28.5,
  "humidity": 65
}`

      }

    ]

  },

  "device-setup": {

  title: "Device Setup",

  sections: [

    {

      heading: "Supported Devices",

      paragraphs: [

        "IRIS currently supports NodeMCU ESP8266 for real-time Industrial IoT applications.",

        "Support for ESP32 and additional industrial controllers will be added in future platform releases."

      ],

      points: [

        "NodeMCU ESP8266",
        "ESP32 (Coming Soon)",
        "Wi-Fi Connectivity",
        "MQTT Communication",
        "AWS IoT Core Integration"

      ],

      note:
        "Always use the latest supported firmware version.",

      code: ""

    },

    {

      heading: "Registering a Device",

      paragraphs: [

        "Before a device can communicate with IRIS, it must be registered in the Devices page.",

        "Each registered device receives a unique identity used for monitoring and authentication."

      ],

      points: [

        "Navigate to Devices",
        "Click Add Device",
        "Enter device information",
        "Save the device"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Configuring Firmware",

      paragraphs: [

        "Configure your firmware with the MQTT endpoint, device credentials and publish topic.",

        "Verify that the device successfully connects before publishing telemetry."

      ],

      points: [

        "Configure Wi-Fi",
        "Configure MQTT Endpoint",
        "Configure Certificates",
        "Restart Device"

      ],

      note:
        "Incorrect MQTT credentials will prevent the device from connecting.",

      code:

`const mqttTopic =
"startup/bikes/device001/telemetry";`

    },

    {

      heading: "Publishing Telemetry",

      paragraphs: [

        "Telemetry should be published periodically in JSON format.",

        "Each message should contain only valid sensor values."

      ],

      points: [

        "Temperature",
        "Humidity",
        "Pressure",
        "LDR",
        "Battery"

      ],

      note: "",

      code:

`{
  "temperature":28.5,
  "humidity":65,
  "battery":92
}`

    }

  ]

},

  "dashboard": {

  title: "Dashboard Guide",

  sections: [

    {

      heading: "Dashboard Overview",

      paragraphs: [

        "Dashboards provide a centralized view of your connected IoT devices and telemetry data.",

        "Multiple dashboards can be created to organize devices by projects, locations or customers."

      ],

      points: [

        "Real-time monitoring",
        "Multiple dashboards",
        "Interactive widgets",
        "Responsive layout"

      ],

      note:
        "The number of dashboards available depends on your subscription plan.",

      code: ""

    },

    {

      heading: "Creating a Dashboard",

      paragraphs: [

        "Navigate to the Dashboard page and click Create Dashboard.",

        "Provide a meaningful dashboard name and save it."

      ],

      points: [

        "Open Dashboard",
        "Click Create Dashboard",
        "Enter dashboard name",
        "Save dashboard"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Adding Widgets",

      paragraphs: [

        "Widgets visualize telemetry received from your devices.",

        "Each widget can be linked to a specific device and telemetry field."

      ],

      points: [

        "Gauge",
        "Chart",
        "LED Indicator",
        "Toggle Button",
        "Slider",
        "Text Display",
        "Numeric Display"

      ],

      note:
        "Only telemetry mapped to a widget will be displayed.",

      code: ""

    },

    {

      heading: "Editing Widgets",

      paragraphs: [

        "Widgets can be resized, repositioned and configured at any time.",

        "Changes are reflected immediately after saving."

      ],

      points: [

        "Resize widget",
        "Move widget",
        "Change telemetry binding",
        "Update appearance"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Saving Dashboard",

      paragraphs: [

        "Always save the dashboard after making changes.",

        "Saved dashboards are available whenever you sign in."

      ],

      points: [

        "Save layout",
        "Verify widget positions",
        "Exit edit mode"

      ],

      note:
        "Unsaved changes will be lost if you leave the page.",

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

        "Analytics helps transform raw telemetry into meaningful insights for monitoring and decision-making.",

        "Historical data allows users to identify trends, compare performance and optimize industrial processes."

      ],

      points: [

        "Historical telemetry",
        "Real-time charts",
        "Performance monitoring",
        "Trend analysis"

      ],

      note:
        "Analytics is available only for stored telemetry data.",

      code: ""

    },

    {

      heading: "Viewing Historical Data",

      paragraphs: [

        "Select a device and choose the required time range to visualize historical telemetry.",

        "Historical data can be viewed using interactive charts."

      ],

      points: [

        "Select device",
        "Choose date range",
        "Load telemetry",
        "View charts"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Supported Charts",

      paragraphs: [

        "IRIS provides multiple visualization options depending on the telemetry type.",

        "Different charts help understand trends more effectively."

      ],

      points: [

        "Line Chart",
        "Bar Chart",
        "Area Chart",
        "Gauge",
        "Pie Chart (Future)"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Filtering Data",

      paragraphs: [

        "Analytics can be filtered by device, telemetry type and selected time period.",

        "Filters help isolate specific operational events."

      ],

      points: [

        "Device filter",
        "Date filter",
        "Telemetry filter"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Exporting Reports",

      paragraphs: [

        "Telemetry reports can be exported for further analysis and record keeping.",

        "Additional export formats will be supported in future releases."

      ],

      points: [

        "PDF (Future)",
        "CSV (Future)",
        "Excel (Future)"

      ],

      note:
        "Export functionality will be available after backend integration.",

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

        "Alerts continuously monitor incoming telemetry and notify users when configured conditions are met.",

        "Alerts help identify abnormal device behavior before it becomes a critical issue."

      ],

      points: [

        "Real-time monitoring",
        "Threshold-based alerts",
        "Multiple severity levels",
        "Instant notifications"

      ],

      note:
        "Alert rules are evaluated whenever new telemetry is received.",

      code: ""

    },

    {

      heading: "Creating an Alert Rule",

      paragraphs: [

        "Navigate to the Alerts page and click Create Alert.",

        "Choose the device, telemetry field and condition that should trigger the alert."

      ],

      points: [

        "Select Device",
        "Choose Telemetry",
        "Set Condition",
        "Select Severity",
        "Save Rule"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Alert Conditions",

      paragraphs: [

        "IRIS supports multiple comparison operators for defining alert conditions.",

        "Rules can be configured based on telemetry values."

      ],

      points: [

        "Greater Than (>)",
        "Less Than (<)",
        "Equal To (=)"

      ],

      note: "",

      code:

`Temperature > 50°C`

    },

    {

      heading: "Severity Levels",

      paragraphs: [

        "Severity helps prioritize alerts according to their impact.",

        "Higher severity alerts require immediate attention."

      ],

      points: [

        "Low",
        "Medium",
        "High",
        "Critical"

      ],

      note:
        "Use Critical only for production-impacting conditions.",

      code: ""

    },

    {

      heading: "Alert Notifications",

      paragraphs: [

        "Triggered alerts appear in the Notification Center.",

        "Future releases will support Email and SMS notifications."

      ],

      points: [

        "In-App Notification",
        "Email (Future)",
        "SMS (Future)"

      ],

      note: "",

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

        "IRIS uses MQTT as the primary communication protocol between IoT devices and the cloud.",

        "Devices publish telemetry to AWS IoT Core, while the platform subscribes to receive real-time data."

      ],

      points: [

        "Lightweight protocol",
        "Real-time communication",
        "Publish / Subscribe model",
        "AWS IoT Core integration"

      ],

      note:
        "Ensure your device has internet connectivity before attempting to connect.",

      code: ""

    },

    {

      heading: "Connecting to AWS IoT Core",

      paragraphs: [

        "Configure your device using the AWS IoT endpoint and the required security certificates.",

        "After a successful connection, the device is ready to publish telemetry."

      ],

      points: [

        "AWS IoT Endpoint",
        "Root CA Certificate",
        "Device Certificate",
        "Private Key"

      ],

      note:
        "All MQTT connections must use TLS encryption.",

      code: ""

    },

    {

      heading: "MQTT Topic Structure",

      paragraphs: [

        "Telemetry should always be published using the predefined topic structure.",

        "A consistent topic hierarchy makes device management easier."

      ],

      points: [

        "Organization",
        "Project",
        "Device ID",
        "Telemetry"

      ],

      note: "",

      code:
`startup/bikes/device001/telemetry`

    },

    {

      heading: "Telemetry Payload",

      paragraphs: [

        "Telemetry messages must be sent in JSON format.",

        "Only valid JSON payloads are processed by the platform."

      ],

      points: [

        "Temperature",
        "Humidity",
        "Battery",
        "Timestamp"

      ],

      note:
        "Always include the required telemetry fields.",

      code:
`{
  "temperature":28.5,
  "humidity":65,
  "battery":92,
  "timestamp":"2026-07-16T10:30:00Z"
}`

    },

    {

      heading: "Best Practices",

      paragraphs: [

        "Publish telemetry at regular intervals instead of sending excessive messages.",

        "Use meaningful device IDs and validate payloads before publishing."

      ],

      points: [

        "Validate JSON",
        "Avoid duplicate messages",
        "Use QoS appropriately",
        "Monitor connection status"

      ],

      note:
        "Following MQTT best practices improves platform performance and reliability.",

      code: ""

    }

  ]

},

  "api": {

  title: "API Reference",

  sections: [

    {

      heading: "Overview",

      paragraphs: [

        "The IRIS REST API allows external applications to interact with the platform.",

        "API support will be introduced after the backend is completed."

      ],

      points: [

        "REST APIs",
        "JSON Requests",
        "JWT Authentication",
        "HTTPS Communication"

      ],

      note:
        "The API module is currently under development.",

      code: ""

    },

    {

      heading: "Future Endpoints",

      paragraphs: [

        "The following endpoints are planned for future releases."

      ],

      points: [

        "GET /devices",
        "POST /devices",
        "GET /telemetry",
        "POST /alerts",
        "GET /analytics"

      ],

      note: "",

      code: ""

    }

  ]

},

  "firmware": {

  title: "Firmware Examples",

  sections: [

    {

      heading: "Supported Firmware",

      paragraphs: [

        "IRIS currently provides firmware examples for NodeMCU ESP8266.",

        "ESP32 examples will be added in future releases."

      ],

      points: [

        "NodeMCU ESP8266",
        "ESP32 (Coming Soon)",
        "Arduino IDE"

      ],

      note: "",

      code: ""

    },

    {

      heading: "Publishing Telemetry",

      paragraphs: [

        "Firmware should publish telemetry in JSON format."

      ],

      points: [

        "Connect Wi-Fi",
        "Connect MQTT",
        "Read Sensors",
        "Publish JSON"

      ],

      note: "",

      code:

`client.publish(
  topic,
  payload
);`

    }

  ]

},

  "faq": {

  title: "Frequently Asked Questions",

  sections: [

    {

      heading: "Common Questions",

      paragraphs: [

        "This section answers common questions regarding the IRIS platform."

      ],

      points: [

        "How do I register a device?",

        "How do I create a dashboard?",

        "How do I reset my password?",

        "How do I upgrade my subscription?",

        "Why is my device offline?"

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

      heading: "Version History",

      paragraphs: [

        "The following versions summarize the major milestones of the IRIS platform."

      ],

      points: [

        "v0.1.0 - Initial MVP",

        "v0.2.0 - Dashboard & Devices",

        "v0.3.0 - Analytics",

        "v0.4.0 - Alerts & Notifications",

        "v0.5.0 - Billing & Documentation"

      ],

      note:
        "Future releases will be documented here.",

      code: ""

    }

  ]

}

};
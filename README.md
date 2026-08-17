# IRIS IoT Platform

IRIS is a cloud-connected IoT platform for registering devices, receiving real-time telemetry, monitoring device status, visualizing data, configuring alerts, analyzing historical telemetry, and controlling supported devices.

## Version

**v1.0.0**

---

## Features

- User authentication with Amazon Cognito
- IoT device registration and management
- Real-time device online/offline status
- AWS IoT Core and MQTT communication
- Real-time telemetry updates
- Customizable dashboards
- Dashboard widgets for telemetry and device controls
- Device command handling
- Historical telemetry analytics
- CSV telemetry export
- Alert rules and threshold monitoring
- Billing and subscription management
- User and security settings
- Integrated documentation center
- IRIS Arduino SDK for ESP8266
- Firmware examples for telemetry and device control

---

## System Architecture

```text
IoT Device
   │
   │ IRIS Arduino SDK
   │
   ▼
MQTT / AWS IoT Core
   │
   ▼
IRIS Backend
   │
   ├── Device Management
   ├── Telemetry Processing
   ├── Alerts
   ├── Analytics
   ├── Billing
   └── Authentication Services
   │
   ▼
Socket.IO
   │
   ▼
IRIS Web Dashboard
```

---

## Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Socket.IO Client
- Recharts
- AWS Amplify

### Backend

- Node.js
- Express
- Socket.IO
- MQTT
- AWS SDK

### AWS Services

- Amazon Cognito
- AWS IoT Core
- Amazon DynamoDB
- Amazon S3
- Amazon SES

### Payments

- Razorpay

### Supported Device Platform

- NodeMCU ESP8266
- Arduino IDE
- IRIS Arduino SDK

---

## Repository Structure

```text
IRIS-IOT/
│
├── client/
│   ├── public/
│   │   └── docs/
│   └── src/
│       └── app/
│
├── server/
│   ├── src/
│   └── README.md
│
├── README.md
└── package.json
```

---

## Prerequisites

Install the following before running IRIS locally:

- Node.js
- npm
- Arduino IDE for firmware development
- NodeMCU ESP8266 board package for Arduino IDE
- AWS account and required AWS services
- Razorpay account for billing/payment functionality

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/SS-2302/IRIS-IOT.git
cd IRIS-IOT
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Start the frontend

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 5. Configure backend environment variables

Copy the example environment file.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Fill in the required values in `.env`.

**Never commit `.env` to Git.**

### 6. Start the backend

Development:

```bash
npm run dev
```

Production/start command:

```bash
npm start
```

The backend normally runs on:

```text
http://localhost:4000
```

---

## Environment Variables

The backend environment template is available at:

```text
server/.env.example
```

The environment file contains configuration for:

- AWS
- Amazon Cognito
- AWS IoT
- DynamoDB
- S3
- SES
- Razorpay
- Application services

Use empty placeholders in `.env.example`.

Never place real credentials, private keys, API secrets, certificates, or production passwords in the repository.

---

## IRIS SDK

The IRIS Arduino SDK supports NodeMCU ESP8266 devices using Arduino IDE.

### SDK Location

```text
Documentation → IRIS SDK
```

The repository also contains the SDK package:

```text
client/public/docs/sdk/
```

Current SDK package:

```text
IRIS_SDK_ESP8266_v1.0.0.zip
```

### Arduino Examples

Open:

```text
Arduino IDE
→ File
→ Examples
→ IRIS SDK
```

Reference examples include:

- TelemetryTest
- CommandTest
- RelayControl
- ServoControl

For beginner hardware testing, use:

```text
Documentation → Firmware Examples
```

---

## Basic Firmware Workflow

### LDR telemetry

```cpp
int ldrValue = analogRead(A0);

iris.addTelemetry("ldr", ldrValue);
iris.publish();
```

### Dashboard workflow

```text
Device Registration
      ↓
Firmware Configuration
      ↓
Device Connects to AWS IoT
      ↓
Telemetry Published
      ↓
Dashboard → Devices
      ↓
Dashboard → Edit Dashboard
      ↓
Add Widget
      ↓
Select Device + Telemetry
```

---

## Device Setup

New users should follow:

```text
Documentation → Device Setup
```

The setup flow is:

1. Register the device.
2. Obtain the Device ID.
3. Install the IRIS SDK.
4. Configure firmware.
5. Upload firmware to NodeMCU ESP8266.
6. Verify the device connection.
7. Verify telemetry.
8. Add dashboard widgets.

---

## Dashboard

Dashboard functionality includes:

- Dashboard creation
- Dashboard editing
- Widget configuration
- Device selection
- Telemetry widgets
- Charts
- Gauges
- Device controls
- Widget layout management

Path:

```text
Dashboard → Dashboard
```

---

## Analytics

Historical telemetry can be accessed through:

```text
Dashboard → Analytics
```

Users can:

- Select a device
- Select telemetry
- Select a time range
- View historical data
- Analyze telemetry trends
- Export telemetry as CSV

---

## Alerts

Alert rules can be configured through:

```text
Dashboard → Alerts
```

Users can configure:

- Device
- Telemetry field
- Comparison condition
- Threshold
- Severity

---

## Billing

Billing and subscription management are available through:

```text
Dashboard → Billing
```

Razorpay is used for payment processing.

Production Razorpay credentials must be configured through the deployment environment and must never be committed to Git.

---

## Documentation

The application contains an integrated documentation center covering:

- Getting Started
- Device Setup
- Dashboard
- Analytics
- Alerts
- MQTT
- IRIS SDK
- API Reference
- Firmware Examples
- FAQ
- Release Notes

Access it from:

```text
Dashboard → Documentation
```

---

## Production Deployment

The IRIS backend is deployed using Railway.

Production environment variables must be configured in the deployment platform rather than committed to the repository.

The frontend can be deployed using a static hosting provider such as Netlify.

Production deployment requires:

- AWS configuration
- Cognito configuration
- AWS IoT configuration
- DynamoDB configuration
- S3 configuration
- SES configuration
- Razorpay configuration
- Frontend/backend URLs
- Production CORS configuration

---

## Security

Do not commit:

```text
.env
.env.local
AWS access keys
AWS secret keys
AWS IoT certificates
AWS IoT private keys
Razorpay secret keys
API tokens
Passwords
Production credentials
```

Use:

```text
server/.env.example
```

as the configuration template.

---

## Release

### v1.0.0

The first complete IRIS platform release includes:

- Authentication
- Device management
- AWS IoT/MQTT communication
- Real-time telemetry
- Dashboards
- Widgets
- Device commands
- Analytics
- CSV export
- Alerts
- Billing
- Settings
- Documentation
- IRIS Arduino SDK
- ESP8266 firmware examples

---

## Project Status

**Current Release: v1.0.0**

IRIS v1.0.0 is the current stable release prepared for team handover.

# IRIS IoT Platform — Backend

The IRIS backend is the Node.js/Express service that connects the IRIS web application with AWS services, IoT devices, telemetry, alerts, analytics, billing, and real-time communication.

## Version

**v1.0.0**

---

## Responsibilities

The backend provides services for:

- Device management
- AWS IoT communication
- MQTT telemetry processing
- Real-time Socket.IO communication
- Dashboard data persistence
- Alert management
- Historical telemetry access
- User data management
- Billing and subscription management
- Razorpay payment processing
- Email services through Amazon SES
- File/storage operations through Amazon S3
- Authentication-related backend services

---

## Technology Stack

- Node.js
- Express
- Socket.IO
- MQTT
- AWS SDK for JavaScript
- AWS IoT Device SDK
- AWS JWT verification
- Amazon DynamoDB
- Amazon S3
- Amazon SES
- Razorpay

---

## Backend Structure

```text
server/
│
├── certs/
│
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── templates/
│   └── server.js
│
├── .env.example
├── package.json
└── README.md
```

The exact implementation structure may evolve as the platform develops. Refer to the source tree when adding new backend modules.

---

## Requirements

Install:

- Node.js
- npm
- AWS account with the required services configured
- Razorpay account for billing functionality

---

## Installation

From the repository root:

```bash
cd server
npm install
```

---

## Environment Configuration

Create the local environment file from the template.

PowerShell:

```powershell
Copy-Item .env.example .env
```

Linux/macOS:

```bash
cp .env.example .env
```

Configure the required values in:

```text
server/.env
```

### Environment Variables

The template contains configuration for:

```text
Application
AWS
Amazon Cognito
AWS IoT
DynamoDB
Amazon S3
Amazon SES
Internal API
Razorpay
```

The complete variable list is maintained in:

```text
server/.env.example
```

**Never commit `.env` or real credentials to Git.**

---

## Running the Backend

### Development

```bash
npm run dev
```

This starts the backend using Nodemon.

### Start

```bash
npm start
```

The backend normally runs on:

```text
http://localhost:4000
```

---

## IoT Communication Flow

The IRIS device communication path is:

```text
NodeMCU ESP8266
      │
      │ IRIS Arduino SDK
      ▼
MQTT
      │
      ▼
AWS IoT Core
      │
      ▼
IRIS Backend
      │
      ├── Telemetry Processing
      ├── Device Status
      └── Alert Processing
      │
      ▼
Socket.IO
      │
      ▼
IRIS Web Dashboard
```

The backend subscribes to the configured AWS IoT telemetry topic and processes incoming device telemetry.

---

## Device Management

The backend provides device operations used by the dashboard, including:

- Registering devices
- Retrieving devices
- Updating device information
- Removing devices
- Tracking device status
- Retrieving device-related telemetry

The frontend accesses these operations through the configured API routes.

---

## Real-Time Communication

Socket.IO is used to deliver real-time telemetry and backend events to connected dashboard clients.

The general flow is:

```text
AWS IoT Core
      ↓
IRIS Backend
      ↓
Socket.IO
      ↓
Connected Dashboard Clients
```

This allows telemetry widgets and device status information to update without manually refreshing the page.

---

## AWS Services

### Amazon Cognito

Used for user authentication and identity management.

The backend uses Cognito-related configuration and token verification where required.

### AWS IoT Core

Used for MQTT-based device communication and telemetry.

### Amazon DynamoDB

Used for persistent application data including platform records such as:

- Users
- Devices
- Dashboards
- Alerts
- Subscriptions
- Payments

The exact table names are configured through environment variables.

### Amazon S3

Used for application file/storage operations where configured.

### Amazon SES

Used for transactional email functionality such as application and security-related emails.

---

## Billing and Razorpay

The backend integrates Razorpay for subscription payment processing.

The required configuration is:

```env
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Important

Production Razorpay credentials must be configured through the production environment, such as Railway.

Never place the live secret key in:

- Source code
- README files
- `.env.example`
- Git commits
- Public documentation

---

## API

The backend exposes REST API routes for the frontend application.

Core API areas include:

```text
/api/health
/api/aws
/api/devices
/api/payments
```

Additional routes are available for platform functionality such as authentication-related operations, dashboards, alerts, billing, users, and subscriptions.

For exact route implementations and request/response structures, refer to:

```text
server/src/routes/
server/src/controllers/
server/src/services/
```

---

## Error Handling

Backend errors should be handled through the existing route/controller/service architecture.

When modifying backend functionality:

1. Validate incoming data.
2. Authenticate/authorize where required.
3. Handle AWS/API errors.
4. Return an appropriate HTTP status.
5. Log server-side errors without exposing secrets.
6. Keep sensitive credentials out of error responses.

---

## Production Deployment

The IRIS backend is deployed on Railway.

Production configuration should be maintained through Railway environment variables.

The production environment must contain the required values for:

- AWS
- Cognito
- AWS IoT
- DynamoDB
- S3
- SES
- Razorpay
- Application configuration

Do not commit production environment files.

---

## Local vs Production

### Local

```text
Frontend
localhost:5173
     ↓
Backend
localhost:4000
     ↓
AWS Services
```

### Production

```text
IRIS Web Application
     ↓
Railway Backend
     ↓
AWS Services
     ↓
IoT Devices
```

The frontend must use the correct production backend URL when deployed.

---

## Security Checklist

Before deployment or handover, verify that the repository does not contain:

```text
.env
AWS_ACCESS_KEY_ID values
AWS_SECRET_ACCESS_KEY values
AWS IoT private keys
AWS IoT certificates containing private material
Razorpay secret keys
Lambda/API keys
Passwords
Production tokens
```

Use:

```text
server/.env.example
```

as the configuration reference.

---

## Backend Development Guidelines

When adding backend functionality:

1. Keep route handling inside the route/controller structure.
2. Keep business logic in services.
3. Keep database access inside repositories.
4. Use environment variables for credentials and deployment-specific configuration.
5. Do not hard-code AWS, Razorpay, or other secrets.
6. Preserve the existing API contracts unless a change is required.
7. Test the affected API before deployment.

---

## Backend Release

### v1.0.0

The IRIS v1.0.0 backend provides the production foundation for:

- Device management
- AWS IoT/MQTT telemetry
- Real-time Socket.IO updates
- Dashboard persistence
- Alerts
- Analytics data access
- User data
- Billing and subscriptions
- Razorpay payments
- SES email services
- S3 storage operations

---

## Related Documentation

Application documentation is available inside the IRIS platform:

```text
Dashboard → Documentation
```

Important sections include:

```text
Getting Started
Device Setup
Dashboard
Analytics
Alerts
MQTT
IRIS SDK
API Reference
Firmware Examples
FAQ
Release Notes
```

---

## Current Release

**IRIS Backend v1.0.0**

This backend release is part of the IRIS IoT Platform v1.0.0 handover.

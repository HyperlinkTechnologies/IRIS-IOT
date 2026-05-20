/* ================= AWS CONFIG ================= */

export const awsConfig = {

  region: "us-east-1",

  /* ================= COGNITO ================= */

  userPoolId:
    "YOUR_USER_POOL_ID",

  userPoolWebClientId:
    "YOUR_CLIENT_ID",

  /* ================= DYNAMODB ================= */

  dashboardTable:
    "iris_dashboards",

  settingsTable:
    "iris_settings",

  /* ================= S3 ================= */

  bucketName:
    "iris-iot-storage",

  /* ================= IOT ================= */

  iotEndpoint:
    "YOUR_IOT_ENDPOINT",
};
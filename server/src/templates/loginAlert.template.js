/**
 * server/src/templates/loginAlert.template.js
 * IRIS IoT Platform - Login Alert Email
 */

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildRow(label, value) {
  return `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid #f1f1f1;width:140px;font-size:14px;font-weight:600;color:#555555;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:14px 0;border-bottom:1px solid #f1f1f1;font-size:14px;line-height:24px;color:#222222;vertical-align:top;word-break:break-word;">
        ${value}
      </td>
    </tr>
  `;
}

export default function loginAlertTemplate({
  name = "",
  loginTime = "",
  device = "",
  browser = "",
  browserVersion = "",
  os = "",
  ipAddress = "",
  location = "",
  securityUrl = "",
}) {
  const safeName = escapeHtml(name);
  const safeTime = escapeHtml(loginTime);
  const safeDevice = escapeHtml(device);
  const safeBrowser = escapeHtml(
  browserVersion
    ? `${browser} ${browserVersion}`
    : browser
);
  const safeOS = escapeHtml(os);
  const safeIP = escapeHtml(ipAddress);
  const safeLocation = escapeHtml(location);

  const buttonUrl =
    securityUrl && securityUrl.trim() !== ""
      ? securityUrl
      : "https://iris-iot.netlify.app";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Security Login Alert</title>
</head>

<body style="margin:0;padding:0;background:#f5f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f6f8;padding:32px 16px;">
<tr>
<td align="center">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;background:#ffffff;border:1px solid #ececec;border-radius:12px;overflow:hidden;">

<tr>
<td style="padding:34px 40px 24px 40px;border-top:5px solid #ff5700;">

<div style="font-size:12px;font-weight:700;letter-spacing:1.2px;color:#ff5700;text-transform:uppercase;margin-bottom:12px;">
IRIS IoT Platform
</div>

<h1 style="margin:0;font-size:28px;line-height:36px;color:#111111;font-weight:700;">
Security Login Alert
</h1>

<p style="margin:18px 0 0 0;font-size:15px;line-height:28px;color:#555555;">
Hello${safeName ? ` ${safeName}` : ""},
</p>

<p style="margin:12px 0 0 0;font-size:15px;line-height:28px;color:#555555;">
A successful sign-in to your IRIS IoT Platform account was detected.
If this was you, no further action is required.
If you do not recognize this activity, secure your account immediately.
</p>

</td>
</tr>

<tr>
<td style="padding:0 40px 10px 40px;">

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
${buildRow("Login Time", safeTime || "-")}
${buildRow("Device", safeDevice || "-")}
${buildRow("Browser", safeBrowser || "-")}
${buildRow("Operating System", safeOS || "-")}
${safeIP ? buildRow("IP Address", safeIP) : ""}
${safeLocation ? buildRow("Location", safeLocation) : ""}
</table>

</td>
</tr>

<tr>
<td style="padding:24px 40px 0 40px;">

<div style="background:#fff8f3;border:1px solid #ffd9bf;border-radius:10px;padding:18px;">

<div style="font-size:15px;font-weight:700;color:#111111;margin-bottom:10px;">
Security Notice
</div>

<p style="margin:0;font-size:14px;line-height:26px;color:#555555;">
If this login was not initiated by you, your account credentials may have been
compromised. Change your password immediately and review your recent account
activity to keep your account secure.
</p>

</div>

</td>
</tr>

<tr>
<td style="padding:20px 40px 36px 40px;">

<div style="height:1px;background:#eeeeee;margin-bottom:24px;"></div>

<p style="margin:0 0 10px 0;font-size:14px;color:#666666;line-height:24px;">
This security notification was sent automatically by
<strong>IRIS IoT Platform</strong> to help protect your account.
</p>

<p style="margin:0 0 6px 0;font-size:14px;line-height:28px;color:#666666;">
If you recognize this login, you can safely ignore this email.
</p>

<p style="margin:0;font-size:14px;line-height:28px;color:#666666;">
Website:
<a
href="https://www.hyperlinktech.in"
style="color:#ff5700;text-decoration:none;"
>
www.hyperlinktech.in
</a>
</p>

<p style="margin:6px 0 0 0;font-size:14px;line-height:28px;color:#666666;">
Support:
<a
href="mailto:hyperlink.bwl@gmail.com"
style="color:#ff5700;text-decoration:none;"
>
hyperlink.bwl@gmail.com
</a>
</p>

</td>
</tr>

</table>

<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="max-width:640px;width:100%;">
<tr>
<td align="center" style="padding:22px 20px 0 20px;font-size:12px;color:#9ca3af;line-height:22px;">
© ${new Date().getFullYear()} Hyperlink Technologies Pvt. Ltd.
</td>
</tr>
</table>

</td>
</tr>
</table>

</body>
</html>
`;
}

// module.exports = loginAlertTemplate;
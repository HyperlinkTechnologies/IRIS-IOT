/**
 * server/src/templates/contactForm.template.js
 * IRIS IoT Platform - Contact Form Notification Email
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

export default function welcomeTemplate({
  name = "",
}) {
  const safeName = escapeHtml(name);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to IRIS IoT Platform</title>
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
New Contact Form Submission
</h1>

<p style="margin:18px 0 0 0;font-size:15px;line-height:28px;color:#555555;">
Hello ${safeName},

Thank you for creating your IRIS IoT Platform account.

Your account has been successfully verified and is now ready to use.
</p>

</td>
</tr>

<tr>
<td style="padding:0 40px 10px 40px;">

<div style="padding:0 40px 20px 40px;">

<p style="font-size:15px;line-height:28px;color:#555555;">
You can now:
</p>

<ul style="font-size:15px;line-height:30px;color:#555555;padding-left:20px;">
<li>Connect and manage IoT devices</li>
<li>Create live dashboards</li>
<li>Monitor real-time telemetry</li>
<li>Configure alerts and notifications</li>
<li>Analyze historical device data</li>
</ul>

</div>

</td>
</tr>

<tr>
<td align="center" style="padding:20px 40px 30px;">

<a
href="https://iris-iot-react.netlify.app"
style="
display:inline-block;
background:#ff5700;
color:#ffffff;
text-decoration:none;
padding:14px 30px;
border-radius:8px;
font-size:15px;
font-weight:600;
">
Go to Dashboard
</a>

</td>
</tr>

<tr>
<td style="padding:20px 40px 36px 40px;">

<div style="height:1px;background:#eeeeee;margin-bottom:24px;"></div>

<p style="margin:0 0 10px 0;font-size:14px;color:#666666;line-height:24px;">
This email confirms that your <strong>IRIS IoT Platform</strong> account has been successfully activated.
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
Email:
<a
href="mailto:info@hyperlinktech.in"
style="color:#ff5700;text-decoration:none;"
>
info@hyperlinktech.in
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

// module.exports = contactFormTemplate;
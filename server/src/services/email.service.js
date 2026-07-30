import { SendEmailCommand } from "@aws-sdk/client-ses";
import { ses } from "../config/ses.js";
import loginAlertTemplate from "../templates/loginAlert.template.js";
import contactFormTemplate from "../templates/contactForm.template.js";
import welcomeTemplate from "../templates/welcome.template.js";

export async function sendEmail({ to, subject, html }) {
  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL,
    Destination: {
      ToAddresses: Array.isArray(to) ? to : [to],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: html,
          Charset: "UTF-8",
        },
      },
    },
  });

  return ses.send(command);
}

export async function sendLoginAlert({
  email,
  name,
  loginTime,
  device,
  browser,
  browserVersion,
  os,
}) {
  return sendEmail({
    to: email,
    subject: "New Login Detected - IRIS IoT Platform",
    html: loginAlertTemplate({
      name,
      loginTime,
      device,
      browser,
      browserVersion,
      os,
    }),
  });
}

export async function sendContactForm({
  fullName,
  mobile,
  email,
  companyName,
  productRequired,
  message,
}) {
  return sendEmail({
    to: process.env.SES_FROM_EMAIL,
    subject: `New Contact Request - ${companyName}`,
    html: contactFormTemplate({
      fullName,
      mobile,
      email,
      companyName,
      productRequired,
      message,
    }),
  });
}

export async function sendWelcomeEmail({
  email,
  name,
}) {
  const html = welcomeTemplate({
    name,
  });

  return sendEmail({
    to: email,
    subject: "Welcome to IRIS IoT Platform",
    html,
  });
}
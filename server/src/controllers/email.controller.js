import {
  sendLoginAlert,
  sendContactForm,
  sendWelcomeEmail,
} from "../services/email.service.js";

export async function loginAlert(req, res) {
  try {
    await sendLoginAlert(req.body);

    res.json({
      success: true,
      message: "Login alert sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send login alert",
    });
  }
}

export async function contactForm(req, res) {
  try {
    await sendContactForm(req.body);

    res.json({
      success: true,
      message: "Contact request sent",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send contact request",
    });
  }
}

export async function sendWelcomeEmailController(req, res) {
  try {
    if (
      req.headers["x-api-key"] !== process.env.LAMBDA_API_KEY
    ) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { email, name } = req.body;

    await sendWelcomeEmail({
      email,
      name,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send welcome email.",
    });
  }
}
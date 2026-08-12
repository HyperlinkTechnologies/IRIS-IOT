import * as paymentService from "../services/payment.service.js";
import * as billingService from "../services/billing.service.js";
export async function createOrder(req, res) {
  try {
    const userId = req.user.sub;
    const { planId } = req.body;

    if (!planId) {
      return res.status(400).json({
        success: false,
        message: "Plan ID is required.",
      });
    }

    const order = await paymentService.createOrder({
      userId,
      planId,
    });

    res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
} 

export async function verifyPayment(req, res) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment verification data is incomplete.",
      });
    }

    const payment =
      await paymentService.getPaymentByOrderId(
        razorpay_order_id
      );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment order not found.",
      });
    }

    if (payment.userId !== req.user.sub) {
      return res.status(403).json({
        success: false,
        message: "Payment does not belong to this user.",
      });
    }

    if (payment.status === "CAPTURED") {
      return res.json({
        success: true,
        message: "Payment already verified.",
      });
    }

    const valid =
      await paymentService.verifyPayment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature.",
      });
    }

    const razorpayPayment =
  await paymentService.getRazorpayPayment(
    razorpay_payment_id
  );

if (
  razorpayPayment.order_id !== razorpay_order_id
) {
  return res.status(400).json({
    success: false,
    message: "Payment order mismatch.",
  });
}

if (
  razorpayPayment.amount !== payment.amount
) {
  return res.status(400).json({
    success: false,
    message: "Payment amount mismatch.",
  });
}

if (razorpayPayment.status !== "captured") {
  return res.status(400).json({
    success: false,
    message: "Payment has not been captured.",
  });
}

    await paymentService.savePayment({
      ...payment,
      paymentId: razorpay_order_id,
      orderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "CAPTURED",
      verifiedAt: new Date().toISOString(),
    });

    await billingService.activateSubscription({
      userId: req.user.sub,
      planId: payment.planId,
      price: payment.amount / 100,
    });

    res.json({
      success: true,
      planId: payment.planId,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
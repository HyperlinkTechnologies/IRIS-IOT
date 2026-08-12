import { BILLING_PLANS } from "../config/billingPlans.js";
import * as billingService from "../services/billing.service.js";
import * as paymentRepository from "../repositories/payment.repository.js";
export const getPlans = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      plans: Object.values(BILLING_PLANS),
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getSubscription = async (req, res) => {
  try {
    const userId = req.user.sub;
    console.log(req.user.sub);

    const subscription =
      await billingService.getUserSubscription(userId);

    res.status(200).json({
      success: true,
      subscription,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBillingHistory = async (req, res) => {
  try {
    const userId = req.user.sub;

    const payments =
      await paymentRepository.getPaymentsByUserId(userId);

    res.status(200).json({
      success: true,
      payments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const cancelSubscription = async (req, res) => {
  try {
    const userId = req.user.sub;

    const subscription =
      await billingService.cancelSubscription(userId);

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully.",
      subscription,
    });
  } catch (err) {
    console.error("Cancel subscription error:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
import { BILLING_PLANS } from "../config/billingPlans.js";

export function getPlan(planId) {
  if (!planId) {
    throw new Error("Plan ID is required.");
  }

  const plan = BILLING_PLANS[planId.toLowerCase()];

  if (!plan) {
    throw new Error(`Unknown plan: ${planId}`);
  }

  return plan;
}

export function getPlanLimits(planId) {
  return getPlan(planId).limits;
}

export function getPlanFeatures(planId) {
  return getPlan(planId).features;
}

export function getPlanPrice(planId) {
  return getPlan(planId).price;
}
import * as billingRepository from "../repositories/billing.repository.js";
import { getPlanLimits } from "./plan.service.js";

export async function ensureSubscriptionActive(userId) {

  const subscription =
    await billingRepository.getSubscription(userId);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const plan =
  getPlanLimits(subscription.planId);

if (!plan) {
  throw new Error("Invalid plan");
}

if (plan.type === "free") {
  return subscription;
}

  const now = new Date();

  const renewalDate =
    new Date(subscription.nextRenewal);

  if (renewalDate > now) {
    return subscription;
  }

  const nextRenewal = new Date(now);

  nextRenewal.setMonth(
    nextRenewal.getMonth() + 1
  );

  const usage = {
  ...subscription.usage,
  messages: 0,
  apiCalls: 0,
  alerts: 0,
};

// TODO:
// When Razorpay is integrated,
// renew only after successful payment.
// Otherwise downgrade to Starter.

  await billingRepository.renewSubscription(
    userId,
    {
      startedAt: now.toISOString(),
      nextRenewal: nextRenewal.toISOString(),
      usage,
    }
  );

  return {
    ...subscription,
    startedAt: now.toISOString(),
    nextRenewal: nextRenewal.toISOString(),
    usage,
  };

}
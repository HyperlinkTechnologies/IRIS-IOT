import * as billingRepository from "../repositories/billing.repository.js";

export async function getUsage(userId) {

  const subscription =
    await billingRepository.getSubscription(userId);

  if (!subscription) {
    throw new Error("Subscription not found");
  }

  return subscription.usage || {
    devices: 0,
    dashboards: 0,
    alerts: 0,
    apiCalls: 0,
    messages: 0,
  };

}

export async function updateUsage(
  userId,
  usage
) {

  await billingRepository.updateUsage(
    userId,
    usage
  );

}

export async function incrementUsage(userId, feature) {

  const usage = await getUsage(userId);

  usage[feature] = (usage[feature] || 0) + 1;

  await billingRepository.updateUsage(
    userId,
    usage
  );

  return usage;

}

export async function resetMonthlyUsage(userId) {

  const usage = {

    devices: 0,

    dashboards: 0,

    alerts: 0,

    apiCalls: 0,

    messages: 0,

  };

  await billingRepository.updateUsage(
    userId,
    usage
  );

}
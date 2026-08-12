import * as billingRepository from "../repositories/billing.repository.js";
import * as deviceRepository from "../repositories/device.repository.js";
import * as dashboardRepository from "../repositories/dashboard.repository.js";
import { getPlanLimits } from "./plan.service.js";

export async function getUserSubscription(userId) {
  let subscription =
    await billingRepository.getSubscription(userId);

  if (subscription) {

  const devices =
    await deviceRepository.getDevices(userId);

  const dashboards =
    await dashboardRepository.getDashboards(userId);

    const limits = getPlanLimits(subscription.planId);

    await billingRepository.updateUsage(userId, {
  devices: devices.length,
  dashboards: dashboards.length,
});

  return {

    ...subscription,

    usage: {
  ...subscription.usage,
  devices: devices.length,
  maxDevices: limits.devices,
  dashboards: dashboards.length,
  maxDashboards: limits.dashboards,
  messages: subscription.usage?.messages || 0,
  maxMessages: limits.messages,
  retention: limits.retentionDays,
},

  };

}

  const now = new Date();

  const nextMonth = new Date(now);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  subscription = {
    userId,

    planId: "starter",

    status: "ACTIVE",

    billingCycle: "MONTHLY",

    currency: "INR",

    price: 0,

    autoRenewal: true,

    startedAt: now.toISOString(),

    nextRenewal: nextMonth.toISOString(),

    usage: {

  messages: 0,

  apiCalls: 0,

  alerts: 0,

},

    createdAt: now.toISOString(),

    updatedAt: now.toISOString(),
  };

  await billingRepository.createSubscription(subscription);

  return subscription;
}

export async function activateSubscription({
  userId,
  planId,
  price,
}) {

  const renewal = new Date();

  renewal.setMonth(renewal.getMonth() + 1);

  await billingRepository.updateSubscription(userId, {

    planId,

    status: "ACTIVE",

    billingCycle: "MONTHLY",

    price,

    nextRenewal: renewal.toISOString(),

  });

}

export async function cancelSubscription(userId) {
  const now = new Date();

  const nextRenewal = new Date(now);
  nextRenewal.setMonth(nextRenewal.getMonth() + 1);

  await billingRepository.updateSubscription(userId, {
    planId: "starter",
    status: "ACTIVE",
    billingCycle: "MONTHLY",
    currency: "INR",
    price: 0,
    autoRenewal: true,
    startedAt: now.toISOString(),
    nextRenewal: nextRenewal.toISOString(),
  });

  return await getUserSubscription(userId);
}
import * as billingRepository from "../repositories/billing.repository.js";
import * as deviceRepository from "../repositories/device.repository.js";
import * as dashboardRepository from "../repositories/dashboard.repository.js";
import { getPlanLimits } from "./plan.service.js";
import { ensureSubscriptionActive } from "./subscriptionRenewal.service.js";

async function getSubscriptionLimits(userId) {

  const subscription =
  await ensureSubscriptionActive(userId);

return {
  subscription,
  limits: getPlanLimits(subscription.planId),
};

}

export async function validateLimit(userId, feature, currentUsage) {
  const {
    subscription,
    limits,
  } = await getSubscriptionLimits(userId);

  const limit = limits[feature];

  if (limit === undefined) {
    throw new Error(`Unknown feature: ${feature}`);
  }

  return {
    allowed: limit === -1 || currentUsage < limit,
    used: currentUsage,
    limit,
    plan: subscription.planId,
    feature,
  };
}

export async function validateDeviceLimit(userId) {

  const devices =
    await deviceRepository.getDevices(userId);

  return validateLimit(
    userId,
    "devices",
    devices.length
  );

}

export async function reserveDeviceSlot(userId) {

  const validation =
    await validateDeviceLimit(userId);

  if (!validation.allowed) {

    const error = new Error("Device limit reached");

    error.name = "ConditionalCheckFailedException";

    error.plan = validation.plan;

    error.limit = validation.limit;

    throw error;
  }

  await billingRepository.reserveUsage(
    userId,
    "devices",
    validation.limit
  );

  return validation;

}

export async function reserveDashboardSlot(userId) {

  const validation =
    await validateDashboardLimit(userId);

  if (!validation.allowed) {

    const error = new Error("Dashboard limit reached");

    error.name = "ConditionalCheckFailedException";

    error.plan = validation.plan;

    error.limit = validation.limit;

    throw error;

  }

  await billingRepository.reserveUsage(
    userId,
    "dashboards",
    validation.limit
  );

  return validation;

}

export async function validateDashboardLimit(userId) {

  const dashboards =
    await dashboardRepository.getDashboards(userId);

  return validateLimit(
    userId,
    "dashboards",
    dashboards.length
  );

}

export async function reserveMessage(userId) {

  const subscription =
    await billingRepository.getSubscription(userId);

  const currentMessages =
    subscription?.usage?.messages || 0;

  const validation =
    await validateLimit(
      userId,
      "messages",
      currentMessages
    );

  if (!validation.allowed) {

    const error = new Error("Message limit reached");

    error.name = "ConditionalCheckFailedException";

    error.plan = validation.plan;

    error.limit = validation.limit;

    throw error;

  }

  await billingRepository.reserveUsage(
    userId,
    "messages",
    validation.limit
  );

}
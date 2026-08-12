import request from "./api";

class BillingService {
  async getPlans() {
    const data = await request("/billing/plans");
    return data.plans;
  }

  async getSubscription() {
    const data = await request("/billing/subscription");
    return data.subscription;
  }

  async getBillingHistory() {
    const data = await request("/billing/history");
    return data.payments;
  }

  async cancelSubscription() {
    const data = await request("/billing/cancel", {
      method: "POST",
    });

    return data.subscription;
  }
}

export default new BillingService();
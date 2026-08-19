export const BILLING_PLANS = {
  starter: {
    id: "starter",

    name: "Get Started",

    price: {
      amount: 0,
      currency: "INR",
      interval: "monthly",
    },

    limits: {
      devices: 2,
      dashboards: 1,
      messages: 1000,
      storageGB: 1,
      retentionDays: 7,
      users: 1,
    },

    features: {
      analytics: true,
      alerts: true,
      api: false,
      exports: false,
      whiteLabel: false,
    },

    razorpay: {
      planId: null,
    },
  },

  prototype: {
    id: "prototype",

    name: "Prototype/POC",

    price: {
      amount: 2970,
      currency: "INR",
      interval: "monthly",
    },

    limits: {
      devices: 10,
      dashboards: 10,
      messages: 2000000,
      storageGB: 5,
      retentionDays: 30,
      users: 5,
    },

    features: {
      analytics: true,
      alerts: true,
      api: true,
      exports: true,
      whiteLabel: false,
    },

    razorpay: {
      planId: null,
    },
  },

  industrial: {
    id: "industrial",

    name: "Industrial",

    price: {
      amount: 4970,
      currency: "INR",
      interval: "monthly",
    },

    limits: {
      devices: 30,
      dashboards: -1,
      messages: 5000000,
      storageGB: 20,
      retentionDays: 180,
      users: 20,
    },

    features: {
      analytics: true,
      alerts: true,
      api: true,
      exports: true,
      whiteLabel: false,
    },

    razorpay: {
      planId: null,
    },
  },

  custom: {
    id: "custom",

    name: "Custom",

    price: {
      amount: null,
      currency: "INR",
      interval: "custom",
    },

    limits: {
      devices: -1,
      dashboards: -1,
      messages: -1,
      storageGB: -1,
      retentionDays: 365,
      users: -1,
    },

    features: {
      analytics: true,
      alerts: true,
      api: true,
      exports: true,
      whiteLabel: true,
    },

    razorpay: {
      planId: null,
    },
  },
};
export const PLAN_LIMITS = {
  starter: {
    type: "free",
    renewal: "none",

    devices: 2,
    dashboards: 1,
    messages: 5,
    retentionDays: 7,
  },

  prototype: {
    type: "paid",
    renewal: "monthly",

    devices: 10,
    dashboards: Number.MAX_SAFE_INTEGER,
    messages: 2_000_000,
    retentionDays: 30,
  },

  industrial: {
    type: "paid",
    renewal: "monthly",

    devices: 30,
    dashboards: Number.MAX_SAFE_INTEGER,
    messages: 5_000_000,
    retentionDays: 180,
  },

  custom: {
    type: "paid",
    renewal: "monthly",

    devices: 100,
    dashboards: Number.MAX_SAFE_INTEGER,
    messages: 20_000_000,
    retentionDays: 365,
  },
};
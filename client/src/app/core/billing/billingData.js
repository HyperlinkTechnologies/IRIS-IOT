import { BadgeDollarSign, BarChart3, CreditCard, ReceiptText, Wallet } from "lucide-react";

export const plans = [
  {
    title: "Get Started",

    price: "₹0",

    description: "Perfect for testing and evaluation",

    buttonText: "Get Started Free",

    features: [
      "2 Devices",

      "100,000 Messages",

      "7 Days Data Retention",

      "Single Dashboard",
    ],
  },

  {
    title: "Prototype/POC",

    price: "₹2,790",

    description: "Ideal for proof of concept projects",

    buttonText: "Upgrade",

    features: [
      "10 Devices",

      "2 Million Messages",

      "1 Month Data Retention",

      "Multiple Dashboards",
    ],
  },

  {
    title: "Industrial",

    price: "₹4,970",

    description: "Built for industrial deployments",

    buttonText: "Current Plan",

    current: true,

    highlighted: true,

    features: [
      "30 Devices",

      "5 Million Messages",

      "6 Month Data Retention",

      "Multiple Dashboards",
    ],
  },

  {
    title: "Custom",

    price: "Contact Us",

    description: "Enterprise solutions",

    buttonText: "Contact Sales",

    features: [
      "50+ Devices",

      "Custom Message Limits",

      "Custom Retention",

      "Dedicated Support",
    ],
  },
];

export const billingActions = [

  {
    id: "subscription",
    title: "Current Subscription",
    desc: "View your active plan, renewal details and billing cycle.",
    icon: Wallet,
  },

  {
    id: "usage",
    title: "Usage & Limits",
    desc: "Monitor current resource usage and subscription limits.",
    icon: BarChart3,
  },

  {
    id: "plans",
    title: "Available Plans",
    desc: "Compare plans and upgrade your subscription.",
    icon: BadgeDollarSign,
  },

  {
    id: "history",
    title: "Billing History",
    desc: "View invoices and payment history.",
    icon: ReceiptText,
  },

  {
    id: "payment",
    title: "Payment Methods",
    desc: "Manage saved payment methods. (Coming Soon)",
    icon: CreditCard,
  },

];

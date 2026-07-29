import {
  CreditCard,
  Calendar,
  BadgeCheck,
  Wallet,
  BarChart3,
  BadgeDollarSign,
  ReceiptText,
  ChevronRight,
} from "lucide-react";

import { useEffect, useState } from "react";

import billingStore from "../../core/billing/billingStore";
import BillingActionCard from "../../components/Billing/BillingActionCard";
import { plans, billingActions } from "../../core/billing/billingData";
import {
  UsageModal,
  PlansModal,
  BillingHistoryModal,
  PaymentMethodsModal,
} from "../../components/Billing/billingModals";

export default function BillingPage() {
  const [billing, setBilling] = useState(billingStore.get());

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    const updateBilling = () => {
      setBilling(billingStore.get());
    };

    window.addEventListener("billingUpdated", updateBilling);

    return () => window.removeEventListener("billingUpdated", updateBilling);
  }, []);

  return (
    <div className="w-full">
      {/* ================= HEADER ================= */}

      <div className="mb-8">
        <h2
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-[#010c29]
          "
        >
          Billing Overview
        </h2>

        <p
          className="
            text-gray-400
            mt-2
            text-sm
            sm:text-base
          "
        >
          Manage subscription and payments
        </p>
      </div>

      {/* ================= CURRENT SUBSCRIPTION ================= */}

      <div
        className="
    mt-8
    rounded-3xl
    border
    border-black/10
    bg-white
    shadow-sm
    p-8
  "
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Left */}

          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>

              <span className="font-semibold text-green-600">
                Active Subscription
              </span>
            </div>

            <h3 className="text-3xl font-bold text-[#010c29]">
              {billing.currentPlan}
            </h3>

            <p className="text-gray-500 mt-2">
              Manage your current subscription and billing.
            </p>

            <div className="grid grid-cols-2 gap-x-10 gap-y-5 mt-8">
              <div>
                <p className="text-sm text-gray-400">Billing Cycle</p>
                <p className="font-semibold">Monthly</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Renewal Date</p>
                <p className="font-semibold">{billing.nextRenewal}</p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Price</p>
                <p className="font-semibold">
                  {billing.currency}
                  {billing.lastPayment}
                  /month
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Valid From</p>
                <p className="font-semibold">{billing.validFrom}</p>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col gap-4">
            <button
              onClick={() => setActiveModal("plans")}
              className="
          bg-[#ff5700]
          hover:bg-[#e64d00]
          text-white
          px-8
          py-3
          rounded-xl
          font-semibold
          transition
          cursor-pointer
        "
            >
              Upgrade Plan
            </button>

            <button
              className="
          border
          border-red-200
          text-red-500
          hover:bg-red-50
          px-8
          py-3
          rounded-xl
          font-semibold
          transition
          cursor-pointer
        "
            >
              Cancel Subscription
            </button>
          </div>
        </div>
      </div>

      {/* ================= MANAGE BILLING ================= */}

      <div className="mt-10">
        <h3
          className="
      text-2xl
      sm:text-3xl
      font-bold
      text-[#010c29]
      mb-2
    "
        >
          Billing Services
        </h3>

        <p
          className="
      text-gray-500
      mb-8
    "
        >
          Manage your subscription, billing history and payment information.
        </p>

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >
          {billingActions.map((action) => (
            <BillingActionCard
              key={action.id}
              action={action}
              onClick={() => setActiveModal(action.id)}
            />
          ))}
        </div>
      </div>

      {/* ================= USAGE & LIMITS ================= */}

      <UsageModal
        billing={billing}
        open={activeModal === "usage"}
        onClose={() => setActiveModal(null)}
      />

      {/* ==========PRICING PLANS=========== */}

      <PlansModal
        plans={plans}
        billing={billing}
        open={activeModal === "plans"}
        onClose={() => setActiveModal(null)}
      />

      {/* ================= BILLING HISTORY ================= */}

      <BillingHistoryModal
        open={activeModal === "history"}
        onClose={() => setActiveModal(null)}
      />

      {/* ================= PAYMENT METHOD ================= */}

      <PaymentMethodsModal
        open={activeModal === "payment"}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
}

/* ================= BILLING CARD ================= */

function BillingCard({ icon, title, value }) {
  return (
    <div
      className="
        bg-black/5

        border
        border-black/10

        shadow-md

        rounded-3xl

        p-5
        sm:p-6

        hover:shadow-lg
        hover:border-[#ff5700]/20

        transition-all
        duration-300
      "
    >
      {/* Icon */}
      <div
        className="
          w-12
          h-12

          rounded-xl

          bg-orange-500/10

          flex
          items-center
          justify-center

          text-orange-500

          mb-5

          border
          border-orange-500/10
        "
      >
        {icon}
      </div>

      {/* Title */}
      <p
        className="
          text-gray-400

          text-sm
          sm:text-base

          mb-2
        "
      >
        {title}
      </p>

      {/* Value */}
      <h3
        className="
          text-2xl
          sm:text-3xl

          font-bold

          text-[#010c29]

          wrap-break-word
        "
      >
        {value}
      </h3>
    </div>
  );
}

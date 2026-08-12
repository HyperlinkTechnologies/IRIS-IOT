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

import BillingActionCard from "../../components/Billing/BillingActionCard";
import { billingActions } from "../../core/billing/billingData";
import billingService from "../../services/billingService";
import { useBilling } from "../../../context/BillingContext";
import {
  UsageModal,
  BillingHistoryModal,
} from "../../components/Billing/billingModals";

function formatRenewalDate(date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BillingPage() {
  const [activeModal, setActiveModal] = useState(null);
const [showCancelModal, setShowCancelModal] = useState(false);
const [cancelling, setCancelling] = useState(false);
  const { billing, plans, loading, openPlansModal } = useBilling();

  const handleCancelSubscription = async () => {
  try {
    setCancelling(true);

    await billingService.cancelSubscription();

    setShowCancelModal(false);
  } catch (error) {
    console.error("Failed to cancel subscription:", error);
    alert("Failed to cancel subscription. Please try again.");
  } finally {
    setCancelling(false);
  }
};

if (loading) {
  return (
    <div className="p-8 text-gray-500">
      Loading billing...
    </div>
  );
}

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
    <p className="text-sm text-gray-400">Current Plan</p>
    <p className="font-semibold">
      {plans.find((plan) => plan.id === billing.planId)?.name || "Get Started"}
    </p>
  </div>

  <div>
    <p className="text-sm text-gray-400">Renewal Date</p>
    <p className="font-semibold">
      {formatRenewalDate(billing.nextRenewal)}
    </p>
  </div>

  <div>
    <p className="text-sm text-gray-400">Price</p>
    <p className="font-semibold">
      ₹{Number(billing.price || 0).toLocaleString("en-IN")}/month
    </p>
  </div>

  <div>
    <p className="text-sm text-gray-400">Billing Cycle</p>
    <p className="font-semibold">
      {billing.billingCycle === "MONTHLY" ? "Monthly" : billing.billingCycle}
    </p>
  </div>
</div>
          </div>

          {/* Right */}

          <div className="flex flex-col gap-4">
            <button
              onClick={openPlansModal}
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
            onClick={() => setShowCancelModal(true)}
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
          md:grid-cols-3
          gap-6
          "
        >
          {billingActions.map((action) => (
            <BillingActionCard
              key={action.id}
              action={action}
              onClick={() => {
  if (action.id === "plans") {
    openPlansModal();
    return;
  }

  setActiveModal(action.id);
}}
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

      {/* ================= BILLING HISTORY ================= */}

      <BillingHistoryModal
        open={activeModal === "history"}
        onClose={() => setActiveModal(null)}
      />

      {showCancelModal && (
  <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
      <h3 className="text-xl font-bold text-[#010c29]">
        Cancel Subscription?
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-500">
        Your subscription will be switched to the Starter plan.
        Your Starter plan limits will apply immediately.
      </p>

      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => setShowCancelModal(false)}
          disabled={cancelling}
          className="w-full rounded-xl border border-gray-200 px-5 py-2.5 font-semibold text-gray-600 hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleCancelSubscription}
          disabled={cancelling}
          className="w-full rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white hover:bg-red-600 disabled:opacity-50 cursor-pointer"
        >
          {cancelling ? "Cancelling..." : "Confirm"}
        </button>
      </div>
    </div>
  </div>
)}

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

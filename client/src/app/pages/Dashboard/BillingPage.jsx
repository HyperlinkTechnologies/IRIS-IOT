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
import BillingActionCard from "../../components/Dashboard/BillingActionCard";
import { plans, billingActions } from "../../core/billing/billingData";
import { SubscriptionModal, UsageModal, PlansModal } from "../../components/Dashboard/billingModals";

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

      {/* ================= CARDS ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          sm:gap-6
        "
      >
        <BillingCard
          icon={<Wallet />}
          title="Current Plan"
          value={billing.currentPlan}
        />

        <BillingCard
          icon={<CreditCard />}
          title="Last Payment"
          value={`${billing.currency}${billing.lastPayment}`}
        />

        <BillingCard
          icon={<Calendar />}
          title="Next Due"
          value={billing.nextRenewal}
        />

        <BillingCard
          icon={<BadgeCheck />}
          title="Valid Till"
          value={billing.validTill}
        />
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

    {billingActions.map(action => (

  <BillingActionCard

    key={action.id}

    action={action}

    onClick={() =>
      setActiveModal(action.id)
    }

  />

))}

  </div>

</div>

{/* ================= CURRENT SUBSCRIPTION ================= */}

<SubscriptionModal

  billing={billing}

  open={activeModal === "subscription"}

  onClose={() => setActiveModal(null)}

/>

{/* ================= USAGE & LIMITS ================= */}

<UsageModal

  billing={billing}

  open={activeModal === "usage"}

  onClose={() => setActiveModal(null)}

/>

<PlansModal

  plans={plans}

  open={activeModal === "plans"}

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

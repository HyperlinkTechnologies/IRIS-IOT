import BillingModal from "./BillingModal";
import UsageProgress from "./UsageProgress";
import PricingCard from "./PricingCard";



// ===============SUBSCRIPTION MODAL==================

export function SubscriptionModal({

  billing,

  open,

  onClose,

}) {

  if (!open) return null;

  return (

    <BillingModal
      title="Current Subscription"
      onClose={onClose}
    >

      <InfoRow
        label="Plan"
        value={billing.currentPlan}
      />

      <InfoRow
        label="Status"
        value={billing.status}
      />

      <InfoRow
        label="Billing Cycle"
        value={billing.billingCycle}
      />

      <InfoRow
        label="Renewal Date"
        value={billing.nextRenewal}
      />

      <InfoRow
        label="Price"
        value={`${billing.currency}${billing.price.toLocaleString()} / Month`}
      />

      <InfoRow
        label="Auto Renewal"
        value={
          billing.autoRenewal
            ? "Enabled"
            : "Disabled"
        }
      />

      <button
        className="
          mt-8
          w-full
          py-3
          rounded-xl
          bg-[#ff5700]
          text-white
          font-medium
          hover:opacity-90
        "
      >

        Upgrade Plan

      </button>

    </BillingModal>

  );

}

// ===========================USAGE PROGRESS=========================
export function UsageModal({

  billing,

  open,

  onClose,

}) {

  if (!open) return null;

  return (

    <BillingModal
      title="Usage & Limits"
      onClose={onClose}
    >

      <UsageProgress
        title="Devices"
        value={billing.usage.devices}
        max={billing.usage.maxDevices}
      />

      <UsageProgress
        title="Messages"
        value={billing.usage.messages}
        max={billing.usage.maxMessages}
      />

      <UsageProgress
        title="Storage"
        value={billing.usage.storage}
        max={billing.usage.maxStorage}
        suffix=" GB"
      />

      <InfoRow
        label="Data Retention"
        value={billing.usage.retention}
      />

    </BillingModal>

  );

}

// ==============PLANS MODAL================
export function PlansModal({

  plans,

  open,

  onClose,

}) {

  if (!open) return null;

  return (

    <BillingModal
      title="Available Plans"
      onClose={onClose}
    >

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          max-h-[70vh]
          overflow-y-auto
          pr-2
        "
      >

        {plans.map(plan => (

          <PricingCard

            key={plan.title}

            {...plan}

          />

        ))}

      </div>

    </BillingModal>

  );

}

function InfoRow({
  label,
  value,
}) {
  return (
    <div
      className="
        flex
        justify-between
        items-center
        border
        border-black/10
        rounded-xl
        px-5
        py-4
      "
    >
      <span
        className="
          text-gray-500
          font-medium
        "
      >
        {label}
      </span>

      <span
        className="
          font-semibold
          text-[#010c29]
        "
      >
        {value}
      </span>
    </div>
  );
}

import BillingModal from "./BillingModal";
import UsageProgress from "./UsageProgress";
import PricingCard from "./PricingCard";

import { Download, CreditCard, Landmark, ShieldCheck } from "lucide-react";

// ===========================USAGE PROGRESS=========================
export function UsageModal({
  billing,

  open,

  onClose,
}) {
  if (!open) return null;

  return (
    <BillingModal title="Usage & Limits" onClose={onClose}>
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

      <InfoRow label="Data Retention" value={billing.usage.retention} />
    </BillingModal>
  );
}

// ==============PLANS MODAL================
export function PlansModal({
  plans,
  billing,

  open,

  onClose,
}) {
  if (!open) return null;

  return (
    <BillingModal title="Plans & Pricing" onClose={onClose}>
      <div
        className="
        
    grid
    grid-cols-4
    gap-4
  "
      >
        {plans.map((plan) => (
          <PricingCard
            key={plan.title}
            {...plan}
            current={plan.title === billing.currentPlan}
          />
        ))}
      </div>
    </BillingModal>
  );
}

// ========BILLING HISTORY MODAL==========
export function BillingHistoryModal({
  open,

  onClose,
}) {
  if (!open) return null;

  const invoices = [
    {
      id: "INV-1008",
      date: "15 Jul 2026",
      plan: "Industrial",
      amount: "₹4,970",
      status: "Paid",
    },

    {
      id: "INV-1007",
      date: "15 Jun 2026",
      plan: "Industrial",
      amount: "₹4,970",
      status: "Paid",
    },

    {
      id: "INV-1006",
      date: "15 May 2026",
      plan: "Industrial",
      amount: "₹4,970",
      status: "Paid",
    },
  ];

  return (
    <BillingModal title="Billing History" onClose={onClose}>
      {/* Subtitle */}

      <p
        className="
        text-gray-500
        mb-8
      "
      >
        View and download your previous invoices.
      </p>

      <div
        className="
    border
    border-black/10
    rounded-2xl
    overflow-hidden
  "
      >
        {/* Header */}

        <div
          className="
      grid
      grid-cols-6

      bg-gray-50

      px-6
      py-4

      text-sm
      font-semibold
      text-gray-500
    "
        >
          <div>Invoice</div>

          <div>Date</div>

          <div>Plan</div>

          <div>Amount</div>

          <div>Status</div>

          <div className="flex justify-end px-3">Download</div>
        </div>

        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="
        grid
        grid-cols-6

        items-center

        px-6
        py-5

        border-t
        border-black/10

        hover:bg-gray-50

        transition
      "
          >
            <div className="font-semibold">{invoice.id}</div>

            <div>{invoice.date}</div>

            <div>{invoice.plan}</div>

            <div className="font-semibold">{invoice.amount}</div>

            <div>
              <span
                className="
            px-3
            py-1

            rounded-full

            bg-green-100

            text-green-700

            text-xs

            font-medium
          "
              >
                {invoice.status}
              </span>
            </div>

            <div className="flex justify-end">
              <button
                className="
            flex
            items-center
            gap-2

            px-3
            py-2

            rounded-full

            text-[#ff5700]

            hover:bg-orange-100

            transition
            cursor-pointer
          "
              >
                <Download size={18} />

                <span className="font-medium">Invoice</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </BillingModal>
  );
}

// ==================PAYMENT METHODS MODAL====================
export function PaymentMethodsModal({
  open,

  onClose,
}) {
  if (!open) return null;

  return (
    <BillingModal title="Payment Methods" onClose={onClose}>
      <div className="max-w-2xl mx-auto">
        {/* Empty State */}

        <div className="text-center">
          <div
            className="
        w-24
        h-24

        mx-auto

        rounded-full

        bg-orange-100

        flex
        items-center
        justify-center

        mb-6
      "
          >
            <CreditCard size={42} className="text-[#ff5700]" />
          </div>

          <h3
            className="
        text-3xl
        font-bold
        text-[#010c29]
      "
          >
            No Saved Payment Methods
          </h3>

          <p
            className="
        text-gray-500

        mt-4
        mb-10
      "
          >
            Add a payment method to enable automatic subscription renewals and
            faster checkout.
          </p>
        </div>

        {/* Button */}

        <button
          disabled
          className="
      w-full

      py-4
      mb-4
      rounded-xl

      bg-gray-200

      text-gray-500

      font-semibold

      cursor-not-allowed
    "
        >
          Add Payment Method
          <span className="ml-2">(Coming Soon)</span>
        </button>

        {/* Supported Methods */}

        <div
          className="
      border
      border-black/10
      rounded-2xl
      p-6
      mb-6
    "
        >
          <h4
            className="
        font-semibold
        text-lg
        mb-5
      "
          >
            Supported Payment Methods
          </h4>

          <div className="grid grid-cols-2 gap-4">
            <MethodCard label="Visa" />

            <MethodCard label="MasterCard" />

            <MethodCard label="RuPay" />

            <MethodCard label="UPI" bank />
          </div>
        </div>

        {/* Auto Renewal */}

        <div
          className="
      border
      border-black/10
      rounded-2xl
      p-6
      mb-8
    "
        >
          <div
            className="
        flex
        justify-between
        items-center
      "
          >
            <div>
              <h4 className="font-semibold">Automatic Renewal</h4>

              <p
                className="
            text-gray-500
            text-sm
            mt-1
          "
              >
                Available after adding a payment method.
              </p>
            </div>

            <div
              className="
          flex
          items-center
          gap-2

          text-gray-400
        "
            >
              <ShieldCheck size={18} />
              Disabled
            </div>
          </div>
        </div>
      </div>
    </BillingModal>
  );
}
// ======================================

function InfoRow({ label, value }) {
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

function MethodCard({
  label,

  bank = false,
}) {
  return (
    <div
      className="
        border
        border-black/10

        rounded-xl

        p-4

        flex
        items-center

        gap-3
      "
    >
      {bank ? (
        <Landmark size={22} className="text-[#ff5700]" />
      ) : (
        <CreditCard size={22} className="text-[#ff5700]" />
      )}

      <span className="font-medium">{label}</span>
    </div>
  );
}

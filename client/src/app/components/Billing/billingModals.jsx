import BillingModal from "./BillingModal";
import UsageProgress from "./UsageProgress";
import PricingCard from "./PricingCard";
import { useEffect, useState } from "react";
import { Download, CreditCard, Landmark, ShieldCheck } from "lucide-react";
import { useUser } from "../../../context/UserContext";
import { generateInvoicePdf } from "../../../utils/generateInvoicePdf";
import loadRazorpay from "../../../utils/loadRazorpay";
import billingService from "../../services/billingService";
import { startRazorpayPayment } from "../../services/razorpay.service";

import {
  createOrder,
  verifyPayment,
} from "../../services/payment.service";

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
        title="Dashboards"
        value={billing.usage.dashboards}
        max={billing.usage.maxDashboards}
      />

      <UsageProgress
        title="Messages"
        value={billing.usage.messages}
        max={billing.usage.maxMessages}
      />

      <InfoRow
        label="Data Retention"
        value={`${billing.usage.retention} days`}
      />
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

  const handleUpgrade = async (plan) => {

  const loaded = await loadRazorpay();

  if (!loaded) {
    alert("Unable to load Razorpay.");
    return;
  }

  const response = await createOrder(plan);

  const options = {

    key: response.key,

    amount: response.order.amount,

    currency: response.order.currency,

    name: "IRIS IoT Platform",

    description: plan.name,

    order_id: response.order.id,

    handler: async function (payment) {

      await verifyPayment({

        ...payment,

        planId: plan.id,

        amount: response.order.amount,

      });

      alert("Payment Successful");

      onClose();

      window.location.reload();

    },

    theme: {
      color: "#ff5700",
    },

  };

  const razorpay = new window.Razorpay(options);

  razorpay.open();

};

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
    key={plan.id}
    {...plan}
    current={billing?.planId === plan.id}
    onUpgrade={async () => {
      try {
        await startRazorpayPayment(plan);
        window.location.reload();
      } catch (error) {
        console.error("Payment failed:", error);
      }
    }}
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
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!open) return;

    async function loadBillingHistory() {
      try {
        setLoading(true);

        const payments = await billingService.getBillingHistory();

        const sortedPayments = [...payments].sort(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
);

setInvoices(sortedPayments);
      } catch (error) {
        console.error("Failed to load billing history:", error);
        setInvoices([]);
      } finally {
        setLoading(false);
      }
    }

    loadBillingHistory();
  }, [open]);

  if (!open) return null;

  const handleDownloadInvoice = async (invoice) => {
  if (invoice.status !== "CAPTURED") return;

  await generateInvoicePdf(invoice, {
    name: user?.fullName,
    email: user?.email,
    id: user?.userId,
  });
};

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
      grid-cols-[1.5fr_1fr_1.2fr_1fr_1fr_1fr]

      bg-gray-50

      px-6
      py-4

      text-sm
      font-semibold
      text-gray-500
    "
        >
          <div>Order ID</div>

          <div>Date</div>

          <div>Plan</div>

          <div>Amount</div>

          <div>Status</div>

          <div className="flex justify-end px-3">Download</div>
        </div>

        {loading ? (
  <div className="px-6 py-8 text-center text-gray-500">
    Loading billing history...
  </div>
) : invoices.length === 0 ? (
  <div className="px-6 py-8 text-center text-gray-500">
    No billing history available.
  </div>
) : (
  invoices.map((invoice) => (
          <div
            key={invoice.paymentId}
            className="
        grid
        grid-cols-[1.5fr_1fr_1.2fr_1fr_1fr_1fr]

        items-center

        px-6
        py-5

        border-t
        border-black/10

        hover:bg-gray-50

        transition
      "
          >
            <div
  className="font-semibold text-sm truncate"
  title={invoice.irisOrderId}
>
  {invoice.irisOrderId}
</div>

<div>
  {new Date(invoice.createdAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}
</div>

<div>
  {invoice.planId === "starter"
    ? "Get Started"
    : invoice.planId === "prototype"
      ? "Prototype/POC"
      : invoice.planId === "industrial"
        ? "Industrial"
        : invoice.planId}
</div>

<div className="font-semibold">
  ₹{(invoice.amount / 100).toLocaleString("en-IN")}
</div>

            <div>
              <span
  className={`
    px-3
    py-1
    rounded-full
    text-xs
    font-medium
    ${
      invoice.status === "CAPTURED"
  ? "bg-green-100 text-green-700"
  : "bg-red-100 text-red-700"
    }
  `}
>
 {invoice.status === "CAPTURED" ? "Paid" : "Failed"}
</span>
            </div>

            <div className="flex justify-end">
  {invoice.status === "CAPTURED" && (
    <button
    onClick={() => handleDownloadInvoice(invoice)}
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
  )}
</div>
          </div>
                ))
      )}
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

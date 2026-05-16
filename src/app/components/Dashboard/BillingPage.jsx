import {
  CreditCard,
  Calendar,
  BadgeCheck,
  Wallet
} from "lucide-react";

export default function BillingPage() {

  return (

    <div>

      {/* Header */}
      <div className="mb-8">

        <h2 className="text-3xl font-bold">
          Billing Overview
        </h2>

        <p className="text-gray-400 mt-1">
          Manage subscription and payments
        </p>

      </div>

      {/* Cards */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <BillingCard
          icon={<Wallet />}
          title="Current Plan"
          value="Industrial"
        />

        <BillingCard
          icon={<CreditCard />}
          title="Last Payment"
          value="$499"
        />

        <BillingCard
          icon={<Calendar />}
          title="Next Due"
          value="12 Sep 2026"
        />

        <BillingCard
          icon={<BadgeCheck />}
          title="Valid Till"
          value="1 Year"
        />

      </div>

      {/* Subscription Box */}
      <div className="
        mt-8
        bg-[#071633]
        border
        border-white/10
        rounded-3xl
        p-8
      ">

        <div className="
          flex
          flex-col
          lg:flex-row
          lg:items-center
          lg:justify-between
          gap-6
        ">

          <div>

            <h3 className="text-2xl font-bold mb-2">
              Industrial Plan
            </h3>

            <p className="text-gray-400">
              Access all premium IoT platform features
            </p>

          </div>

          <button
            className="
              px-8
              py-4
              rounded-2xl
              bg-linear-to-r
              from-[#d84800]
              to-[#ff5700]
              hover:opacity-90
              font-medium
            "
          >
            Upgrade Plan
          </button>

        </div>

      </div>

    </div>
  );
}

function BillingCard({
  icon,
  title,
  value
}) {

  return (

    <div className="
      bg-[#071633]
      border
      border-white/10
      rounded-3xl
      p-6
    ">

      <div className="
        text-[#ff5700]
        mb-4
      ">
        {icon}
      </div>

      <p className="text-gray-400 mb-2">
        {title}
      </p>

      <h3 className="text-2xl font-bold">
        {value}
      </h3>

    </div>
  );
}
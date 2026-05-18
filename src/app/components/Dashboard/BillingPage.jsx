import {
  CreditCard,
  Calendar,
  BadgeCheck,
  Wallet
} from "lucide-react";

export default function BillingPage() {

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

      {/* ================= SUBSCRIPTION BOX ================= */}

      <div
        className="
          mt-8

          bg-black/5

          border
          border-black/10

          shadow-md

          rounded-3xl

          p-5
          sm:p-6
          lg:p-8

          hover:shadow-lg

          transition-all
          duration-300
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row

            lg:items-center
            lg:justify-between

            gap-6
          "
        >

          {/* Left */}
          <div>

            <h3
              className="
                text-2xl
                sm:text-3xl
                font-bold
                mb-3
                text-[#010c29]
              "
            >
              Industrial Plan
            </h3>

            <p
              className="
                text-gray-400
                text-sm
                sm:text-base
                leading-relaxed
                max-w-125
              "
            >
              Access all premium IoT platform features
              including device analytics, alerts,
              monitoring, API access and cloud storage.
            </p>

          </div>

          {/* Button */}
          <button
            className="
              w-full
              sm:w-auto

              px-6
              sm:px-8

              py-3
              sm:py-4

              rounded-2xl

              bg-linear-to-r
              from-[#d84800]
              to-[#ff5700]

              text-white

              cursor-pointer

              hover:opacity-90
              hover:scale-[1.02]

              transition-all
              duration-300

              font-medium

              shadow-lg
            "
          >
            Upgrade Plan
          </button>

        </div>

      </div>

    </div>
  );
}

/* ================= BILLING CARD ================= */

function BillingCard({
  icon,
  title,
  value
}) {

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
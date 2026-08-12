export default function PricingCard({
  id,
  name,
  price,
  limits,
  features,
  current = false,
  highlighted = false,
  onUpgrade,
}) {
  const featureList = Object.entries(features || {})
    .filter(([, enabled]) => enabled)
    .map(([name]) => name);

  return (
    <div
      className={`
    relative

    w-full

    rounded-3xl
    border

    overflow-hidden

    transition-all
    duration-300

    hover:scale-[1.02]

    ${highlighted ? "border-[#ff5700]/70 shadow-xl" : "border-black/20 shadow-md"}
  `}
    >
      {/* Current Plan Badge */}

      {current && (
  <div className="absolute left-1/2 -translate-x-1/2 top-12.5 z-20">
    <span className="rounded-full bg-[#FFE8D8] border-[#ff5700]/20 border px-5 py-2 text-xs font-semibold text-[#ff5700] shadow-sm">
      Current Plan
    </span>
  </div>
)}

{highlighted && (
  <div className="absolute left-1/2 -translate-x-1/2 top-12.5 z-20">
    <span className="rounded-full bg-[#ff5700] px-3 py-1 text-xs font-semibold text-white shadow-lg z-20">
      Most Popular
    </span>
  </div>
)}

      {/* Header */}

      <div
        className="
          bg-[#010c29]

          text-white

          py-4

          text-center
        "
      >
        <h3 className="text-xl font-bold">{name ?? title}</h3>
      </div>

      {/* Body */}

      <div className="p-5">
        <div className="mt-4 mb-4 text-center">

  {id === "custom" ? (
    <h2 className="text-[30px] font-extrabold text-[#ff5700]">
      Contact Us
    </h2>
  ) : (
    <div className="flex items-end justify-center gap-2">

      <span className="text-2xl font-bold text-[#ff5700]">
        ₹
      </span>

      <span className="text-[45px] font-extrabold leading-none text-[#08153A]">
        {price.amount.toLocaleString()}
      </span>

      <span className=" text-[18px] text-gray-700">
        /Month
      </span>

    </div>
  )}

</div>

<div className="mx-4 mb-4 border-t border-gray-200"></div>

        <div className="mb-8 space-y-4 px-4 text-[16px] text-[#4B5563]">

  <p>
    {id === "custom"
      ? "50-100+ Devices"
      : `${limits.devices} Devices`}
  </p>

  <p>
    {id === "starter"
      ? "1000 Messages"
      : id === "prototype"
      ? "2 Million Messages"
      : id === "industrial"
      ? "5 Million Messages"
      : "20 Million+ Messages"}
  </p>

  <p>
    {id === "starter"
      ? "1 Week Data Retention"
      : id === "prototype"
      ? "1 Month Data Retention"
      : id === "industrial"
      ? "6 Month Data Retention"
      : "6 Month to 1 Year Data Retention"}
  </p>

  <p>
    {id === "starter"
      ? "Single Dashboard"
      : "Multiple Dashboards"}
  </p>

</div>


        <button
        disabled={current}
  onClick={() => {
    if (current) return;

    if (id === "custom") {
      // We'll implement Contact Sales later.
      return;
    }

    onUpgrade?.();
  }}
  className={`mt-auto h-14 w-full rounded-2xl text-lg font-semibold transition-all ${
    current
      ? "bg-gray-200 text-gray-600 cursor-default"
      : "bg-[#ff5700] text-white hover:bg-[#e74f00] cursor-pointer"
  }`}
>
  {current
    ? "Current Plan"
    : id === "custom"
    ? "Contact Sales"
    : "Upgrade"}
</button>
      </div>
    </div>
  );
}

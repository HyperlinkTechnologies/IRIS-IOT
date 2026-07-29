export default function PricingCard({

  title,

  price,

  description,

  features,

  buttonText,

  highlighted = false,

  current = false,

}) {

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

    ${
      highlighted
        ? "border-[#ff5700] shadow-xl"
        : "border-black/10 shadow-md"
    }
  `}
>

      {/* Current Plan Badge */}

      {current && (

        <div
          className="
            absolute
            top-4
            right-4

           bg-orange-100
text-[#ff5700]

            text-[10px]

            px-2.5
            py-1

            rounded-full

            font-medium
          "
        >

          Current Plan

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

        <h3 className="text-xl font-bold">

          {title}

        </h3>

      </div>

      {/* Body */}

      <div className="p-5">

        <h2
          className="
            text-3xl

            font-bold

            text-[#010c29]

            mb-4
          "
        >

          {price}

        </h2>

        <p
          className="
            text-gray-500

            mb-6
          "
        >

          {description}

        </p>

        <ul className="space-y-2">

          {features.map((feature, index) => (

            <li
              key={index}
              className="flex gap-3 text-sm"
            >

              <span className="text-[#ff5700]">

                ✓

              </span>

              {feature}

            </li>

          ))}

        </ul>

        <button
          className={`
  mt-8
  w-full
  py-2.5
  rounded-xl
  font-medium
  transition-all

  ${
    current
      ? "bg-gray-200 text-gray-600 cursor-default"
      : "bg-[#ff5700] hover:bg-[#e64d00] text-white"
  }
`}
        >

          {current ? "Current Plan" : buttonText}

        </button>

      </div>

    </div>

  );

}
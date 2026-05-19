import WidgetCard from "./WidgetCard";

export default function HorizontalGaugeWidget() {

  const value = 82;

  return (

    <WidgetCard
      title="Horizontal Gauge"
    >

      <div
        className="
          w-full
          h-full
          flex
          flex-col
          items-center
          justify-center
          px-4
        "
      >

        {/* ================= BAR ================= */}

        <div
          className="
            w-full
            max-w-175
            h-8
            bg-gray-200
            rounded-full
            overflow-hidden
          "
        >

          <div
            className="
              h-full
              bg-[#ff5700]
              rounded-full
              transition-all
            "
            style={{
              width: `${value}%`,
            }}
          />

        </div>

        {/* ================= VALUE ================= */}

        <p
          className="
            mt-6
            text-3xl
            sm:text-4xl
            font-black
          "
        >
          {value}%
        </p>

      </div>

    </WidgetCard>
  );
}
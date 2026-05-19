import WidgetCard from "./WidgetCard";

export default function VerticalGaugeWidget() {

  const value = 68;

  return (

    <WidgetCard title="Vertical Gauge">

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          gap-5
          h-full
        "
      >

        <div
          className="
            w-16
            h-64
            bg-gray-200
            rounded-full
            overflow-hidden
            flex
            items-end
          "
        >

          <div
            className="
              w-full
              bg-[#ff5700]
              rounded-full
              transition-all
            "
            style={{
              height: `${value}%`,
            }}
          />

        </div>

        <p
          className="
            text-2xl
            font-bold
          "
        >
          {value}%
        </p>

      </div>

    </WidgetCard>
  );
}
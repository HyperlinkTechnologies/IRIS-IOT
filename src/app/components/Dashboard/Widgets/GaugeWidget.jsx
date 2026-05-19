import WidgetCard from "./WidgetCard";

export default function GaugeWidget() {

  const value = 72;

  return (

    <WidgetCard title="Circular Gauge">

      <div
        className="
          flex
          items-center
          justify-center
          h-full
        "
      >

        <div
          className="
            relative
            w-44
            h-44
            rounded-full
            border-16
            border-gray-200
            flex
            items-center
            justify-center
          "
          style={{
            borderTopColor: "#ff5700",
          }}
        >

          <h1
            className="
              text-5xl
              font-black
              text-[#ff5700]
            "
          >
            {value}%
          </h1>

        </div>

      </div>

    </WidgetCard>
  );
}
import WidgetCard from "./WidgetCard";

export default function TemperatureWidget() {

  const temperature = 32;

  return (

    <WidgetCard title="Temperature">

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          h-full
        "
      >

        <h1
          className="
            text-6xl
            font-black
            text-[#ff5700]
          "
        >
          {temperature}°C
        </h1>

      </div>

    </WidgetCard>
  );
}
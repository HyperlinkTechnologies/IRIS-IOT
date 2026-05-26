import WidgetCard from "./WidgetCard";

export default function TemperatureWidget({
  telemetry,
}) {

  const temperature =
    telemetry?.temperature || 0;

  return (

    <div className="text-5xl font-bold">

      {temperature}°C

    </div>
  );
}
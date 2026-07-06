import WidgetCard from "../WidgetCard";
import { getTelemetryValue } from "../../../../core/telemetry/telemetryResolver";

export default function TemperatureWidget({
  widget,
  telemetry,
}) {

  const value =
  getTelemetryValue(
    widget,
    telemetry
  );

  return (

    <div className="text-5xl font-bold">

      {value}°C

    </div>
  );
}
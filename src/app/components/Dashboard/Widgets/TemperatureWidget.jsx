import WidgetCard from "./WidgetCard";
import { getTelemetryValue } from "../../../core/telemetry/telemetryResolver";

export default function TemperatureWidget({
  telemetry,
}) {

  const value =
  getTelemetryValue(
    widget,
    telemetry
  );

  return (

    <div className="text-5xl font-bold">

      {temperature}°C

    </div>
  );
}
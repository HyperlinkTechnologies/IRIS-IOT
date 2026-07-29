import WidgetCard from "../../WidgetCard";
import { getTelemetryValue } from "../../../../core/telemetry/telemetryResolver";

export default function VerticalGaugeWidget({

  widget,

  telemetry,

}) {

  const value = getTelemetryValue(
    widget,
    telemetry
  );

  return (

    <WidgetCard title={widget.title}>

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
            w-12
            h-64
            bg-gray-200
            rounded-full
            overflow-hidden
            flex
            items-end
            p-0.5
          "
        >

          <div
            className="
              w-full
              rounded-full
              transition-all
            "
            style={{
              height: `${value}%`,
              background:
                widget.color || "#ff5700",
            }}
          />

        </div>

        <p
          className="
            text-2xl
            font-bold
          "
          style={{
            color:
              widget.color || "#ff5700",
          }}
        >

          {value}

          {widget.unit || "%"}

        </p>

      </div>

    </WidgetCard>

  );
}
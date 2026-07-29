import WidgetCard from "../../WidgetCard";

import { getTelemetryValue } from "../../../../core/telemetry/telemetryResolver";
import useCommand from "../../../../hooks/useCommand";

export default function SliderWidget({

  widget,

  telemetry,

}) {

  const value =
    getTelemetryValue(
      widget,
      telemetry
    );

  const {
    sendCommand,
  } = useCommand(widget);

  const isReadOnly =
    widget.controlMode === "read";

  return (

    <WidgetCard
      title={widget.title}
    >

      <div
        className="
          flex
          flex-col
          justify-center
          h-full
          gap-8
        "
      >

        <input

          type="range"

          min={widget.min ?? 0}

          max={widget.max ?? 100}

          value={value}

          disabled={isReadOnly}

          onChange={(e) =>
            sendCommand(
              Number(
                e.target.value
              )
            )
          }

          className="
            w-full
            accent-[#ff5700]
            cursor-pointer
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        />

        <h2
          className="
            text-center
            text-4xl
            font-black
          "
        >
          {value}
          {widget.unit || ""}
        </h2>

      </div>

    </WidgetCard>

  );

}
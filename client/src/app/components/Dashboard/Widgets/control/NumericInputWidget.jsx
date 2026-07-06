import WidgetCard from "../WidgetCard";

import { getTelemetryValue } from "../../../../core/telemetry/telemetryResolver";
import useCommand from "../../../../hooks/useCommand";

export default function NumericInputWidget({

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
          gap-5
          h-full
        "
      >

        <input

          type="number"

          min={widget.min ?? 0}

          max={widget.max ?? 100}

          value={value}

          disabled={isReadOnly}

          onChange={(e) =>
            sendCommand(
              Number(e.target.value)
            )
          }

          className="
            border
            border-gray-300
            rounded-xl
            px-5
            py-4
            outline-none
            focus:border-[#ff5700]
            disabled:bg-gray-100
            disabled:cursor-not-allowed
          "
        />

        <h2
          className="
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
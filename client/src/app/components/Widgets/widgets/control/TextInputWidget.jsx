import WidgetCard from "../../WidgetCard";

import { getTelemetryValue } from "../../../../core/telemetry/telemetryResolver";
import useCommand from "../../../../hooks/useCommand";

export default function TextInputWidget({

  widget,

  telemetry,

}) {

  const value =
    getTelemetryValue(
      widget,
      telemetry
    ) || "";

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

          type="text"

          value={value}

          disabled={isReadOnly}

          onChange={(e) =>
            sendCommand(
              e.target.value
            )
          }

          placeholder={
            widget.placeholder ||
            "Enter text..."
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

        <p
          className="
            text-lg
            text-gray-500
            break-all
          "
        >
          {value}
        </p>

      </div>

    </WidgetCard>

  );

}
import WidgetCard from "../WidgetCard";

import { getTelemetryValue } from "../../../../core/telemetry/telemetryResolver";

export default function LEDWidget({

  widget,

  telemetry,

}) {

  const state =
    getTelemetryValue(
      widget,
      telemetry
    );

  const online =
    Boolean(state);

  return (

    <WidgetCard
      title={widget.title}
    >

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          h-full
          gap-6
        "
      >

        <div
          className={`
            w-20
            h-20
            rounded-full
            transition-all
            duration-300

            ${
              online
                ? "bg-green-500 shadow-[0_0_40px_#22c55e]"
                : "bg-red-500"
            }
          `}
        />

        <p
          className="
            text-lg
            font-semibold
          "
        >
          {online
            ? "ONLINE"
            : "OFFLINE"}
        </p>

      </div>

    </WidgetCard>

  );

}
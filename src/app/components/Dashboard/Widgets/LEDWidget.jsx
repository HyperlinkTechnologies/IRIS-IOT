import { useState } from "react";

import { getTelemetryValue } from "../../../core/telemetry/telemetryResolver";

import WidgetCard from "./WidgetCard";

export default function LEDWidget() {

  const state =
  getTelemetryValue(
    widget,
    telemetry
  );

  return (

    <WidgetCard title="LED Indicator">

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
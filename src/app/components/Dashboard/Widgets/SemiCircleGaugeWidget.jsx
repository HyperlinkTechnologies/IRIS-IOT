import WidgetCard
from "./WidgetCard";

import { getTelemetryValue } from "../../../core/telemetry/telemetryResolver";

export default function SemiCircleGaugeWidget({

  widget,
  telemetry,

}) {

  /* ================= VALUE ================= */

const value = getTelemetryValue(
  widget,
  telemetry
);

/* ================= CONFIG ================= */

const min = widget.min ?? 0;

const max = widget.max ?? 100;

const threshold = widget.threshold ?? 80;

/* ================= PERCENT ================= */

const percentage = Math.min(
  Math.max(
    ((value - min) / (max - min)) * 100,
    0
  ),
  100
);

/* ================= COLORS ================= */

const gaugeColor =
  value >= threshold
    ? "#ef4444"
    : widget.color || "#ff0055";
  return (

    <WidgetCard
      title={widget.title}
    >

      <div
        className="
          w-full
          h-full
          flex
          items-center
          justify-center
          p-4
        "
      >

        <div
          className="
            relative
            w-full
            max-w-65
            aspect-[2/1.2]
            flex
            items-center
            justify-center
          "
        >

          {/* ================= SVG ================= */}

          <svg
            viewBox="0 0 200 120"
            className="
              w-full
              h-full
            "
          >

            {/* BACKGROUND ARC */}

            <path

              d="
                M 20 100
                A 80 80 0 0 1 180 100
              "

              fill="none"

              stroke="#e5e7eb"

              strokeWidth="20"

              strokeLinecap="round"
            />

            {/* ACTIVE ARC */}

            <path

              d="
                M 20 100
                A 80 80 0 0 1 180 100
              "

              fill="none"

              stroke={gaugeColor}

              strokeWidth="20"

              strokeLinecap="round"

              strokeDasharray={252}

              strokeDashoffset={
                252 -
                (percentage / 100) *
                  252
              }

              className="
                transition-all
                duration-700
                ease-in-out
              "
            />

          </svg>

          {/* ================= VALUE ================= */}

          <div
            className="
              absolute
              bottom-0

              bg-[#e5e7eb]

              px-10
              py-2

              rounded-2xl

              shadow-lg
            "
          >

            <h1
              className="
                text-3xl
                sm:text-4xl
                font-black
                text-[#010c29]
              "
            >

              {value}


            </h1>

          </div>

        </div>

      </div>

    </WidgetCard>
  );
}
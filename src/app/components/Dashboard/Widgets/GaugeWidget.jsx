import WidgetCard
from "./WidgetCard";

import { getTelemetryValue } from "../../../core/telemetry/telemetryResolver";

export default function GaugeWidget({

  widget,

  telemetry,

}) {

  /* ================= LIVE VALUE ================= */

  const value =
  getTelemetryValue(
    widget,
    telemetry
  );

  /* ================= CONFIG ================= */

 const min = widget.min ?? 0;
const max = widget.max ?? 100;

  const threshold =
    widget.threshold ?? 80;

  /* ================= SAFE PERCENT ================= */

  const percentage =

    Math.min(

      Math.max(

        ((value - min) /
          (max - min)) * 100,

        0
      ),

      100
    );

  /* ================= COLORS ================= */

  const gaugeColor =

    value >= threshold

      ? "#ef4444"

      : widget.color ||
        "#ff5700";

  return (

    <WidgetCard
      title={widget.title}
    >

      <div
        className="
          flex
          items-center
          justify-center
          h-full
          w-full
        "
      >

        {/* ================= GAUGE ================= */}

        <div
          className="
            relative
            w-40
            h-40
            sm:w-44
            sm:h-44
            md:w-52
            md:h-52
            rounded-full
            flex
            items-center
            justify-center
            transition-all
          "

          style={{

            background:
              `conic-gradient(

                ${gaugeColor}
                ${percentage * 3.6}deg,

                #e5e7eb 0deg
              )`,
          }}
        >

          {/* ================= INNER CIRCLE ================= */}

          <div
            className="
              absolute
              w-[75%]
              h-[75%]
              bg-white
              rounded-full
              flex
              items-center
              justify-center
              shadow-inner
            "
          >

            <h1
              className="
                text-lg
                sm:text-2xl
                md:text-3xl
                font-black
                transition-all
              "

              style={{
                color: gaugeColor,
              }}
            >

              {value}

              {widget.unit || "%"}

            </h1>

          </div>

        </div>

      </div>

    </WidgetCard>
  );
}
import WidgetCard
from "./WidgetCard";

import { getTelemetryValue } from "../../../core/telemetry/telemetryResolver";

export default function TextDisplayWidget({

  widget,

  telemetry,

}) {

  /* ================= FONT SIZE ================= */

  const fontSizeMap = {

    small:
      "text-2xl",

    medium:
      "text-4xl",

    large:
      "text-6xl",
  };

  const value =
  getTelemetryValue(
    widget,
    telemetry
  );

  /* ================= ALIGNMENT ================= */

  const alignmentMap = {

    left:
      "items-start text-left",

    center:
      "items-center text-center",

    right:
      "items-end text-right",
  };

  return (

    <WidgetCard
      title={widget.title}
    >

      <div
        className={`
          w-full
          h-full
          flex
          flex-col
          justify-center
          px-4

          ${
            alignmentMap[
              widget.textAlign
            ] || "items-center"
          }
        `}
      >

        <h1
          className={`
            font-black
            wrap-break-word

            ${
              fontSizeMap[
                widget.fontSize
              ] || "text-5xl"
            }
          `}
          style={{
            color:
              widget.color ||
              "#ff5700",
          }}
        >

          {locked ||
            "MACHINE ACTIVE"}

        </h1>

      </div>

    </WidgetCard>
  );
}
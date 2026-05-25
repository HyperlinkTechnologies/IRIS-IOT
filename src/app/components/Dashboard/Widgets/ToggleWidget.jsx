import {

  useState,

  useEffect,

} from "react";

import WidgetCard
from "./WidgetCard";

export default function ToggleWidget({

  widget,

}) {

  /* ================= INITIAL STATE ================= */

  const [

    enabled,

    setEnabled,

  ] = useState(false);

  useEffect(() => {

  if (

    typeof widget.value ===
    "boolean"

  ) {

    setEnabled(
      widget.value
    );
  }

}, [widget.value]);

  /* ================= READ ONLY ================= */

  const isReadOnly =

    widget.controlMode ===
    "read";

  return (

    <WidgetCard
      title={widget.title}
    >

      <div
        className="
          w-full
          h-full
          flex
          flex-col
          items-center
          justify-center
          gap-6
        "
      >

        {/* SWITCH */}

        <button

          disabled={isReadOnly}

          onClick={() =>
            setEnabled(!enabled)
          }

          className={`
            relative
            rounded-full
            transition-all
            duration-300

            w-24
            h-12

            ${
              enabled

                ? "bg-green-500"

                : "bg-gray-300"
            }

            ${
              isReadOnly

                ? "opacity-50 cursor-not-allowed"

                : "cursor-pointer"
            }
          `}
        >

          {/* KNOB */}

          <div
            className={`
              absolute
              top-1
              w-10
              h-10
              rounded-full
              bg-white
              transition-all
              duration-300

              ${
                enabled

                  ? "left-13"

                  : "left-1"
              }
            `}
          />

        </button>

        {/* STATUS */}

        <p
          className="
            text-lg
            font-semibold
          "
        >

          {enabled ? "ON" : "OFF"}

        </p>

      </div>

    </WidgetCard>
  );
}
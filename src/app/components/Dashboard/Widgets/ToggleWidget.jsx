import { useState } from "react";

import WidgetCard from "./WidgetCard";

export default function ToggleWidget() {

  const [enabled, setEnabled] =
    useState(false);

  return (

    <WidgetCard
      title="Toggle Switch"
      className="w-full h-full"
    >

      <div
        className="
          w-full
          h-full
          flex
          flex-col
          items-center
          justify-center
          gap-4
          sm:gap-5
          md:gap-6
          p-2
        "
      >

        {/* ================= SWITCH ================= */}

        <button

          onClick={() =>
            setEnabled(!enabled)
          }

          className={`
            relative
            transition-all
            duration-300
            cursor-pointer
            rounded-full

            w-16
            h-8

            sm:w-20
            sm:h-10

            md:w-24
            md:h-12

            ${
              enabled
                ? "bg-green-500"
                : "bg-gray-300"
            }
          `}
        >

          {/* ================= KNOB ================= */}

          <div
            className={`
              absolute
              top-1
              rounded-full
              bg-white
              transition-all
              duration-300
              shadow-md

              w-6
              h-6

              sm:w-8
              sm:h-8

              md:w-10
              md:h-10

              ${
                enabled

                  ? `
                    left-9
                    sm:left-11
                    md:left-13
                  `

                  : "left-1"
              }
            `}
          />

        </button>

        {/* ================= STATUS ================= */}

        <p
          className={`
            font-semibold
            transition-all

            text-sm

            sm:text-base

            md:text-lg

            ${
              enabled
                ? "text-green-600"
                : "text-gray-500"
            }
          `}
        >

          {enabled ? "ON" : "OFF"}

        </p>

      </div>

    </WidgetCard>
  );
}
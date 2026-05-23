import { useState }
from "react";

import WidgetCard
from "./WidgetCard";

export default function ToggleWidget({
  widget,
}) {

  const [enabled, setEnabled] =
    useState(false);

  /* ================= TOGGLE ================= */

  const handleToggle = async () => {

    const newState =
      !enabled;

    setEnabled(newState);

    try {

      await fetch(

        "http://localhost:5000/api/widget/write",

        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({

            widgetId:
              widget.widgetId,

            data:
              newState,
          }),
        }
      );

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <WidgetCard
      title="Toggle Switch"
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
        "
      >

        {/* SWITCH */}

        <button

          onClick={
            handleToggle
          }

          className={`
            relative
            w-24
            h-12
            rounded-full
            transition-all
            duration-300

            ${
              enabled

                ? "bg-green-500"

                : "bg-gray-300"
            }
          `}
        >

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

        <p
          className="
            font-bold
          "
        >

          {enabled
            ? "ON"
            : "OFF"}

        </p>

      </div>

    </WidgetCard>
  );
}
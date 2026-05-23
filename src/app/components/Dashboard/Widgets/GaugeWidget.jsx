import {
  useEffect,
  useState,
} from "react";

import WidgetCard
from "./WidgetCard";

export default function GaugeWidget({
  widget,
}) {

  const [value, setValue] =
    useState(0);

  /* ================= FETCH VALUE ================= */

  useEffect(() => {

    const interval =
      setInterval(async () => {

        try {

          const response =
            await fetch(

              `http://localhost:5000/api/widget/${widget.widgetId}`
            );

          const data =
            await response.json();

          setValue(
            data.value
          );

        } catch (error) {

          console.log(error);
        }

      }, 1000);

    return () =>
      clearInterval(
        interval
      );

  }, [widget.widgetId]);

  return (

    <WidgetCard
      title="Circular Gauge"
    >

      <div
        className="
          w-full
          h-full
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            relative
            w-[70%]
            aspect-square
            rounded-full
            border-12
            border-gray-200
            flex
            items-center
            justify-center
          "
          style={{

            borderTopColor:
              "#ff5700",
          }}
        >

          <span
            className="
              text-3xl
              font-black
              text-[#ff5700]
            "
          >

            {value}%

          </span>

        </div>

      </div>

    </WidgetCard>
  );
}
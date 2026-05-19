import { useState } from "react";

import WidgetCard from "./WidgetCard";

export default function SliderWidget() {

  const [value, setValue] =
    useState(45);

  return (

    <WidgetCard title="Slider Control">

      <div
        className="
          flex
          flex-col
          justify-center
          h-full
          gap-8
        "
      >

        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="
            w-full
            accent-[#ff5700]
            cursor-pointer
          "
        />

        <h2
          className="
            text-center
            text-4xl
            font-black
          "
        >
          {value}
        </h2>

      </div>

    </WidgetCard>
  );
}
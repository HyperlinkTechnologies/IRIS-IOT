import { useState } from "react";

import WidgetCard from "../WidgetCard";

export default function NumericInputWidget() {

  const [value, setValue] =
    useState(0);

  return (

    <WidgetCard title="Numeric Input">

      <div
        className="
          flex
          flex-col
          justify-center
          gap-5
          h-full
        "
      >

        <input
          type="number"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          className="
            border
            border-gray-300
            rounded-xl
            px-5
            py-4
            outline-none
            focus:border-[#ff5700]
          "
        />

        <h2
          className="
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
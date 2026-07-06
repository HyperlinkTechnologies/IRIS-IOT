import { useState } from "react";

import WidgetCard from "../WidgetCard";

export default function TextInputWidget() {

  const [value, setValue] =
    useState("");

  return (

    <WidgetCard title="Text Input">

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
          type="text"
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder="Enter text..."
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

        <p
          className="
            text-lg
            text-gray-500
          "
        >
          {value}
        </p>

      </div>

    </WidgetCard>
  );
}
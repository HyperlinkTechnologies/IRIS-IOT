import { useState } from "react";

import WidgetCard from "./WidgetCard";

export default function PushButtonWidget() {

  const [pressed, setPressed] =
    useState(false);

  return (

    <WidgetCard title="Push Button">

      <div
        className="
          flex
          items-center
          justify-center
          h-full
        "
      >

        <button
          onMouseDown={() =>
            setPressed(true)
          }
          onMouseUp={() =>
            setPressed(false)
          }
          className={`
            px-10
            py-5
            rounded-2xl
            text-white
            font-bold
            text-lg
            transition-all
            cursor-pointer
            ${
              pressed
                ? "bg-red-500 scale-95"
                : "bg-[#ff5700]"
            }
          `}
        >

          {pressed
            ? "Pressed"
            : "Push"}

        </button>

      </div>

    </WidgetCard>
  );
}
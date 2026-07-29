import { useState } from "react";

import WidgetCard from "../../WidgetCard";
import useCommand from "../../../../hooks/useCommand";

export default function PushButtonWidget(widget,) {

  // const [pressed, setPressed] =
  //   useState(false);

  const isReadOnly =
  widget.controlMode === "read";

  const {
  sendCommand,
} = useCommand(widget);

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

        {/* <button
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

        </button> */}
        {/* <button
          className="group relative px-8 py-4 font-bold text-white uppercase tracking-wider rounded-2xl bg-red-500 border-b-8 border-red-700 active:border-b-0 active:translate-y-2 transition-all duration-100 shadow-[0_15px_25px_-10px_rgba(239,68,68,0.8)] focus:outline-none focus:ring-4 focus:ring-red-400/50 cursor-pointer"
        >
          <span
            className="absolute inset-0 w-full h-full rounded-2xl bg-linear-to-t from-black/20 to-transparent pointer-events-none"
          ></span>

          <span className="relative flex items-center justify-center gap-2 drop-shadow-md cursor-pointer">
            Push
          </span>
        </button> */}
        <button

  disabled={isReadOnly}

  onMouseDown={() => {

    if (isReadOnly) return;

    sendCommand(true);

  }}

  onMouseUp={() => {

    if (isReadOnly) return;

    sendCommand(false);

  }}

  onMouseLeave={() => {

    if (isReadOnly) return;

    commandService.send(
      widget,
      false
    );

  }}

  className="
    group
    relative
    px-8
    py-4
    font-bold
    text-white
    uppercase
    tracking-wider
    rounded-2xl
    bg-red-500
    border-b-8
    border-red-700
    active:border-b-0
    active:translate-y-2
    transition-all
    duration-100
    shadow-[0_15px_25px_-10px_rgba(239,68,68,0.8)]
    focus:outline-none
    focus:ring-4
    focus:ring-red-400/50
    disabled:opacity-50
    disabled:cursor-not-allowed
    cursor-pointer
  "
>

  <span
    className="
      absolute
      inset-0
      rounded-2xl
      bg-linear-to-t
      from-black/20
      to-transparent
      pointer-events-none
    "
  />

  <span className="relative">
    Push
  </span>

</button>


      </div>

    </WidgetCard>
  );
}
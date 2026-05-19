import { useState } from "react";

import WidgetCard from "./WidgetCard";

export default function ToggleWidget() {
  const [enabled, setEnabled] = useState(false);

  return (
    <WidgetCard title="Toggle Switch">
      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          h-full
          gap-6
        "
      >
        {/* Switch */}

        <button
          onClick={() => setEnabled(!enabled)}
          className={`
            w-24
            h-12
            rounded-full
            relative
            transition-all
            duration-300
            cursor-pointer
            ${enabled ? "bg-green-500" : "bg-gray-300"}
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
              ${enabled ? "left-13" : "left-1"}
            `}
          />
        </button>

        <p
          className="
            text-lg
            font-medium
          "
        >
          {enabled ? "ON" : "OFF"}
        </p>
      </div>
    </WidgetCard>
  );
}

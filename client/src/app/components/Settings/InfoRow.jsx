import { ChevronRight } from "lucide-react";

export default function InfoRow({
  label,
  value,
  clickable = false,
  onClick,
}) {
  return (
    <div
      onClick={clickable ? onClick : undefined}
      className={`
        flex
        justify-between
        items-center
        border
        border-black/10
        rounded-2xl
        px-5
        py-4
        transition-colors
        ${
          clickable
            ? "cursor-pointer hover:bg-gray-50"
            : ""
        }
      `}
    >
      <span
        className="
          font-medium
          text-gray-500
        "
      >
        {label}
      </span>

      <div className="flex items-center gap-2">
        <span
          className="
            font-semibold
            text-[#010c29]
          "
        >
          {value}
        </span>

        {clickable && (
          <ChevronRight
            size={18}
            className="text-gray-400"
          />
        )}
      </div>
    </div>
  );
}
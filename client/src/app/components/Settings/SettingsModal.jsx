import { X } from "lucide-react";

export default function SettingsModal({ title, children, onClose }) {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
      "
    >
      <div
  className="
    bg-white
    w-full
    max-w-2xl
    rounded-3xl
    shadow-2xl
    max-h-[90vh]
    overflow-hidden
    flex
    flex-col
  "
>
        {/* ================= HEADER ================= */}

        <div
          className="
            flex
            items-center
            justify-between
            px-6
            py-5
            border-b
          "
        >
          <h2
            className="
              text-2xl
              font-bold
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-full
              hover:bg-gray-100
              cursor-pointer
            "
          >
            <X size={24} />
          </button>
        </div>

        {/* ================= BODY ================= */}

        <div className="p-6 overflow-y-auto flex-1">
  {children}
</div>
      </div>
    </div>
  );
}
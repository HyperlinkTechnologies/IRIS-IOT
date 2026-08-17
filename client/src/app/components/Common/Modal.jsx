import { X } from "lucide-react";

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-xl
          shadow-2xl
          max-h-[90vh]
          overflow-hidden
          flex
          flex-col
        "
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-center
            justify-between
            p-6
            pb-4
            shrink-0
          "
        >
          <h2 className="text-2xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="
              cursor-pointer
              hover:bg-gray-100
              rounded-full
              p-1.5
            "
          >
            <X />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="px-6 pb-6 overflow-y-auto flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
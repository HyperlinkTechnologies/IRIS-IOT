import { X } from "lucide-react";

export default function BillingModal({
  title,

  children,

  onClose,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
      onClick={onClose}
    >
      <div
        className="
        bg-white

        rounded-3xl

        w-[95vw]
        md:w-[90vw]
        lg:w-[85vw]
        xl:w-[82vw]

        max-w-350

        max-h-[90vh]

        shadow-2xl

        flex
        flex-col

        overflow-hidden
    "
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="
            flex
            justify-between
            items-center
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              px-9
              pt-8
            "
          >
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
            mt-7
            mr-7
            w-10
            h-10
            rounded-full
            hover:bg-gray-100
            flex
            items-center
            justify-center
            cursor-pointer
          "
          >
            <X size={22} />
          </button>
        </div>

        <div
          className="
    flex-1
    overflow-y-auto
    p-9
    pt-3
  "
        >
          {children}
        </div>
      </div>
    </div>
  );
}

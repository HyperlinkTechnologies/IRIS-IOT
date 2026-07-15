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
        flex
        items-center
        justify-center
        z-50
      "
      onClick={onClose}
    >

      <div
        className="
          w-full
          max-w-2xl
          bg-white
          rounded-3xl
          shadow-2xl
          p-8
          mx-4
        "
        onClick={(e) => e.stopPropagation()}
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-8
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
              text-gray-500
              hover:bg-black/5
              cursor-pointer
              px-3
              py-2
              rounded-full
              text-2xl
            "
          >
            <X />

          </button>

        </div>

        <div className="space-y-4">

          {children}

        </div>

      </div>

    </div>

  );

}
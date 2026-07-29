import { ChevronRight } from "lucide-react";

export default function BillingActionCard({

  action,

  onClick,

}) {

    const Icon = action.icon;

  return (

    <div

      onClick={onClick}

      className="
        bg-black/5
        border
        border-black/10
        rounded-2xl
        shadow-md
        p-6
        hover:shadow-lg
        hover:border-[#ff5700]/20
        cursor-pointer
        transition-all
        duration-300
      "

    >

      <div className="flex justify-between">

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-orange-500/10
            flex
            items-center
            justify-center
            text-[#ff5700]
          "
        >

          <Icon size={24}/>

        </div>

        <div>

          <ChevronRight size={20}/>

        </div>

      </div>

      <h4
        className="
          mt-5
          text-xl
          font-bold
        "
      >

        {action.title}

      </h4>

      <p
        className="
          mt-2
          text-gray-500
        "
      >

        {action.desc}

      </p>

    </div>

  );

}
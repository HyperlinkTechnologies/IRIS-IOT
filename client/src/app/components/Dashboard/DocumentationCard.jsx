import { ChevronRight } from "lucide-react";

export default function DocumentationCard({

  section,

  onClick,

}) {

  const Icon = section.icon;

  return (

    <div
  onClick={onClick}
  className="
    bg-black/5
    border
    border-black/10
    rounded-3xl
    shadow-md

    p-6

    min-h-45

    hover:border-[#ff5700]/30
    hover:shadow-lg

    transition-all
    duration-300

    cursor-pointer
  "
>

      <div className="flex justify-between items-center">

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

            border
            border-orange-500/10
          "
        >

          <Icon size={24} />

        </div>

        <ChevronRight
          size={20}
          className="text-gray-400"
        />

      </div>

      <h3
  className="
    mt-5
    text-xl
    font-bold
    text-[#010c29]
  "
>

        {section.title}

      </h3>

      <p
  className="
    mt-3
    text-gray-500
    leading-7
    text-sm
  "
>

        {section.description}

      </p>

    </div>

  );

}
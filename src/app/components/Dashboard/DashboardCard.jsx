export default function DashboardCard({
  title,
  value
}) {

  return (

    <div
      className="
        p-4
        sm:p-5
        lg:p-6
        rounded-2xl
        bg-black/5
        border
        border-gray-300/70
        shadow-md
        hover:shadow-lg
        hover:border-[#ff5700]/20
        transition-all
        duration-300
        min-h-30
        flex
        flex-col
        justify-center
      "
    >

      {/* Title */}
      <p
        className="
          text-gray-500
          text-sm
          sm:text-base
          mb-2
          leading-relaxed
        "
      >
        {title}
      </p>

      {/* Value */}
      <h3
        className="
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          text-[#010c29]
          leading-none
          wrap-break-word
        "
      >
        {value}
      </h3>

    </div>
  );
}
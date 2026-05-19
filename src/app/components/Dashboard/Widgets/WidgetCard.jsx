export default function WidgetCard({
  title,
  children,
}) {

  return (

    <div
      className="
        bg-black/5
        border
        border-black/10
        rounded-3xl
        p-6
        shadow-lg
        h-[calc(100%-10px)]
      "
    >

      {/* <h3
        className="
          text-xl
          font-bold
          mb-6
        "
      >
        {title}
      </h3> */}

      {children}

    </div>
  );
}
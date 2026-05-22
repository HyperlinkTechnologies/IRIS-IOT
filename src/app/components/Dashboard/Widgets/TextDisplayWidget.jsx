import WidgetCard from "./WidgetCard";

export default function TextDisplayWidget() {

  return (

    <WidgetCard title="Text Display">

      <div
        className="
          flex
          items-center
          justify-center
          h-full
        "
      >

        <h1
          className="
            text-xl
            sm:text-2xl
            md:text-4xl
            font-bold
            text-[#ff5700]
            text-center
          "
        >
          MACHINE ACTIVE
        </h1>

      </div>

    </WidgetCard>
  );
}
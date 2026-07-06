export default function WidgetCard({
  title,
  children,
}) {

  return (

    <div
      className="
        py-6  
        w-full    
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
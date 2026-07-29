export default function UsageProgress({

  title,

  value,

  max,

  suffix = "",

}) {

  const percentage = (value / max) * 100;

  let progressColor = "";

  if (percentage >= 85) {

    progressColor = "bg-red-500";

  }

  else if (percentage >= 60) {

    progressColor = "bg-yellow-500";

  }

  else {

    progressColor = "bg-green-500";

  }

  return (

    <div className="space-y-3 mb-6">

      <div className="flex justify-between">

        <span className="font-medium">

          {title}

        </span>

        <div className="text-right">

          <div className="text-gray-500">

            {value.toLocaleString()}
            {suffix}

            {" / "}

            {max.toLocaleString()}
            {suffix}

          </div>

          <div
            className="
              text-xs
              text-gray-400
            "
          >

            {percentage.toFixed(1)}%

          </div>

        </div>

      </div>

      <div
        className="
          w-full
          h-4
          rounded-full
          bg-gray-200
          overflow-hidden
        "
      >

        <div

          style={{

            width: `${percentage}%`

          }}

          className={`
            h-full
            rounded-full
            transition-all
            duration-500
            ${progressColor}
          `}
        />

      </div>

    </div>

  );

}